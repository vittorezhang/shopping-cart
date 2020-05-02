<template>
  <div class="container">
    <!-- 附近商家 -->
    <van-cell icon="shop-o" title="附近商家" title-class="shop-title" class="nearby-businesses"></van-cell>
    <!--附近商家列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-card v-for="item in shopList" :key="item.id" @click="click(item.id)">
        <template #thumb>
          <van-image :src="imgSrc+item.license.catering_service_license_image" />
        </template>
        <!-- 商铺信息 -->
        <template #title>
          <div class="goods_box">
            <div class="icon_left">
              <van-tag class="brand">
                <span style="color:#000">品牌</span>
              </van-tag>
              <span>{{item.description}}</span>
            </div>
            <p class="icon_right">
              <van-tag plain v-for="v in item.supports" :key="v.id">{{v.icon_name}}</van-tag>
            </p>
          </div>
        </template>
        <template #tags>
          <div class="goods_box">
            <div class="icon_left">
              <van-rate v-model="item.rating" :allow-half="true" disabled disabled-color="#FFD700" />
              <span class="rating_fen">{{item.rating}}</span>
              <span style="color:#aaa">月售{{item.recent_order_num}}单</span>
            </div>
            <p class="icon_right">
              <van-tag type="primary">{{item.delivery_mode.text}}</van-tag>
              <van-tag type="primary" plain>{{item.supports[1].name}}</van-tag>
            </p>
          </div>
          <div class="goods_box">
            <div
              class="icon_left"
            >￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</div>
            <p class="icon_right">{{item.distance}} / {{item.order_lead_time}}</p>
          </div>
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
//引入商家列表数据
import { shopListApi } from "../../request/index";
export default {
  data() {
    return {
      shopList: [],
      //商家图片路径加上前缀http://kumanxuan1.f3322.net:8001/img/
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/",
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 数据全部加载完成
        if (this.shopList.length >= 20) {
          this.finished = true;
        }
      }, 1000);
    },
    click(id) {
      this.$router.push("/details/" + id);
    }
  },

  created() {
    //实例已经创建完成之后调用shopListApi
    shopListApi({
      latitude: "23.128225",
      longitude: "113.289752"
    }).then(res => {
      this.shopList = res.data;
    });
  }
};
</script>
<style lang='less' scoped>
.container {
  .shop-title {
    font-weight: 800;
    color: #aaa;
  }
  .nearby-businesses {
    margin-top: 10px;
  }
  .brand {
    background: orange;
  }
  .rating_fen {
    color: orange;
    font-size: 26px;
    font-weight: 800;
  }
  .goods_box {
    overflow: hidden;
    position: relative;
    .icon_left {
      display: inline-block;
      position: absolute;
      top: 25%;
    }
    .icon_right {
      float: right;
    }
  }
}
</style>