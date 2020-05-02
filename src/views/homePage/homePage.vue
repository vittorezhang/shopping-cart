<template>
  <div class="homePage-wapper">
    <!-- <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh"> -->
      <head-nav ></head-nav>
      <home-food-list></home-food-list>
      <home-store-list></home-store-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import HeadNav from "./headBar.vue";
import HomeFoodList from "./homeFoodList";
import HomeStoreList from "./homeStoreList"
import Bus from "./bus";
export default {
  data() {
    return {
      isLoading: false,
      
    };
  },

  components: {
    HeadNav,
    HomeFoodList,
    HomeStoreList
  },


  methods: {
    onRefresh() {
      let that = this;      
      Bus.$emit("my-refresh");
      setTimeout(()=>{
        that.isLoading = false;
      },2000)
    },
  
  }
};
</script>

<style lang='less' scoped>
.homePage-wapper {
  height: 100%;
}
</style>