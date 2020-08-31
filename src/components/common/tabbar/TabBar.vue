<template>
    <div id="tabBar">
      <slot></slot>
    </div>
</template>
<script>
export default {
    name:'TabBar'
}
</script>
<style scoped>
#tabBar {
    display: flex;
    height: 49px;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, .1);
}
</style>