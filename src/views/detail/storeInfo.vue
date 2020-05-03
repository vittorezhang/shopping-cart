<template>
  <div class="detail-store-info">
    <img :src="'http://kumanxuan1.f3322.net:8001/img/'+storeDeatail.image_path" alt />
    <div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { storeInfoApi } from "../../request/index";

export default {
  data() {
    return {
      storeDeatail: {},
      imgSrc:'http://kumanxuan1.f3322.net:8001/img/'
    };
  },
  created() {
    // console.log(this.$route.params.shopid);
    storeInfoApi(this.$route.params.shopid).then(res => {
    //   console.log(res.data);
      this.storeDeatail = res.data;
    });
  }
};
</script>

<style>
</style>