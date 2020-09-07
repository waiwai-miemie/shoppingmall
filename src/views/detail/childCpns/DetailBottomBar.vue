<template>
  <div id="bottom-bar">
    <div class="shop">
      <div class="serve">
        <div class="image"></div>
        <div>客服</div>
      </div>
      <div class="store">
        <div class="image"></div>
        <div>店铺</div>
      </div>
      <div class="collection">
        <div class="image"></div>
        <div>收藏</div>
      </div>
    </div>
    <div class="buy">
      <div class="shopcart" @click="addToCart">加入购物车</div>
      <div class="pay">立即购买</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'detail-bottom-bar',
    methods: {
      addToCart(){
        this.$emit('addToCart');
      }
    }
  }
</script>
<style scoped>
  #bottom-bar {
    display: flex;
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    height: 49px;
    background-color: #fff;
    font-size: 12px;
  }
  #bottom-bar>div {
    flex: 1;
  }
  .shop {
    display: flex;
    text-align: center;
    /* background-color: pink; */
  }
  .shop>div {
    flex: 1;
  }
  .image {
    width: 25px;
    height: 25px;
    background-color: skyblue;
    margin: 5px auto;
    margin-bottom: 2px;
    background: url('~assets/img/detail/detail_bottom.png') 0 -59px no-repeat;
    background-size: 25px;
  }
  .store .image {
    background: url('~assets/img/detail/detail_bottom.png') 0 -110px no-repeat;
    background-size: 25px;
  }
  .collection .image {
    background: url('~assets/img/detail/detail_bottom.png') 0 0 no-repeat;
    background-size: 25px;
  }
  .buy {
    display: flex;
    text-align: center;
    line-height: 49px;
    font-size: 14px;
    color: #fff;
    background-color: skyblue;
  }
  .shopcart,
  .pay {
    flex: 1;
  }
  .shopcart {
    background-color: rgb(256, 204, 91);
  }
  .pay {
    background-color: rgb(240, 74, 74);
  }
</style>
