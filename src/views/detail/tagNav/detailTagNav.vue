<template>
  <van-tabs class="tabs_wapper" v-model="activeName" title-active-color="#1989fa" line-width="10vw" line-height="1vw" color="#1989fa" >
    <van-tab title="商品" name="foodList" :title-style="titleStyle">
        <food-list></food-list>
    </van-tab>
    <van-tab title="评价" name="commentList" :title-style="titleStyle">
        <comment-list></comment-list>
    </van-tab>
  </van-tabs>
</template>

<script>
import foodList from "./foodLIst";
import commentList from "./commentList";
export default {
  data() {
    return {
      activeName: "foodList",
      titleStyle:{
          "font-size":"14px",
          
          "height":"100%",
      }
    };
  },
  components: {
    foodList,
    commentList
  }
};
</script>

<style lang="less" scoped>
.tabs_wapper{
    margin-top: 10px;
}
</style>