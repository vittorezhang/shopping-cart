<template>
  <div class="detail-wapper">
    <sotre-info class="store-info"></sotre-info>
    <tag-nav class="shop-info"></tag-nav>
  </div>
</template>

<script>
import sotreInfo from "./storeInfo";
import tagNav from "./tagNav/detailTagNav";
import shopCar from "./shopCar";
export default {
  data() {
    return {};
  },
  components: {
    sotreInfo,
    tagNav,
    shopCar 
  }
};
</script>

<style lang='less' scoped >
.detail-wapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  .store-info {
    flex: 1;
  }
  .shop-info {
    flex: 3;
    background-color: #f5f5f5;
    padding-bottom: 80px;
  }

 
}
</style>