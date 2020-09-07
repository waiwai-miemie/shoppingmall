<template>
    <div class="tabBarItem" @click="itemClick">
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
        <!-- 注意：插槽里面最好不好设置各种属性，用一个盒子将它包起来在盒子里面设置属性比较好，因为对插槽的替换是将整个slot替代掉，会导致里面设置的属性被覆盖 -->
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeColor"><slot name="item-text"></slot></div>
    </div>
</template>
<script>
export default {
    name:'TabBarItem',
    props:{
        link:String,
        color:{
            type:String,
            default:'deeppink'
        }
    },
    data(){
        return {
            // isActive:true
        }
    },
    computed:{
        isActive(){
            // 找不到返回-1，找到返回0
            // console.log(this.$route.path.indexOf(this.link));
            return this.$route.path.indexOf(this.link)!==-1;
        },
        // 可以在父组件中传递颜色，当样式比较复杂的时候可以用方法或对象形式传入
        activeColor(){
            return this.isActive?{color:this.color}:{}
        }
    },
    methods:{
        itemClick(){
            // console.log(this.$route);
            this.$router.replace(this.link);
        }
    }
}
</script>
<style scoped>
.tabBarItem {
    flex: 1;
    text-align: center;
    font-size: 14px;
    padding-top: 3px;
}
.tabBarItem img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
}

</style>
