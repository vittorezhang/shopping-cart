<template>
  <van-tabbar v-model="active">
    <van-tabbar-item class="iconfont icon-_waimai">外卖</van-tabbar-item>
    <van-tabbar-item class="iconfont icon-sousuo">搜索</van-tabbar-item>
    <van-tabbar-item class="iconfont icon-dingdan">订单</van-tabbar-item>
    <van-tabbar-item class="iconfont icon-wode">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less" scoped>


</style>
<style lang="less">
.van-tabbar{
    height: 80px;
}
.van-tabbar-item{
    font-size: 30px;
}
</style>