<template>
  <div class="homePage-content">
    <!-- 3.使用组件 -->
    <home-top-bar></home-top-bar>
    <home-food-list></home-food-list>
  </div>
</template>

<script>
//1.引入homeTopBar,homeFoodList组件
import homeTopBar from "./homeTopBar";
import homeFoodList from "./homeFoodList";
export default {
  //2.注册组件
  components: {
    homeTopBar,
    homeFoodList
  }
};
</script>

<style lang='less' scoped>
@import url("../../assets/styles/global.less");
.homePage-content {
  height: 100%;
}
</style>