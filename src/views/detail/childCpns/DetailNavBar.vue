<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="title">
        <div :key="index"
             v-for="(item,index) in titles"
             class="title-item"
             :class="{active:currentIndex==index}"
             @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar"
  export default {
    name:'DetailNavBar',
    data(){
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components:{
      NavBar
    },
    methods:{
      backClick(){
        this.$router.back();
      },
      titleClick(index){
        this.currentIndex = index;
        this.$emit('titleClick', index);
      }
    }
  }
</script>
<style scoped>
  .title {
    display: flex;
    font-size: 12px;
  }
  .title-item {
    flex: 1;
  }
  .back img{
    margin-top: 14px;
    width: 16px;
  }
  .active {
    color: #ff5777;
  }
</style>
