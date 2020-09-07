<template>
  <!-- ref的作用是父组件从子组件时用的，这里最好通过ref获取元素，因为整个html文档中可能有很多处类名叫wrapper -->
  <div class="wrapper" ref="wrapper">
    <!-- 要多用一个content包裹slot，保证wrapper中只有一个元素 -->
    <div class="content"><slot></slot></div>
  </div>
</template>
<script>
import BScroll from "better-scroll"
export default {
  name: 'Scroll',
  data(){
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      // button默认可以被点击，但是其他标签要点击必须设置
      click: true,
      // 并非所有的情况下都想监听，所以这里可以设置成可变的
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 监听滚动事件
    this.scroll.on('scroll', (position)=>{
      // 将position传递出去
      this.$emit('positionChange', position);
    });
    // 监听滚动到底部事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',()=>{
        // console.log('到底啦');
        this.$emit('pullingUp');
      })
    }
  },
  methods:{
    // 可以直接在这里封装一个滚动函数，提高代码可读性，time如果没有传入默认500ms
    // 1、滚回顶部
    scrollTo(x, y, time=500){
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 2、重新计算scrollHeight
    refresh(){
      // console.log('111');
      this.scroll && this.scroll.refresh();
    },
    // 3、结束上拉请求，下一次上拉请求才能开始
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>
<style scoped>

</style>
