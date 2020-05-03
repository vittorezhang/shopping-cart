<template>
  <div class="home-list-item">
    <div class="left-box">
      <img :src="imgSrc+itemObj.image_path" alt />
    </div>
    <div class="right-box">
      <div class="flex-row title-row">
        <div>
          <span class="brand">品牌</span>
          <span class="brand-name">{{itemObj.name}}</span>
        </div>

        <div>
          <div
            class="support-icon"
            v-for="item in itemObj.supports"
            :key="item.id"
          >{{item.icon_name}}</div>
        </div>
      </div>
      <div class="flex-row serve-row">
        <div>
          <my-start class="start-box" :startNum="itemObj.rating"></my-start>
          <span class="rating">{{itemObj.rating}}</span>
          <span class="order-sell">月售{{itemObj.recent_order_num}}单</span>
        </div>
        <div>
          <span class="delivery-mode" v-if="itemObj.delivery_mode">{{itemObj.delivery_mode.text}}</span>
          <span
            class="support-serve"
            v-if="itemObj.supports[1].icon_name=='准'"
          >{{itemObj.supports[1].name}}</span>
        </div>
      </div>
      <div class="flex-row info-row">
        <div>&yen;20起送 / {{itemObj.piecewise_agent_fee.tips}}</div>
        <div class="info-distance">
          <span>{{itemObj.distance}} /</span>
          <span>{{itemObj.order_lead_time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myStart from "../../../components/start/start";
export default {
  props: {
    itemObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/"
    };
  },
  components: {
    myStart
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/styles/global.less");

.home-list-item {
  height: 150px;
  display: flex;
  flex-direction: row;
  .left-box {
    height: 100%;
    img {
      height: 150px;
      width: 150px;
    }
  }
  .right-box {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    justify-content: space-around;
    .flex-row {
      font-size: 12px; /*no */
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .title-row {
      .brand {
        color: #000;
        font-weight: bold;
        background: #ffd930;
        padding: 0 5px;
      }
      .brand-name {
        font-size: 26px;
        font-weight: 800;
        letter-spacing: 2px;
        margin-left: 5px;
      }
      .support-icon {
        display: inline-block;
        width: 25px;
        height: 25px;
        color: #777;
        border: 1px solid #ddd;
        text-align: center;
        margin-right: 4px;
      }
    }
    .serve-row {
      .start-box {
        width: 80px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
      .rating {
        color: #ff6000;
        font-size: 14px; /*no */
      }
      .order-sell {
        color: #999;
      }
      .delivery-mode {
        background-color: @globalColor;
        color: #fff;
        font-weight: 800;
        padding: 0 5px;
      }
      .support-serve {
        color: @globalColor;
        border: 1px solid @globalColor;
        padding: 0 5px;
        margin-left: 5px;
      }
    }
    .info-row {
      .info-distance span:nth-child(1) {
        color: #999;
      }
      .info-distance span:nth-child(2) {
        color: @globalColor;
      }
    }
  }
}
</style>