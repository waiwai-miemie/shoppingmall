<template>
    <tab-bar>
      <tab-bar-item link="/home">
      <!-- 注意注意：修改了webpack配置必须重新运行才能生效 -->
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item link="/shopcart">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
// 在webpack.base.conf.js中可以看到给src起的别名是@，所以这里可以直接使用别名，可以自定义多个别名，定义别名的时候要注意，只有脚手架3以上才可以在定义别名的时候引用上一个已定义的别名，脚手架2还是不能直接定义别名的时候只用src的@别名，必须写src
// 另外，使用别名的时候，如果是属性中的路径，必须在别名前加上~
// import TabBar from "../tabbar/TabBar"
import TabBar from "components/common/tabbar/TabBar"
import TabBarItem from "components/common/tabbar/TabBarItem"
export default {
    name:'MainTabBar',
    components:{
       TabBar, 
       TabBarItem
    }
}
</script>
<style scoped>

</style>