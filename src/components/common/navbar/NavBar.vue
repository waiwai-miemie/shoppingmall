<template>
  <!-- 因为每一个页面都会用到导航栏，所以这里最好用class -->
  <div class="navbar">
    <!-- 注意！样式不要写在slot里面，替换的时候会被覆盖掉 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
  export default {
    name:'NavBar'
  }
</script>
<style scoped>
  .navbar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, .1);
  }
  .left,
  .right {
    width: 60px;
  }
  .center {
    flex:1;
  }
</style>
