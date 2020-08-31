<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name:"Slide"
  }
</script>
<style scoped>
  .slide {
    width: 100%;
    /* 使不被压缩，父元素swiper是flex布局，这里不设置的话默认值是1，也就是swiper中的所有子元素都会平均分配父元素的空间 */
    /* 1表示从超出空间中扣除本元素的占比，设置成0以后就能保证不扣除，也就是当前元素占满父盒子 */
    flex-shrink: 0;
  }

  .slide img {
    width: 100%;
  }
</style>
