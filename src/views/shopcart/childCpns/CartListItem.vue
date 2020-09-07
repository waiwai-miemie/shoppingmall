<template>
  <div id="cart-list-item">
    <div class="image">
      <check-botton @click.native="checkClick" :is-checked="production.check"></check-botton>
      <img :src="production.image" alt="" class="production-img">
    </div>
    <div class="info">
      <p class="title">{{production.title}}</p>
      <p class="desc">{{production.desc}}}</p>
    </div>
    <div class="price">
      <span class="pro-price">￥{{production.realPrice}}</span>
      <span class="num">×{{production.count}}</span>
    </div>
  </div>
</template>
<script>
  import CheckBotton from "components/content/checkBotton/CheckBotton"
  export default {
    name:'CartListItem',
    props: {
      production: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    components:{
      CheckBotton
    },
    methods: {
      checkClick(){
        this.production.check = !this.production.check;
      }
    }
  }
</script>
<style scoped>
  #cart-list-item {
    /* background-color: pink; */
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  .image {
    float: left;
    width: 30%;
  }
  .info {
    float: right;
    width: 70%;
    padding: 10px 10px 10px 0;
  }
  .production-img {
    float: left;
    width: 60px;
    height: 80px;
    margin: 10px 0;
    border-radius: 5px;
  }
  .title,
  .desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .title {
    font-size: 16px;

  }
  .desc {
    font-size: 14px;
    color: #999;
    padding: 10px 0;
  }
  .pro-price {
    font-size: 16px;
    color: #ff5777;
  }
  .num {
    float: right;
    padding-right: 10px;
  }
</style>
