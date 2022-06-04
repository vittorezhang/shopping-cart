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
      to="/home/search"
      icon-prefix="icon"
      name="search"
      icon="zhinanzhen"
    >搜索</van-tabbar-item>
    <van-tabbar-item
      replace
      class="iconfont"
      to="/home/order"
      icon-prefix="icon"
      name="order"
      icon="dingdan"
    >订单</van-tabbar-item>
    <van-tabbar-item
      replace
      class="iconfont"
      to="/home/user"
      icon-prefix="icon"
      name="user"
      icon="wode"
    >我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  props: {
    //关闭路由模式
    route: false
  },
  data() {
    return {
      active: "home"
    };
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/fonts/iconfont.css");
.tarBar {
  height: 70px;
}
</style>