<template>
  <!-- 判断如果goods为空就不渲染所有内容，Object.keys(goods)表示获取对象goods中的所有属性 -->
  <div v-if="Object.keys(goods).length!==0" class="detail-base-info">
    <div class="title">{{goods.title}}</div>
    <div class="price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">￥{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div v-if="goods.columns" class="sell">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[0].name}}</span>
    </div>
    <div class="contract" v-if="goods.services">
      <!-- 注意：数字的遍历是从1开始的 -->
      <div :key="index" v-for="index in goods.services.length-1">
        <img :src="goods.services[index].icon" alt="">
        <span>{{goods.services[index].name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default(){
          return {}
        }
      }
    }
  }
</script>
<style scoped>
  .detail-base-info {
    font-size: 14px;
    padding: 10px;
    color: #333;
    border-bottom: 3px solid #eee;
  }
  .title {
    line-height: 22px;
  }
  .price {
    padding: 10px 0;
  }
  .new-price {
    font-size: 16px;
    color: #ff5777
  }
  .old-price {
    font-size: 12px;
    color: #aaa;
    padding: 0 5px;
    text-decoration: line-through;
  }
  .discount {
    font-size: 12px;
    color: #fff;
    background-color: #ff5777;
    border-radius: 3px;
    padding: 0 4px;
  }
  .sell {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
  }
  .contract {
    display: flex;
    justify-content: space-between;
    padding: 15px 0 5px 0;
    font-size: 12px;
  }
  .contract img {
    width: 14px;
    vertical-align: top;
    margin-right: 3px;
  }
</style>
