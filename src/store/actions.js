export default {
  // actions中的函数第一个参数是actions
  addCart(context, payload) {
    // 1、判断当前点击的商品有没有存在购物车当中了，即payload是否在cartList中出现过
    // 方法一：
    // 定义变量存储item将item传递出来
    // let oldProduction = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduction = item;
    //   }
    // }
    // 方法二：
    return new Promise((resolve, reject) => {
      let oldProduction = context.state.cartList.find(item => item.iid === payload.iid);
      // 2、如果当前点击商品还没加入过购物车，则新增商品的count属性，属性值为1；如果已经添加了过了，则商品原本的count++
      // 这里直接改变oldProduction里面的count值可以改变item中的count值，因为对象赋值是使oldProduction指向item所指向的值，指的是同一个内存地址
      if (oldProduction) {
        // oldProduction.count += 1;
        // 属性计算放在mutations中
        context.commit('addCounter', oldProduction);
        resolve('当前商品数量+1');
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit('addToCart', payload);
        resolve('加入购物车成功');
      }
    })
  }
}