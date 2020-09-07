<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @positionChange="positionChange">
      <!-- <ul>
      <li :key="index" v-for="(item,index) in $store.state.cartList">{{item}}</li>
      </ul> -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @goodsImageLoad="goodsImageLoad"></detail-goods-info>
      <detail-goods-params ref="params" :goods-params="goodsParams" @infoImageLoad="goodsImageLoad"></detail-goods-params>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <!-- <toast></toast> -->
    <back-top v-show="isShow" @click.native="backTopClick"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>
<script>
  import DetailNavBar from "./childCpns/DetailNavBar"
  import DetailSwiper from "./childCpns/DetailSwiper"
  import DetailBaseInfo from "./childCpns/DetailBaseInfo"
  import DetailShopInfo from "./childCpns/DetailShopInfo"
  import DetailGoodsInfo from "./childCpns/DetailGoodsInfo"
  import DetailGoodsParams from "./childCpns/DetailGoodsParams"
  import DetailCommentInfo from "./childCpns/DetailCommentInfo"
  import DetailBottomBar from "./childCpns/DetailBottomBar"

  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"
  // import Toast from "components/common/toast/Toast"

  import {getDetailData, getRecommendData, Goods, Shop, GoodsParam} from "network/detail.js"

  import {imgLoadMixin} from "@/common/mixin"
  import {debounce} from "@/common/utils"

  import {mapActions} from "vuex"


  export default {
    name:'Detail',
    data(){
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        goodsParams: {},
        commentInfo: {},
        recommends: [],
        imgRefresh: null,
        offsetTopYs: [],
        getOffsetTopYs: null,
        currentIndex: 0,
        isShow: false
      }
    },
    mixins:[imgLoadMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      GoodsList,
      Scroll,
      BackTop,
      // Toast,
      DetailBottomBar
    },
    created(){
      // 获取当前商品的iid
      this.iid = this.$route.params.iid;
      // 网络请求获取数据
      getDetailData(this.iid).then((res)=>{
        // console.log(res);
        const data = res.data.result
        // 1、获取轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 2、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // console.log(this.goods);
        // 3、请求商家信息
        this.shop = new Shop(data.shopInfo);
        // console.log(this.shop);
        // 4、请求商品详情信息
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo);
        // 5、获取商品参数
        this.goodsParams = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // console.log(this.goodsParams);
        // 6、获取评论信息
        this.commentInfo = data.rate;
        // console.log(this.commentInfo);
        // 可以在这里对获取offsetTop进行防抖处理，每一次加载完成一张图片都会反复的执行加载完成的触发事件处理函数，但由于这里已经实现了所有图片加载完子组件才会发送事件的功能，所以当做了解即可
        // this.getOffsetTopYs = debounce(()=>{
        //   this.offsetTopYs = [];
        //   this.offsetTopYs.push(0);
        //   this.offsetTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.offsetTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.offsetTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.offsetTopYs);
        // },100);
      });
      // 请求推荐数据
      getRecommendData().then(res=>{
        // console.log(res);
        this.recommends = res.data.data.list;
      })
    },
    methods: {
      ...mapActions(['addCart']),
      // 这里是所有的图片加载完成以后组件才会发出事件，所以这里只会获取一次offsetTop
      goodsImageLoad(){
        // this.$refs.scroll.refresh();
        this.refresh();
        this.offsetTopYs = [];
        this.offsetTopYs.push(0);
        this.offsetTopYs.push(this.$refs.params.$el.offsetTop);
        this.offsetTopYs.push(this.$refs.comment.$el.offsetTop);
        this.offsetTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.offsetTopYs);
      },
      titleClick(index){
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.offsetTopYs[index], 500);
      },
      positionChange(position){
        // 判断滚动位置
        const positionY = -position.y;
        // 返回顶部按钮的显示和隐藏
        this.isShow = positionY > 1000
        // 注意这里的i的类型是字符串，所以加的时候要运用隐式类型转换
        for(let i in this.offsetTopYs){
          // currentIndex的作用是不要判断那么多次，提高性能
          if((this.currentIndex != i) && (i < this.offsetTopYs.length-1 && positionY >= this.offsetTopYs[i] && positionY < this.offsetTopYs[i-0+1] || i == this.offsetTopYs.length-1 && positionY >= this.offsetTopYs[i])){
            this.currentIndex = i;
            // console.log(this.currentIndex);
            // 获取顶部导航栏中的数据并赋值
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
      },
      backTopClick(){
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      addToCart(){
        // 1、获取被点击商品的展示信息
        let addGoods = {};
        addGoods.title = this.goods.title;
        addGoods.image = this.topImages[0];
        addGoods.desc = this.goods.desc;
        addGoods.realPrice = this.goods.realPrice;
        addGoods.iid = this.iid;
        // console.log(addGoods);
        // 2、将数据传递到vuex中管理
        // 不要直接通过this.$store.state.cartlist.push(addGoods);修改数据，修改数据需要通过mutations，这样才可以追踪数据来源，addGoods就是store中的payload参数
        // mutations中的方法调用方式
        // this.$store.commit('addCart', addGoods);
        // actions中的方法调用方式
        // this.$store.dispatch('addCart', addGoods).then(res=>console.log(res));
        // 用mapActions导入
        this.addCart(addGoods).then(res=>{
          // 获取到添加购物车成功的信息以后让toast提示信息出现，1秒后消失
          // 每次使用都要传入Toast组件并写许多重复代码，所以我们将Toast封装成一个插件
          // this.isToastShow = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.isToastShow = false;
          // }, 1000);
          console.log(this.$toast);
          this.$toast.show(res, 1000);
        });
      }
    },
    // mounted(){
    //   const refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 50);
    //   // 接收图片加载完成事件
    //   this.$bus.$on('detailImgLoad',()=>{
    //     console.log('Detail图片加载完成');
    //     refresh();
    //   });
    // },
    mounted(){
      // console.log('detail mounted');
    },
    destroyed(){
      this.$bus.$off('imgLoad',this.imgRefresh);
    }
  }
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
