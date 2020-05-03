<template>
<div class="home">
  <router-view />
<van-tabbar class="Nav" route fixed :border="bool"	>
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
    }
  }
  
}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
}
.Nav {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>