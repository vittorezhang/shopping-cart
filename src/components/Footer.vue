<template>
  <van-tabbar v-model="active">
  <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item replace to="/search" icon="search">搜索</van-tabbar-item>
  <van-tabbar-item replace to="/orders" icon="orders-o">订单</van-tabbar-item>
  <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
  
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
};
</script>

<style>
</style>