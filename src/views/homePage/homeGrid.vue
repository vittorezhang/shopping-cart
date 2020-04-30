<template>
  <van-grid :icon-size="50" :border="false" class="grid-wapper" square>
    <van-grid-item v-for="value in dataList" :key="value.id" :icon="imgSrc+value.image_url" :text="value.title" >
      <!-- <van-image class="item-img" :src="imgSrc+value.image_url"></van-image> -->
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default(){
        return[];
      },
    }
  },
  data(){
    return{
      imgSrc: "https://fuss10.elemecdn.com"
    }
  }
};
</script>

<style lang="less" scped>

</style>