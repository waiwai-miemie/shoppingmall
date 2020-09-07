<template>
  <div id="comment-info">
    <div v-if="commentInfo.cRate" class="comment-title">
      <span>用户评论({{commentInfo.cRate}})</span>
      <a href="#">更多</a>
    </div>
    <div v-else class="comment-title">
      <span>暂无评论</span>
    </div>
    <div class="content" v-if="commentInfo.list">
      <div class="user">
        <img :src="commentInfo.list[0].user.avatar" alt="">
        <span>{{commentInfo.list[0].user.uname}}</span>
      </div>
      <div class="msg">{{commentInfo.list[0].content}}</div>
      <div class="detail-info">
        <span class="date">{{commentInfo.list[0].created | showDate}}</span>
        <span>{{commentInfo.list[0].style}}</span>
      </div>
      <div class="img">
        <img :key="index" v-for="(item,index) in commentInfo.list[0].images" :src="item" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import {formatDate} from "@/common/utils.js"
  export default {
    name: 'DetailCommentInfo',
    props: {
      commentInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    filters: {
      showDate(value){
        const date = new Date(value*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>
<style scoped>
  #comment-info {
    border-bottom: 3px solid #eee;
    margin-bottom: 10px;
  }
  .comment-title {
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .comment-title a {
    float: right;
  }
  .content{
    padding: 20px;
  }
  .content .user img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .msg {
    margin-top: 15px;
  }
  .img img {
    width: 70px;
    height: 70px;
    box-shadow: 1px 1px 1px #eee;
    margin-right: 3px;
  }
  .detail-info {
    font-size: 12px;
    color: #aaa;
    padding: 10px 0;
  }
  .date {
    margin-right: 5px;
  }
</style>
