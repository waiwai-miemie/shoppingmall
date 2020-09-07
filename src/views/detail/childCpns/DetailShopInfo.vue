<template>
  <div class="detail-shop-info">
    <div class="shop-logo">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-descript">
      <div class="shop-msg">
        <div class="sells">
          <div>{{shop.sells | sellCountFilter}}</div>
          <div>总销量</div>
        </div>
        <div class="counts">
          <div>{{shop.goodsCount}}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="descript">
        <div :key="index" v-for="(item,index) in shop.score" class="descript-item">
          <span>{{item.name}}</span>
          <span class="shop-score" :class="{'high': item.isBetter}">{{item.score | scoreFilter}}</span>
          <span class="better" :class="{'better-more': item.isBetter}">{{item.isBetter ? '高': '低'}}</span>
        </div>
      </div>
    </div>
    <div class="enter"><span>进店逛逛</span></div>
  </div>
</template>
<script>
  export default {
    name: 'DetailShopInfo',
    props: {
      shop: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      },
      scoreFilter: function (value) {
        return value.toFixed(2)
      }
    }
  }
</script>
<style scoped>
  .detail-shop-info {
    font-size: 14px;
    border-bottom: 3px solid #eee;
  }
  .shop-logo {
    padding: 15px 10px;
  }
  .shop-logo img {
    width: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    vertical-align: middle;
  }
  .shop-logo span {
    padding-left: 10px;
  }
  .shop-descript {
    display: flex;
    font-size: 12px;
  }
  .shop-msg {
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
    text-align: center;
    /* background-color: pink; */
    border-right: 1px solid #eee;
  }
  .descript {
    flex: 1;
    /* background-color: skyblue; */
  }
  .descript-item {
    padding: 5px 20px;
  }
  .shop-score {
    padding: 0 5px;
    color: #5ea732;
  }
  .high {
    color: #f13e3a;
  }
  .better {
    color: #fff;
    background-color: #5ea732;
    padding: 1px;
  }
  .better-more {
    background-color: #f13e3a;
  }
  .enter {
    text-align: center;
    margin: 20px 0;

  }
  .enter span {
    padding: 5px 40px;
    background-color: #f2f5f8;
    border-radius: 5px;
  }
</style>
