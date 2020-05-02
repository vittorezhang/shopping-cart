<template>
  <div class="home-store-list">
    <div class="list-title">
      <van-icon name="shop-o"></van-icon>
      <span>附近商家</span>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in storeList" :key="item.id" class="store-list-item">
        <list-item-box :itemObj="item"></list-item-box>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { storeListApi } from "../../request/index";
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
    };
  },
  methods: {
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
            //请求位置
            storeListApi({
              latitude: userLocationInfo.point.lat.toFixed(6),
              longitude: userLocationInfo.point.lng.toFixed(6)
            }).then(res => {
              console.log(res.data[0]);

              that.storeList = res.data;
              this.loading = false;
              this.finished = true;
            });
          } else {
            storeListApi(userLocationInfo.lat, userLocationInfo.lng);
          }
        },
        { enableHighAccuracy: true }
      );
    },
    onLoad() {
      // 异步更新数据
      this.getData();
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    }
  },
  created() {
    // this.getData();
  }
};
</script>

<style lang="less" scoped>
.home-store-list {
  margin-top: 30px;
  margin-bottom: 100px;
  .list-title {
    height: 40px;
    line-height: 30px;
    background: #fff;
    font-size: 20px;
    padding-left: 20px;
    .van-icon {
      font-size: 24px;
      vertical-align: text-bottom;
    }
    span {
      margin-left: 10px;
    }
    
  }
  .store-list-item{
      padding: 10px 10px;
    }
}
</style>