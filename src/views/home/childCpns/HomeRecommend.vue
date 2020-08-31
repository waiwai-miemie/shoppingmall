<template>
  <div class="recommend">
    <div :key="index" v-for="(item,index) in recommends" class="recommend-item">
      <a :href="item.link"><img :src="item.image" alt=""></a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"HomeRecommend",
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>
<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    padding: 10px 0 15px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex:1;
    text-align: center;
    font-size: 12px;
  }
  .recommend-item a img{
    width: 60px;
    margin-bottom: 5px;
  }
</style>
