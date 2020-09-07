import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import toast from "components/common/toast"
import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false

// 定义$bus为Vue实例对象才可以发送事件，并且$bus是所有组件共享的
Vue.prototype.$bus = new Vue()

// 安装toast，安装的时候会调用toast.install函数
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// 解决移动端300ms延时问题
FastClick.attach(document.body);
// 懒加载，当图片出现在屏幕中的时候才加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
});

// 当检测的数组为空时返回true
// const arr = [];
// console.log(arr.every(item => item == 1));
