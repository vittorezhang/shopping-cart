<template>
  <van-tabbar class="tarBar" v-model="active" route>
    <van-tabbar-item
      replace
      class="iconfont"
      to="/home"
      icon-prefix="icon"
      name="home"
      icon="eleme"
    >外卖</van-tabbar-item>
    <van-tabbar-item
      replace
      class="iconfont"
      to="/search"
      icon-prefix="icon"
      name="search"
      icon="compass"
    >搜索</van-tabbar-item>
    <van-tabbar-item
      replace
      class="iconfont"
      to="/order"
      icon-prefix="icon"
      name="order"
      icon="order"
    >订单</van-tabbar-item>
    <van-tabbar-item
      replace
      class="iconfont"
      to="/user"
      icon-prefix="icon"
      name="user"
      icon="wode"
    >我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      route:false,
      active: "home"
    };
  }
};
</script>

<style lang="less" scoped>
// 引入自定义icon
@import url("../assets/icon/iconfont.css");
.tarBar {
  height: 70px;

}
</style>