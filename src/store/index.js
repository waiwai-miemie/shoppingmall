import Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  // mutations中的属性最好只做单一的事情，多步操作或异步的事情放在actions中
  mutations,
  getters,
  actions
})

export default store