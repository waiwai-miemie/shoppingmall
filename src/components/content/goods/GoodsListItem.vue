<template>
  <div class="goods-item">
    <div><img :src="goodsItem.show.img" alt=""></div>
    <div><p>{{goodsItem.title}}</p></div>
    <div>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">收藏：{{goodsItem.cfav}}</span>
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
