<template>
  <div id="goods-params">
    <table class="size" v-if="goodsParams.sizes">
      <tr :key="index" v-for="(item,index) in goodsParams.sizes[0]">
        <td :key="index1" v-for="(td,index1) in item">{{td}}</td>
      </tr>
    </table>
    <table class="infos">
      <tr :key="index" v-for="(item,index) in goodsParams.infos">
        <td>{{item.key}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="goodsParams.image">
      <img :src="goodsParams.image" alt="" @load="infoImageLoad">
    </div>
  </div>
</template>
<script>
  export default {
    name:'DetailGoodsParams',
    props: {
      goodsParams: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      infoImageLoad(){
        this.$emit('infoImageLoad');
      }
    }
  }
</script>
<style scoped>
  #goods-params {
    padding: 15px;
    font-size: 14px;
    border-bottom: 3px solid #eee;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table tr td {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  table tr td:first-child {
    width: 80px;
  }
  .infos tr td:last-child {
    color: #eb4868;
  }
  .info-img img {
    width: 100%;
  }
</style>
