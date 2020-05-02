<template>
  <div class="container">
    <!-- 商家信息 -->
    <div class="details">
      <div class="details_info">
        <van-icon name="arrow-left" size="26" />
        <div class="details_image">
          <van-image fit="contain" :src="imgSrc+InfoList.image_path" />
        </div>
        <!-- 配送 -->
        <div class="details_right">
          <h5 style="margin:0;font-size:16px">{{InfoList.name}}</h5>
          <div class="right_info">
            <div class="left">
              <p style="margin:0;font-size:16px">商家配送/分钟送达/配送费￥5</p>
              <p style="margin:0;font-size:16px">公告:买买买</p>
            </div>
            <div class="right">
              <van-icon name="arrow" size="22" />
            </div>
          </div>
        </div>
      </div>
      <!-- 满减 -->
      <div>
        <van-nav-bar>
          <template #left>
            <van-tag type="warning">简</van-tag>
            <span>满减</span>/
            <van-tag type="warning">简</van-tag>
            <span>满减</span>
          </template>
          <template #right>
            <p>1个活动</p>
            <van-icon name="arrow" size="18" class="icon" />
          </template>
        </van-nav-bar>
      </div>
    </div>
    <!-- 产品信息 -->
    <van-tabs title-active-color="#1989fa" color="#1989fa" line-width="50">
      <van-tab title="商品">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="热销榜" dot />
          <van-sidebar-item title="超值特惠" badge="5" />
          <van-sidebar-item title="爆款饮品" badge="99+" />
        </van-sidebar>
        <van-panel
          style="display:inline-block;width:80%;height:100vh;overflow-y:scroll;background:rgba(0,0,0,0)"
        >
          <template #header></template>
          <!-- 商品 -->
          <van-card v-for="item in 20" :key="item">
            <template #thumb>
              <span class="icon_top">新品</span>
              <van-image :src="imgSrc+InfoList.image_path" />
            </template>
            <!-- 标题 -->
            <template #title>
              <div class="goods_box">
                <div class="icon_left">
                  <h3 style="margin:0">卤水点豆腐</h3>
                </div>
                <p class="icon_right" style="margin:0">
                  <van-tag round plain color="#FF6347">
                    <span>品牌</span>
                  </van-tag>
                </p>
              </div>
            </template>
            <!-- 内容 -->
            <template #tags>
              <!-- 商家信息描述 -->
              <div class="goods_box miao_shu">111</div>
              <div class="goods_box">月售卖：111</div>
              <div class="goods_box">
                <van-tag round plain color="#ff976a">
                  <span>1</span>
                </van-tag>
              </div>
              <div class="goods_box">
                <div class="icon_left Price">
                  ￥
                  <span>20起</span>
                </div>
                <div class="icon_right">
                  <van-stepper v-model="value" />
                </div>
              </div>
            </template>
          </van-card>
        </van-panel>
      </van-tab>
      <van-tab title="评价">123</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { shopImformationApi } from "../../request/index";
export default {
  data() {
    return {
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/",
      InfoList: [],
      activeKey: 0
    };
  },
  created() {
    let { shopid } = this.$route.params;
    // console.log(this.$route.params);
    shopImformationApi({ shopid }).then(res => {
      // console.log(res.data);
      if (res.status == 200) {
        this.InfoList = res.data;
      }
      // console.log(this.InfoList.activities);
    });
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 数据全部加载完成
        if (this.InfoList.length >= 20) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less">
@import url('../../assets/styles/detailPage.less');
</style>