<template>
  <div class="goods-item" @click="goodsClick">
    <div><img v-lazy="showImg" alt="" @load="imgLoad"></div>
    <div><p>{{goodsItem.title}}</p></div>
    <div>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">收藏：{{goodsItem.cfav | sellCountFilter}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name:'GoodsListItem',
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      showImg(){
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
    },
    // 监听图片是否加载完成，因为图片是异步加载的，在better-scroll中计算content的高度都是同步计算，并且等图片加载出来了也不一定会更新高度，直接造成无法上滑的现象
    methods: {
      imgLoad(){
        // console.log('图片加载完成');
        // 当页面发生改变时，只有当前活动的页面需要被通知加载完成
        // 方法一：通过路由控制不同发送事件
        // if(this.$route.path.indexOf('/home')){
        //   this.$bus.$emit('imgLoad');
        // }else if (this.$route.path.indexOf('/detail')){
        //   this.$bus.$emit('detailImgLoad');
        // }
        // 方法二：发送同一个事件，在Home的时候关闭事件监听
        this.$bus.$emit('imgLoad');
      },
      goodsClick(){
        // 详情页还有返回按钮，所以这里用push不用replace
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>
<style scoped>
  .goods-item {
    font-size: 14px;
    padding-bottom: 10px;
  }
  .goods-item img {
    width: 100%;
    /* 1vh表示视口高度的1%，1vw表示视口宽度的1% */
    height: 40vh;
    border-radius: 5px;
  }
  .goods-item p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 5px;
  }
  .price {
    margin: 0px 20px 0px 5px;
    color: var(--color-high-text);
  }
</style>
