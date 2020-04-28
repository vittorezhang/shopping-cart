<template>
  <van-swipe :loop="false" class="my-swipe">
    <van-swipe-item>
      <home-grid></home-grid>
    </van-swipe-item>
    <van-swipe-item>
        <home-grid></home-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import homeGrid from "./homeGrid";
export default {
  components: {
    homeGrid
  }
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  height: 300px;
  padding-bottom: 30px;
}
</style>