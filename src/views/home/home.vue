<template>
  <div class="homePage-content">
    <router-view class="router-content"></router-view>
    <!-- 3.使用组件 -->
    <tar-bar :route="true"></tar-bar>
  </div>
</template>

<script>
//1.引入tarBar组件
import tarBar from "../../components/tarBar/tarBar.vue";
export default {
  //2.注册组件
  components: {
    tarBar
  }
};
</script>

<style lang="less" scope>
.homePage-content {
  height: 100%;
  background-color: #eee;
  .router-content {
    padding-bottom: 70px;
    box-sizing: border-box;
  }
}
</style>