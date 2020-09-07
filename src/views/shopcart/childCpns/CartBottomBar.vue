<template>
  <div id="cart-bottom-bar">
    <div class="check-all">
      <check-botton @click.native="checkClick" class="check-botton" :is-checked="isCheckedAll"></check-botton>
      <span>全选</span>
    </div>
    <div class="amount">总计：￥{{amount}}</div>
    <div class="pay" @click="payClick">去结算({{num}})</div>
  </div>
</template>
<script>
  import CheckBotton from "components/content/checkBotton/CheckBotton"
  import {mapGetters} from "vuex"
  export default {
    name:'CartBottomBar',
    components: {
      CheckBotton
    },
    computed: {
      ...mapGetters(['cartList']),
      amount() {
        return this.cartList.filter(item=>item.check)
                            .reduce((oldValue, item)=>{return oldValue + item.count * item.realPrice},0)
                            .toFixed(2);
      },
      num() {
        return this.cartList.length;
      },
      isCheckedAll(){
        // every()当所有元素都满足条件的时候才会返回true，只要有一个不满足就是false，且当找到一个不满足的时候就不会继续找了
        // 不会对空数组进行检测，不会改变原始数组
        // 还可以用filter、find等方法，或者原生js的for循环
        return this.cartList.length ? this.cartList.every(item => item.check) : false;
      }
    },
    methods: {
      // 全选
      checkClick(){
        if(this.isCheckedAll){
          this.cartList.forEach(item => item.check = false);
        }else{
          this.cartList.forEach(item => item.check = true);
        }
      },
      payClick(){
        // 判断是否至少有一个选中
        const isSelect = this.cartList.find(item=>item.check);
        if(!isSelect){
          this.$toast.show('请至少选择一件商品')
        }
      }
    }
  }
</script>
<style scoped>
  #cart-bottom-bar {
    display: flex;
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
    height: 40px;
    box-shadow: 0 -1px 1px rgba(0,0,0,.1);
  }
  .check-all {
    width: 70px;
  }
  .check-all span{
    line-height: 40px;
    font-size: 14px;
  }
  .check-botton {
    margin: 11px 5px 11px 11px;
  }
  .amount {
    flex: 1;
    font-size: 14px;
    text-align: right;
    line-height: 40px;
    padding-right: 10px;
  }
  .pay {
    width: 100px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #ff8198;
  }
</style>
