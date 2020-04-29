<template>
  <div id="app">
    <router-view />
    <!-- 3.使用组件 -->
    <tar-bar></tar-bar>
  </div>
</template>

<script>
//1.引入tarBar组件
import TarBar from "./components/tarBar/tarBar";
export default {
  //2.注册组件
  components: {
    TarBar
  }
};
</script>
<style lang="less">
@import url("./assets/styles/reset.less");
#app {
  height: 100vh;
  font-size: 40px;
}
</style>