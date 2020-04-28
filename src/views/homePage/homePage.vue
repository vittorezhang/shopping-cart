<template>
  <div class="homePage-wapper">
    <head-nav></head-nav>
    <home-food-list></home-food-list>
  </div>
</template>

<script>
import headNav from "./headBar.vue"
import homeFoodList from "./homeFoodList"
export default {
  components:{
    headNav,
    homeFoodList
  }
};
</script>

<style lang='less' scoped>
.homePage-wapper {
  height: 100%;
 
}
</style>