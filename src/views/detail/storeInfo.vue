<template>
  <div
    class="detail-store-info"
    v-if="storeDeatail.image_path"
    :style="`background:url('http://kumanxuan1.f3322.net:8001/img/${storeDeatail.image_path}') 0 0 no-repeat`"
  >
    <div class="tran-box">
      <div class="store-info-box">
        <div class="banner-box">
          <img
            v-if="storeDeatail.image_path"
            :src="'http://kumanxuan1.f3322.net:8001/img/'+storeDeatail.image_path"
            alt
          />
        </div>
        <div class="info-box">
          <div class="sotre-name-row">{{storeDeatail.name}}</div>
          <div class="sotre-info-row">
            <div class="run-info">
              <p
                v-if="storeDeatail.piecewise_agent_fee"
              >商家配送 / 分钟送达 / {{storeDeatail.piecewise_agent_fee.tips}}</p>
              <p>公告:{{storeDeatail.promotion_info}}</p>
            </div>
            <div class="run-icon">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="active-row">
        <van-swipe
          class="actives-box"
          vertical
          loop
          autoplay="2000"
          :show-indicators="false"
          :touchable="false"
        >
          <van-swipe-item v-for="item in storeDeatail.activities" :key="item.id">
            <span class="actives-icon">{{item.icon_name}}</span>
            {{item.description}}
          </van-swipe-item>
        </van-swipe>
        <p v-if="storeDeatail.activities">
          {{storeDeatail.activities.length}}个活动
          <van-icon name="arrow" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { storeInfoApi } from "../../request/index";

export default {
  data() {
    return {
      storeDeatail: {},
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/"
    };
  },
  methods: {
    getData() {
      storeInfoApi(this.$route.params.shopid).then(res => {
        //   console.log(res.data);
        this.storeDeatail = res.data;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.detail-store-info {
  height: 100%;
  box-sizing: content-box;
  .tran-box {
    padding: 10px 20px;
    height: 100%;
    background-color: rgba(210, 210, 210, 0.8);
    .store-info-box {
      display: flex;
      justify-content: row;
      .info-box {
        color: #fff;
        flex: 2;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .sotre-name-row {
          font-weight: 800;
          font-size: 16px; /*no */
          flex: 1;
        }
        .sotre-info-row {
          flex: 2;
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .run-info {
          font-size: 12px; /*no */
          line-height: 45px;
        }
        .run-icon {
          height: 100%;
          align-items: flex-end;
          font-size: 26px; /*no */
          .van-icon {
            height: 100%;
            line-height: 100px;
          }
        }
      }
    }

    .active-row {
      margin-top: 10px;
      width: 100%;
      height: 28px;
      font-size: 12px; /*no */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      .actives-box {
        height: 100%;
        color: #fff;
        .actives-icon {
          border-radius: 20px;
          padding: 5px;
          background-color: #f07373;
          font-weight: 800;
        }
      }
      p {
        color: #fff;
      }
    }
  }
  .banner-box {
    height: 150px;
    width: 150px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>