<template>
    <div id="shop-cart">
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartListLength}})</div>
      </nav-bar>
      <scroll class="scroll-content" ref="scroll">
        <cart-list></cart-list>
      </scroll>
      <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll"

  import CartList from "./childCpns/CartList"
  import CartBottomBar from "./childCpns/CartBottomBar"

  // 注意mapGetters是vuex中的一个特殊方法，已经对vuex中的getters做了相应处理，这里导入的来源是vuex，而不是getters.js
  import { mapGetters } from "vuex"

  export default {
      name:'Shopcart',
      components: {
        NavBar,
        Scroll,
        CartList,
        CartBottomBar
      },
      computed: {
        ...mapGetters(['cartListLength', 'cartList']),
        // 如果要自定义名字，就以对象的形式传入
        // ...mapGetters({
        //   length: 'cartListLength',
        //   list: 'cartList'
        // })
      },
      activated(){
        this.$refs.scroll.refresh();
      }
  }
</script>
<style scoped>
  #shop-cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: #ff8198;
    color: #fff;
  }
  /* 注意：这里由于一开始购物车页面的高度为0，后来添加了内容以后content很可能没有refresh，导致滚动高度一致为0无法滚动 */
  /* 所以要在进入购物车页面的时候对滚动高度做一次refresh */
  /* 为什么height: calc(100% - 44px -49px)没有用 */
  .scroll-content {
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>
