<template>
  <div>
    <!-- 首页头部 -->
     <home-title />
     <!-- 滑动组件 -->
     <my-swipe />
  </div>
</template>

<script>
import homeTitle from "./hometitle"
import mySwipe from "./swipe"
export default {
  components:{
    homeTitle,
    mySwipe
  }
}
</script>

<style>

</style>