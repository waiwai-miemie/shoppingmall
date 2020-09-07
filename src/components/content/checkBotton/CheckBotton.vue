<template>
  <div id="check-botton" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>
<script>
  export default {
    name:'CheckBotton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style scoped>
  div {
    float: left;
    width: 16px;
    height: 16px;
    margin: 40px 5px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }
  #check-botton img{
    width: 14px;
  }
  .check {
    border-color: #ff8198;
    background-color: #ff8198;
  }
</style>
