<template>
  <div class="goods">
    <!-- 获取Home首页请求的数据，遍历生成每个小的商品，并将每个商品的信息传递给商品本身 -->
    <goods-list-item :key="index" v-for="(item,index) in goods" :goodsItem="item" class="goods-item"></goods-list-item>
  </div>
</template>
<script>
  import GoodsListItem from "./GoodsListItem"
  export default {
    name:'GoodsList',
    props:{
      goods:{
        type: Array,
        default(){
          return []
        }
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>
<style scoped>
  .goods {
    display: flex;
    /* 换行 */
    flex-wrap: wrap;
    /* 均匀分布，两边的间隙是中间间隙的一般 */
    justify-content: space-around;
    width: 100%;
    /* 加宽两边间隙 */
    padding: 1%;
  }
  .goods-item {
    width: 48%;
  }
</style>
