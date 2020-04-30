<template>
  <div class="homePage-content">
    <!-- 3.使用组件 -->
    <home-top-bar></home-top-bar>
  </div>
</template>

<script>
//1.引入homeTopBar组件
import homeTopBar from "./homeTopBar";
export default {
  //2.注册组件
  components: {
    homeTopBar
  }
};
</script>

<style lang='less' scoped>
@import url("../../assets/styles/global.less");
.homePage-content {
  height: 100%;
}
</style>