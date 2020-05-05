<template>
  <div class="homePage-content">
    <a href="/" class="text">您的页面跑丢了，可以点击返回首页哦</a>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
@import url("../../assets/styles/global.less");
.homePage-content {
  height: 100%;
  width: 100%;
  overflow: scroll;
  .text {
    color: black;
    font-weight: bold;
  }
}
</style>