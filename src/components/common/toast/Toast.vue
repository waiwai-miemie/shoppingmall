<template>
  <div id="toast" v-show="isToastShow">
    <div>{{message}}</div>
  </div>
</template>
<script>
  export default {
    name: 'Toast',
    props: {
    //   message: {
    //     type: String,
    //     default: ''
    //   },
    //   isToastShow: {
    //     type: Boolean,
    //     default: false
    //   }
    },
    data(){
      return {
        message: '',
        isToastShow: false
      }
    },
    methods: {
      show(message, duration = 1500) {
        // es6前设置默认值，es6以后直接在参数中传入即可
        // duration = duration || 1500;
        this.isToastShow = true;
        this.message = message;
        setTimeout(()=>{
          this.isToastShow = false;
          this.message = ''
        }, duration);
      }
    }
  }
</script>
<style scoped>
  #toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    padding: 8px;
    border-radius: 5px;
  }
</style>
