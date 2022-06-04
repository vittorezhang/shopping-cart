<template>
  <van-grid :icon-size="50" :border="false">
    <van-grid-item v-for="value in dataList" :key="value.id" :icon="msg+value.image_url" :text="value.title" />
  </van-grid>
</template>

<script>
export default {
    // 接收传递的数据
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
    // 定义图片的前缀
    data() {
        return {
            msg:"https://fuss10.elemecdn.com"
        }
    }
};
</script>

<style>
</style>
