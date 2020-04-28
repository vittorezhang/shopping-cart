<template>
    
  <van-tabbar class="tarBar" v-model="active" route>
    <van-tabbar-item replace class="iconfont" to="/index" icon-prefix="icon" name="element"  icon="eleme">外卖</van-tabbar-item>
    <van-tabbar-item replace class="iconfont" to="/index/search" icon-prefix="icon" name="search" icon="compass">搜索</van-tabbar-item>
    <van-tabbar-item replace class="iconfont" to="/index/order" icon-prefix="icon" name="order" icon="order">订单</van-tabbar-item>
    <van-tabbar-item replace class="iconfont" to="/index/user" icon-prefix="icon" name="user" icon="wode">我的</van-tabbar-item>
  </van-tabbar>


</template>

<script>
// import "../../assets/fonts/iconfont";
export default {
  props:{
    route:false,
  },
  data() {
    return {
      active: "element"
    };
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/fonts/iconfont.css");
.tarBar {
  height: 70px;
 
}
</style>