<template>
  <div id="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <!-- 注意：滚动插件只有当content的高度大于wrapper的高度的时候才可以滚动，所以这里命名的时候不要命名为content，跟Scroll.vue里面的content命名冲突以后导致这里的名字跟放wrapper在一起，所以content和wrapper实际上指的都是同一个盒子，高度一致，无法滚动 -->
    <tab-control class="tab-control1" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabConShow"></tab-control>
    <scroll class="scroll-content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @positionChange="positionChange"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoaded="swiperImgLoaded"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 直接给组件绑定事件要加修饰符.native，如果是在组件内部绑定的事件，要拿到滚动组件中的data，是兄弟组件间的事件访问，比较麻烦，所以绑定事件设置在这里，通过给滚动组件添加ref比较简单 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
</template>
<script>
  import HomeSwiper from "./childCpns/HomeSwiper"
  import HomeRecommend from "./childCpns/HomeRecommend"
  import HomeFeature from "./childCpns/HomeFeature"

  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import BackTop from "components/content/backTop/BackTop"

  import {getHomeMultidata, getHomeGoods} from "network/home"
  import {imgLoadMixin} from "common/mixin"

  export default {
    name:'Home',
    data(){
      return{
        banners:[],
        recommends:[],
        // 存储商品
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType:'pop',
        currentIndex: 0,
        isShow: false,
        offsetTop: 0,
        isTabConShow: false,
        saveY: 0,
        defSaveY: [0, 0, 0],
        imgRefresh: null
      }
    },
    mixins: [imgLoadMixin],
    created(){
      // 创建组件以后从服务器请求数据，用于渲染
      // 生命周期函数中最好不要放太多函数处理代码，可以抽取到方法中
      // 这里必须加this，否则又是调用导入的函数了
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){},
    destroyed(){
      console.log('Home Destroyed');
    },
    activated(){
      // 当首页处于活动状态时，滚动到离开前的位置
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      // 可能有不可以滚动的bug
      this.$refs.scroll.refresh();
    },
    deactivated(){
      // 当离开首页时，记录离开时滚动到的位置
      this.saveY = this.$refs.scroll.getScrollY();
      // console.log('Home deactivated');
      // 页面离开以后停止监听图片加载完成事件
      this.$bus.$off('imgLoad',this.imgRefresh);
    },
    methods:{
      // 事件监听
      // 1、判断用户点击的是哪一个tab，传送对应的数据
      tabClick(index){
        // console.log(index);
        // 当从别的高度小于offsetTop的tab切换的时候，为了保持吸顶，必须判断
        this.isTabConShow = (-this.defSaveY[index]) >= this.offsetTop
        // console.log(this.isTabConShow);
        // console.log(this.defSaveY[index]);
        // 小于吸顶距离的时候点击，直接滚动到吸顶位置
        if(-this.defSaveY[index] <= this.offsetTop){
          this.defSaveY[index] = -this.offsetTop;
          this.$refs.scroll.scrollTo(0, this.defSaveY[index], 0);
        }else {
          // 大于吸顶距离滚动到对应tab保存的位置
          this.$refs.scroll.scrollTo(0, this.defSaveY[index], 0);
        }
        switch(index){
          case 0:
            this.currentType = 'pop';
            this.currentIndex = 0;
            break;
          case 1:
            this.currentType = 'new';
            this.currentIndex = 1;
            break;
          case 2:
            this.currentType = 'sell';
            this.currentIndex = 2;
            break;
        }
        // currentIndex是在tabControl组件中设置的变量，当改变了其中一个另外一个也要跟着改变
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl.currentIndex = index;
      },
      // 2、返回顶部
      backClick(){
        // 第一个scroll表示组件，第二个表示scroll组件中的data数据，也就是创建的better-scroll对象，数据中有一个方法scrollTo，前两个参数是x、y轴，第三个是滚动时间
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      // 3、返回顶部按钮的显示与隐藏
      positionChange(position){
        this.isShow = -position.y > 1000
        // 保存当前导航的滚动位置
        this.defSaveY[this.currentIndex] = position.y;
        // 判断是否吸顶
        this.isTabConShow = (-this.defSaveY[this.currentIndex]) >= this.offsetTop
      },
      // 4、加载更多图片
      loadMore(){
        this.getHomeGoods(this.currentType);
        // 请求完数据以后结束上拉请求，下一次上拉才有效果，同时做出延时，避免频繁上拉导致多次数据请求
        setTimeout(()=>{
          this.$refs.scroll.finishPullUp();
        }, 1000);
      },
      // 5、当轮播图加载完成以后获取offsetTop
      swiperImgLoaded(){
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.offsetTop = this.$refs.tabControl.$el.offsetTop;
      },

      // 请求数据
      // 外面一层函数表示的是方法中的函数，里面表示的是导进来的函数
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          // console.log(res);
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        });
      },
      getHomeGoods(type){
        // 获取当前已请求的页码数，+1
        let page = this.goods[type].page + 1;
        // 一次获取一页三十个数据，注意：这个getHomeGoods中传递的是实参！！！！！！！！！！所以可以引用第一个函数中传递进来的实参和page这个实参，也就是说第一个函数是定义，第二个函数是在调用
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          // 将获取到的新数据数组解构一个一个push到商品数组里面
          this.goods[type].list.push(...res.data.data.list);
          // 更新当前数据对象对应的页码
          this.goods[type].page += 1;
        });
      }
    },
    components:{
        HomeSwiper,
        HomeRecommend,
        HomeFeature,
        NavBar,
        Scroll,
        TabControl,
        GoodsList,
        BackTop
    }
  }
</script>
<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
  }
  .home-nav {
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0; */
    /* 使用变量 */
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .tab-control1 {
     position: relative;
     z-index: 9;
  }
  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* z-index: -1; */
    /* height: calc(100% - 49px); */
    overflow: hidden;
  }
</style>
