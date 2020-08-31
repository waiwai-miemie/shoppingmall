<template>
  <div class="tab-control">
    <div :key="index"
         class="tab-control-item"
         v-for="(item,index) in titles"
         :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name:"TabControl",
    props:{
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        // 点击事件发生以后向告诉父组件哪个发生了点击
        this.$emit('tabClick',index);
      }
    }
  }
</script>
<style scoped>
  .tab-control{
    display:flex;
    text-align: center;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 3px 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
