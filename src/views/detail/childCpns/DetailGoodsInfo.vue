<template>
  <div id="goods-info">
    <div class="desc">
      <div class="start clear-fix"></div>
      <div class="msg">{{detailInfo.desc}}</div>
      <div class="end clear-fix"></div>
    </div>
    <div v-if="detailInfo.detailImage" class="key">{{detailInfo.detailImage[0].key}}</div>
    <div  v-if="detailInfo.detailImage" class="img-list">
      <img :key="index" v-for="(item,index) in detailInfo.detailImage[0].list" :src="item" alt="" @load="goodsImageLoad">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        // 存储图片总数量
        imageCount: 0,
        // 计数器
        count: 0
      }
    },
    methods: {
      goodsImageLoad(){
        // 所有图片都加载完才发送事件
        if(++this.count === this.imageCount){
          // console.log('事件发送啦');
          // console.log(this.count);
          // console.log(this.imageCount);
          this.$emit('goodsImageLoad');
        }
      }
    },
    watch: {
      detailInfo(){
        // 获取图片个数
        this.imageCount = this.detailInfo.detailImage[0].list.length;
      }
    }
  }
</script>
<style scoped>
  #goods-info {
    padding: 20px 15px;
  }
  .start,
  .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }
  .start {
    float: left;
  }
  .end {
    float: right;
  }
  .start::before,
  .end::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 5px;
    height: 5px;
    background-color: #333;
  }
  .end::before {
    right: 0;
  }
  .msg {
    padding: 20px 0;
  }
  .key {
    margin: 10px 0 ;
    color: #333;
    font-size: 16px;
  }
  .img-list {
    width: 100%;
  }
  .img-list img{
    width: 100%;
  }
</style>
