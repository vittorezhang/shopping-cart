<template>
  <div id="app">
    <router-view />
    <tar-bar></tar-bar>
  </div>
</template>

<script>
import TarBar from "./components/tarBar/tarBar";
export default {
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