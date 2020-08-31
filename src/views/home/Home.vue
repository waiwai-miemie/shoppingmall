<template>
  <div id="home">
    <nav-bar class="home-nav">
        <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-feature></home-feature>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
</template>
<script>
  import HomeSwiper from "./childCpns/HomeSwiper"
  import HomeRecommend from "./childCpns/HomeRecommend"
  import HomeFeature from "./childCpns/HomeFeature"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"

  import {getHomeMultidata, getHomeGoods} from "network/home"
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
        currentType:'pop'
      }
    },
    created(){
      // 创建组件以后从服务器请求数据，用于渲染
      // 生命周期函数中最好不要放太多函数处理代码，可以抽取到方法中
      // 这里必须加this，否则又是调用导入的函数了
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods:{
      // 事件监听
      // 判断用户点击的是哪一个tab，传送对应的数据
      tabClick(index){
        // console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
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
        })
      }
    },
    components:{
        HomeSwiper,
        HomeRecommend,
        HomeFeature,
        NavBar,
        TabControl,
        GoodsList
    }
  }
</script>
<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    /* 使用变量 */
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
  .tab-control {
    /* 滚动到距离顶部44px的地方停下不再滚动 */
    position: sticky;
    top: 44px;
  }
</style>
