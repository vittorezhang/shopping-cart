<template>
  <div class="homePage-content">
    <router-view class="router-view"></router-view>
    <tar-bar ></tar-bar>
  </div>
  
</template>

<script>
import tarBar from "./Myhome";
export default {
  components: {
    tarBar
  }
};
</script>

<style lang="less" scoped>
.homePage-content {
  height: 100%;
  background-color: #eee;
  .router-view {
    padding-bottom: 70px;
    box-sizing: border-box;
  }
}
</style>