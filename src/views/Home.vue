<template>
  <div class="content">
    <!-- 菜单 -->
    <div class="banner">
      <van-swipe class="my-swipe" show-indicators>
        <van-swipe-item v-for="item in classList" :key="item.id">
          <van-grid :border="false" :column-num="4">
            <van-grid-item v-for="v in item" :key="v.id">
              <van-image :src="'https://fuss10.elemecdn.com'+v.image_url" width="30" height="30"/>
              <p>{{v.title}}</p>
            </van-grid-item>
          </van-grid>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 标题 -->
    <van-cell icon="shop-o" title="附近商家" title-class="Shoptitle"></van-cell>
    <!-- 商品 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-card
            v-for="item in goodsList"
            :key="item.id"
            @click="click(item.id)"
        >
        <template #thumb>
            <van-image  :src="'http://kumanxuan1.f3322.net:8001/img/'+item.license.catering_service_license_image"/>
        </template>
        <!-- 标题 -->
        <template #title>
            <div class="goods_box">
                <div class="icon_left">
                    <van-tag style="background:#FFC125">
                        <span style="color:#000">品牌</span>
                    </van-tag>
                    <span>{{item.description}}</span>
                </div>
                <p class="icon_right">
                    <van-tag plain v-for="v in item.supports" :key="v.id">
                        {{v.icon_name}}
                    </van-tag>
                </p>
            </div>
        </template>
        <template #tags>
            <div class="goods_box">
                <div class="icon_left">
                    <van-rate v-model="item.rating" :allow-half="true" disabled disabled-color="#FFD700"/>
                    <span class="rating_fen">{{item.rating}}</span>
                    <span style="color:#aaa">月售{{item.recent_order_num}}单</span>
                </div>
                <p class="icon_right">
                    <van-tag type="primary">
                        {{item.delivery_mode.text}}
                    </van-tag>
                    <van-tag type="primary" plain>
                        {{item.supports[1].name}}
                    </van-tag>
                </p>
            </div>
            <div class="goods_box">
                <div class="icon_left">
                    ￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}
                </div>
                <p class="icon_right">
                    {{item.distance}} / {{item.order_lead_time}}
                </p>
            </div>
        </template>
        </van-card>
    </van-list>
  </div>
</template>

<script>

import { getList, getGoods } from "../request/Api.js";
export default {
    
  data() {
    return {
      classList: [],
      goodsList: [],
      loading: false,
      finished: false,
    };
  },
  created() {
    // 获取分类数据
    getList().then(res => {
      let oneArr = res.data.slice(0, 8);
      let twoArr = res.data.slice(8, 16);
      let newArr = [oneArr, twoArr];
      this.classList = newArr;
    });
    getGoods({
      latitude: "23.128225",
      longitude: "113.289752"
    }).then(res => {
      this.goodsList = res.data;
    });
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    click(id){
      this.$router.push('/details/' + id)
    }
  }
};
</script>


<style lang="less" scope>
.Shoptitle {
  font-weight: 800;
  color: #aaa;
}
.content {
  .banner {
    margin: 10px 0;
    background: #fff;
  }
  .rating_fen{
      color:orange;
      font-size:26px;
      font-weight:800;
  }

  .goods_box{
      overflow: hidden;
      position: relative;
      .icon_left{
        display:inline-block;
        position: absolute;
        top:25%;
      }
      .icon_right{
        display:inline-block;
        float:right;
        padding-right:2px;
        }
  }
  .van-list .van-card .van-card__header .van-card__thumb{
      // flex:0.2;
  }
  
  
}

</style>