<template>
  <div class="home-store-list">
    <div class="list-title">
      <van-icon name="shop-o"></van-icon>
      <span>附近商家</span>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in storeList" :key="item.id" :to="'/detail/'+item.id" class="store-list-item">
        <list-item-box :itemObj="item"></list-item-box>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { storeListApi } from "../../../request/index";
import Bus from "../bus";
import listItemBox from "./soreListItem";
export default {
  components: {
    listItemBox
  },
  data() {
    return {
      storeList: [],
      loading: false,
      finished: false,
      offset: 0,
      limit: 10
    };
  },
  methods: {
    sendApi(latitude, longitude) {
      storeListApi({
        latitude,
        longitude,
        offset: this.offset,
        limit: this.limit
      }).then(res => {
        this.storeList = [...this.storeList, ...res.data];
        this.loading = false;
        this.offset = this.storeList.length;
        if (this.storeList.length >= 53) {
          this.finished = true;
        }
      });
    },
    getData() {
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
            // console.log(that.offset, that.limit);

            //请求位置
            that.sendApi(
              userLocationInfo.point.lat.toFixed(6),
              userLocationInfo.point.lng.toFixed(6)
            );
          } else {
            Toast("获取定位失败,请检查");
            that.sendApi(
              userLocationInfo.lat.toFixed(6),
              userLocationInfo.lng.toFixed(6)
            );
          }
        },
        { enableHighAccuracy: true }
      );
    },
    onLoad() {
      // console.log(123456);
      // 异步更新数据
      this.getData();
    }
  },
  created() {
    let that = this;
    Bus.$on("my-refresh", function() {
      that.storeList = [];
      that.getData();
    });
  }
};
</script>

<style lang="less" scoped>
.home-store-list {
  margin-top: 30px;
  margin-bottom: 100px;
  .list-title {
    height: 40px;
    line-height: 40px;
    background: #fff;
    font-size: 20px;
    padding-left: 20px;
    color: #999;
    .van-icon {
      font-size: 24px;
      vertical-align: text-bottom;
    }
    span {
      margin-left: 10px;
    }
  }
  .store-list-item {
    padding: 10px 10px;
  }
}
</style>