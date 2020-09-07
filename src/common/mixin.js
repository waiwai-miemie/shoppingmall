import { debounce } from "./utils"
export const imgLoadMixin = {
  data() {
    return {
      imgRefresh: null,
      refresh: null
    }
  },
  mounted() {
    // 如果没有被变量保存起来的话，每一次在**方法**中调用refresh函数的时候都要重新对refresh赋值，每次都是一个全新的refresh，防抖就没有效果了，用一个变量保存起来的话，被其他组件调用的时候会继承data中的东西，可直接使用this.refresh()
    this.refresh = debounce(this.$refs.scroll && this.$refs.scroll.refresh, 50);
    this.imgRefresh = () => {
      this.refresh();
    };
    this.$bus.$on('imgLoad', this.imgRefresh);
    // console.log('我是混入内容');
  }
}