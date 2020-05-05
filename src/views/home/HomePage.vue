<template>
<div class="home">
  <router-view />
<van-tabbar class="Nav" route :fixed="fixeds" :border="bool"	>
  <van-tabbar-item replace to="/takeaway" icon="home-o" size="40">
    外卖
  </van-tabbar-item>
  <van-tabbar-item replace to="/search" icon="search" size="40">
    搜索
  </van-tabbar-item>
  <van-tabbar-item replace to="/order" icon="balance-list-o" size="40">
    订单
  </van-tabbar-item><van-tabbar-item replace to="/me" icon="contact" size="40">
    我的
  </van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {
  data(){
    return{
      bool:true,
      fixeds:true,
    }
  },
  methods:{
    routerPush(){
    this.$router.replace('/takeaway');

      // this.$router.push({  //核心语句
      //   path:'/takeaway',   //跳转的路径
      // })
    }
  },
  created() {
    // this.routerPush()
  }
  
}
</script>

<style>
/* @import '../../assets/less'; */
 .home {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
 }
.Nav {
  padding-top: 10px;
  padding-bottom: 10px;
  position: fixed;
  bottom: 0px;
}
</style>