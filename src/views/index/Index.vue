<template>
<div class="container">
  <!-- 头部导航 -->
  <Header></Header>
  <!-- 中间类别 -->
  <Swipe></Swipe>
  <!-- 中间内容列表 -->
  <ContentList></ContentList>
  <!-- 底部TabBar -->
  <TabBar></TabBar>
  
</div>
  
</template>

<script>

// 引入头部组件
import Header from "./children/Header.vue";
import Swipe from "./children/Swipe.vue";
import ContentList from "./children/ContentList.vue";
import TabBar from "./children/TabBar.vue";

export default {
  components: {
    Header,
    Swipe,
    ContentList,
    TabBar
  }
};
</script>


<style lang="less">
.container{
  width: 100%;
  height: 100%;
  background-color: #ddd;
}
</style>