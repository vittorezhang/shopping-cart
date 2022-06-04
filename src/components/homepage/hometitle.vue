<template>
  <van-nav-bar
    class="hometitle"
    :title="userLocation"
    right-text="登录|注册"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #left>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
</template>

<script>
//请求位置数据
import { pois } from "../../request/api.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      userLocation: "正在定位..."
    };
  },
  methods: {
    onClickLeft() {
      Toast("暂时搜索不了");
    },
    onClickRight() {
      Toast("请先注册登录");
    },
    // 用户定位方法
    geoMocation() {
      let _this = this;
      let geolocation = new BMap.Geolocation();
      // 初始值定位
      let geography = {
        lat: 23.128225,
        log: 113.289752
      };
      geolocation.getCurrentPosition(
        req => {
          if (geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
            // 获取精度维度
            geography = {
              lat: req.latitude,
              log: req.longitude
            };
            pois(geography.lat + "," + geography.log).then(res => {
              _this.userLocation = res.name;
            });
            //  调用接口
          } else {
            pois(geography.lat + "," + geography.log).then(res => {
              _this.userLocation = res.name;
            });
          }
        },
        { enableHighAccuracy: true }
      );
    }
  },
  created() {
    let geography = {
      lat: 23.128225,
      log: 113.289752
    };
    pois(geography.lat + "," + geography.log).then(res => {
      this.userLocation = res.name;
    });
    // pois().then(res => {
    //   this.userLocation = res.name;
    // });
    // this.geoMocation();
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/styles/global.less");
.hometitle {
  height: 80px;
  line-height: 60px;
  background-color: @globalColor;
}
</style>