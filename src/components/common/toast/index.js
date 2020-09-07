import Toast from "./Toast"
const obj = {};

// 在安装toast插件以后，就会自动调用这个函数，所以我们可以顺便在这个函数中完成一些初始化工作
obj.install = function(Vue) {
  // console.log('toast的install函数被调用');
  // 在Vue的原型下挂载$toast，这样全局都可以使用
  // Vue.prototype.$toast = Toast组件;
  // 如果直接导入Toast组件引用的话，是有效果，因为它只是个模板，没有挂载到DOM上面
  // 如果将节点直接添加到DOM中的话，由于install这个函数调用地很快，在Toast.$el还没有创建的时候就已经执行了，所以找不到toast报错
  // console.log(Toast.$el); // undefined
  // document.body.appendChild(Toast.$el);
  // Vue.prototype.$toast = Toast;

  // 1、创建组件构造器
  const ToastContrustor = Vue.extend(Toast);
  // 2、生成组件对象
  const toast = new ToastContrustor();
  // 3、将组件对象挂载到某一个DOM元素中
  toast.$mount(document.createElement('div'));
  // 4、此时toast.$el就是创建出来的这个div，已经创建好了，存在的，所以就可以追加DOM中
  console.log(toast.$el);
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
}

// 在main.js中导入并安装
export default obj;