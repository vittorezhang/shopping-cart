<template>
  <van-grid :icon-size="50" :border="false" square>
    <van-grid-item
      v-for="value in dataList"
      :key="value.id"
      :icon="imgSrc+value.image_url"
      :text="value.title"
    ></van-grid-item>
  </van-grid>
</template>

<script>
export default {
  //接收父组件传过来的数据
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      //分类图片前缀
      imgSrc: "https://fuss10.elemecdn.com"
    };
  }
};
</script>

<style lang="less" scped>
</style>