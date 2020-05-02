<template>
  <van-nav-bar
    class="headBar-wapper"
    :title="userLoaction"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <van-icon name="search" size="18" />
    </template>
    <template #right>
      <span>登陆</span>
      <span class="login-flag">|</span>
      <span>注册</span>
    </template>
  </van-nav-bar>
</template>

<script>
import { locationApi } from "../../request/index";
import Bus from "./bus";
export default {
  data() {
    return {
      userLoaction: "定位中"
    };
  },

  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {},
    //定位设置用户位置
    getLoaction() {


      let that = this;
      var geolocation = new BMap.Geolocation();
      //用户定位信息
      let userLocationInfo = {
        flag: false,
        point: { lng: 116.483038, lat: 39.990633 }
      };
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            userLocationInfo = {
              flag: true,
              point: { lng: r.point.lng, lat: r.point.lat }

            };
            //请求位置
            locationApi(
              userLocationInfo.point.lat + "," + userLocationInfo.point.lng
            ).then(res => {
              if(res.data.status == 0)Toast("获取位置失败,请检查");
              
              that.userLoaction = res.data.name;
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
    //此时已经可以访问方法和data
    let that = this;
    this.getLoaction();

    Bus.$on("my-refresh", function() {
      that.userLoaction = "正在重新定位";
      that.getLoaction();
    });
  
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/styles/global.less");
.headBar-wapper {
  height: 80px;
  line-height: 60px;
  background-color: @globalColor;
  .login-flag {
    margin: 0 8px;
  }
}
</style>