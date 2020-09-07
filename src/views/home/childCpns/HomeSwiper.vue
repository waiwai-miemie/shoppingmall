<template>
  <div>
    <swiper>
    <swiper-item :key="index" v-for="(item,index) in banners">
      <a :href="item.link"><img :src="item.image" alt="" @load="swiperImgLoaded"></a>
    </swiper-item>
  </swiper>
  </div>
</template>
<script>
  import {Swiper,SwiperItem} from "components/common/swiper"
  export default {
    name:"HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods: {
      swiperImgLoaded(){
        this.$emit('swiperImgLoaded');
      }
    }
  }
</script>
<style scoped>
</style>
