<template>
  <div class="index-wapper">
    <router-view class="router-wapper"></router-view>
    <tar-bar :route="true"></tar-bar>
  </div>
</template>

<script>
import tarBar from "../../components/tarBar/tarBar.vue";

export default {
  components: {
    tarBar
  }
};
</script>

<style lang="less" scope>
.index-wapper{
  height: 100%;
  background-color: #eee;
  .router-wapper{
    padding-bottom:100px;
    box-sizing: border-box;
  }
}
</style>