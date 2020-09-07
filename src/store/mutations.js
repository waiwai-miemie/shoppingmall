export default {
  addCounter(state, payload) {
    payload.count += 1;
  },
  addToCart(state, payload) {
    // 添加是否被选中的属性
    payload.check = false;
    state.cartList.push(payload);
  }
}