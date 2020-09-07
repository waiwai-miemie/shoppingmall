<template>
  <div id="cart-list">
    <cart-list-item :key="index" v-for="(item,index) in cartList" :production="item"></cart-list-item>
  </div>
</template>
<script>
  import CartListItem from "./CartListItem"
  import { mapGetters } from "vuex"
  export default {
    name:'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      CartListItem
    }
  }
</script>
<style scoped>
</style>
