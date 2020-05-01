<template>
  <van-swipe :loop="false" class="my-swipe" vertical>
    <van-swipe-item v-for="value in shopList" :key="value.id">
      <van-grid :icon-size="50" :border="false" square :column-num="4">
        <van-grid-item v-for="value in shopList" :key="value.id" :icon="imgSrc+value.image_path"></van-grid-item>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
//引入商铺列表数据
import { shopListApi } from "../../request/index";
export default {
  data() {
    return {
      shopList: [],
      //商家图片路径加上前缀http://kumanxuan1.f3322.net:8001/img/
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/"
    };
  },
  methods: {
    //获取用户定位
    getLoaction() {
      let _this = this;
      var geolocation = new BMap.Geolocation();
      //默认用户定位信息
      let userLocationInfo = {
        flag: false,
        point: { lng: 116.483038, lat: 39.990633 }
      };
      console.log(userLocationInfo)
      geolocation.getCurrentPosition(
        function(loc) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            userLocationInfo = {
              flag: true,
              point: { lng: loc.point.lng, lat: loc.point.lat }
            };
             console.log(userLocationInfo)
            //请求位置
            shopListApi(
              "latitude=" +
                userLocationInfo.point.lat +
                "&" +
                "longitude=" +
                userLocationInfo.point.lng
            ).then(res => {
              _this.shopList = res.data;
              console.log(res.data);
            });
          } else {
            shopListApi(userLocationInfo.lat, userLocationInfo.lng);
          }
        },
        { enableHighAccuracy: true }
      );
    }
  },

  created() {
    //实例已经创建完成之后调用getLoaction
    this.getLoaction();
  }
};
</script>

<style lang='less' scoped>
.my-swipe {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #fff;
    height: 320px;
    padding-bottom: 10px;
  }
}
</style>