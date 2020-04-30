<template>
  <van-nav-bar
    class="homeTop-bar"
    :title="userLocation"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <van-icon name="search" size="18" />
    </template>
    <template #right>
      <span>登陆</span>
      <span class="register">|</span>
      <span>注册</span>
    </template>
  </van-nav-bar>
</template>

<script>
import { locationApi } from "../../request/index";
import { Toast } from "vant";
export default {
  data() {
    return {
      userLocation: "正在定位..."
    };
  },
  methods: {
    onClickLeft() {
      Toast("search");
    },
    onClickRight() {
      Toast("请先注册登录");
    },
    //获取用户定位
    getLoaction() {
      let _this = this;
      var geolocation = new BMap.Geolocation();
      //默认用户定位信息
      let userLocationInfo = {
        flag: false,
        point: { lng: 116.483038, lat: 39.990633 }
      };
      geolocation.getCurrentPosition(
        function(loc) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            userLocationInfo = {
              flag: true,
              point: { lng: loc.point.lng, lat: loc.point.lat }
            };
            //请求位置
            locationApi(
              userLocationInfo.point.lat + "," + userLocationInfo.point.lng
            ).then(res => {
              _this.userLocation = res.data.name;
            });
          } else {
            locationApi(userLocationInfo.lat, userLocationInfo.lng);
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

<style lang="less" scoped>
@import url("../../assets/styles/global.less");
.homeTop-bar {
  height: 80px;
  line-height: 60px;
  background-color: @globalColor;
  .register {
    margin: 0 8px;
  }
}
</style>