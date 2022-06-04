<template>
  <div class="container">
    <!-- 商家信息-->
    <div class="details">
      <div class="details_info">
        <div class="details_image">
          <van-image fit="contain" :src="imgSrc+InfoList.image_path" />
        </div>
        <!-- 配送 -->
        <div class="details_right">
          <h5 style="margin:0">{{InfoList.name}}</h5>
          <div class="right_info">
            <div class="left">
              <p
                style="margin:0;font-size:22px"
              >{{InfoList.delivery_mode?InfoList.delivery_mode.text:'商家配送'}}/{{InfoList.piecewise_agent_fee?InfoList.piecewise_agent_fee.tips:'分钟送达/配送费￥5'}}</p>
              <p style="margin:0;font-size:22px">公告:{{InfoList.promotion_info}}</p>
            </div>
            <div class="right">
              <van-icon name="arrow" size="22" />
            </div>
          </div>
        </div>
      </div>
      <!-- 满减 -->
      <van-nav-bar>
        <template #left>
          <div v-for="item in InfoList.activities" :key="item.id">
            <van-tag type="warning">{{item.icon_name}}</van-tag>
            <span>{{item.description}}</span>
          </div>
        </template>
        <template #right>
          <p>{{InfoList.activitie?InfoList.activities.length:1}}个活动</p>
          <van-icon name="arrow" size="18" class="icon" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 产品信息 -->
    <van-tabs title-active-color="#1989fa" color="#1989fa" line-width="50">
      <!-- 店铺商品 -->
      <van-tab title="商品">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item :title="item.name" dot v-for="item in goodsList" :key="item.id" />
        </van-sidebar>
        <van-panel style @scroll="handleScroll" id="scroll">
          <template #header></template>
          <!-- 类目标题 -->
          <div v-for="item in goodsList" :key="item.id">
            <div class="goodsTitle">
              <b>{{item.name}}</b>
              <span style="font-size:14px">{{item.description}}</span>
              <van-icon name="ellipsis" />
            </div>
            <!-- 商品 -->
            <van-card v-for="v in item.foods" :key="v.category_id" id="goods">
              <template #thumb>
                <span class="icon_top" v-if="v.specfoods.length == 1">{{v.attributes[0].icon_name}}品</span>
                <van-image :src="imgSrc + v.image_path" />
              </template>
              <!-- 标题 -->
              <template #title>
                <div class="goods_box">
                  <div class="icon_left">
                    <h3>{{v.name}}</h3>
                  </div>
                  <p class="icon_right">
                    <van-tag round plain color="#FF6347">
                      <span>{{v.attributes[0].icon_name}}</span>
                    </van-tag>
                  </p>
                </div>
              </template>
              <!-- 内容 -->
              <template #tags>
                <!-- 描述 -->
                <div class="goods_box miao_shu">{{v.description}}</div>
                <div class="goods_box">{{v.tips}}</div>
                <div class="goods_box">
                  <van-tag round plain color="f07373" text-color="#f1884f">
                    <span>{{v.activity.image_text}}</span>
                  </van-tag>
                </div>
                <div class="goods_box">
                  <div class="icon_left Price">
                    ￥
                    <span>{{v.specfoods[0].price}}</span>
                  </div>
                  <!-- 规格 -->
                  <div class="icon_right">
                    <Cartcontrol :food="v" @cartInfo="cartInfo" icon-prefix="icon" icon="jiahao"></Cartcontrol>
                  </div>
                </div>
              </template>
            </van-card>
          </div>
        </van-panel>
        <!-- 商品信息底部 -->
        <div class="goods_footer">
          <GoodsFooter
            @is_show="setCart"
            @payGoods="payGoods"
            :is_good_show="is_goods_show"
            :cart_count="cart_count"
            :cart_price="cart_price"
          ></GoodsFooter>
          <van-popup v-model="is_goods_show" position="bottom" @close="close">
            <div class="popup_box popup_item_title">
              <div class="popup_item_info">
                <h3>购物车</h3>
              </div>
              <div class="popup_item_btn" @click="emptyCart">清空</div>
            </div>
            <div class="popup_box" v-for="item in cartList" :key="item._id">
              <div class="popup_item_info">
                <h3>{{item.name}}</h3>
                <div>默认</div>
              </div>
              <div class="popup_item_price">￥{{item.specfoods[0].price}}</div>
              <div class="popup_item_btn">
                <Cartcontrol :food="item" @cartInfo="cartInfo"></Cartcontrol>
              </div>
            </div>
          </van-popup>
        </div>
      </van-tab>
      <!-- 店铺评价 -->
      <van-tab title="评价">
        <Evaluate :shop_id="shop_id"></Evaluate>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { shopImformationApi, GoodsImformationApi } from "../../request/index";
import GoodsFooter from "../../components/menu/GoodsFooter";
import Cartcontrol from "../../components/menu/Cartcontrol";
import Evaluate from "./Evaluate";
export default {
  data() {
    return {
      //图片请求的前缀
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/",
      //对应商品id
      shop_id: null,
      // 高度数组
      heightList: [],
      //接口数据数组
      InfoList: [],
      //sidebar对应的activeKey设置默认值
      activeKey: 0,
      // 商品列表
      goodsList: [],
      // 控制商品弹出
      is_goods_show: false,
      // 购物车里的商品
      cartGoods: {},
      //购物车商品信息数组
      cartList: [],
      //购物车商品数量
      cart_count: 0,
      //购物车商品价格
      cart_price: 0
    };
  },
  components: {
    //对应组件注册
    GoodsFooter,
    Cartcontrol,
    Evaluate
  },
  //实例已经创建完成之后调用
  created() {
    // 当前店铺ID
    this.shop_id = this.$route.params.shopid;
    shopImformationApi({ shopid: this.shop_id }).then(res => {
      if (res.status == 200) {
        this.InfoList = res.data;
      }
    });
    GoodsImformationApi({ restaurant_id: this.shop_id }).then(res => {
      this.goodsList = res.data;
      // console.log(res.data);
    });
  },
  //页面加载完执行DOM操作
  updated() {
    // 标题盒子高度
    let titleHeight = document.getElementsByClassName("goodsTitle")[0]
      .offsetHeight;
    // 商品盒子高度
    let goodsHieght = document.getElementById("goods").offsetHeight || 0;
    // 盒子外边距
    let goodsMargin = parseFloat(
      getComputedStyle(document.getElementById("goods"), null).marginTop
    );
    goodsHieght = goodsHieght + goodsMargin;
    this.getScrollAll(goodsHieght, titleHeight);
  },
  methods: {
    /**
     * 高度数组
     * goodsHieght 商品盒子高度
     * titleHeight 标题盒子高度
     */
    getScrollAll(goodsHieght, titleHeight) {
      // 商品盒子高度
      let goods = goodsHieght;
      let heightList = this.goodsList.map((v, k) => v.foods.length);
      heightList = [0, ...heightList];
      for (let i = 0; i < heightList.length; i++) {
        heightList[i] =
          i != 0
            ? Math.floor((heightList[i - 1] / goods + heightList[i]) * goods) +
              titleHeight
            : heightList[i] * goods;
      }
      this.heightList = heightList;
    },
    /**
     *  左侧点击
     * index 当前索引
     * */

    onChange(index) {
      // console.log(index);
      // 当前索引小于高度数组时
      if (index < this.heightList.length)
        document.getElementById("scroll").scrollTop =
          this.heightList[index] != 0
            ? this.heightList[index] + 1
            : this.heightList[index];
    },
    // 右侧滑动
    handleScroll() {
      let heightList = this.heightList;
      let hiddenTop = document.getElementById("scroll").scrollTop;
      if (hiddenTop >= heightList[this.activeKey + 1]) {
        if (this.activeKey < heightList.length - 2) {
          this.activeKey += 1;
        }
      } else {
        if (hiddenTop < heightList[this.activeKey]) {
          this.activeKey = this.activeKey - 1;
        }
        return false;
      }
    },

    // 点击购物车，显示或隐藏购物车信息
    setCart(value) {
      this.is_goods_show = value;
    },
    // 关闭蒙版触发的事件
    close() {
      this.is_goods_show = false;
    },
    // 购物车商品信息列表
    cartInfo(info) {
      // console.log(info);
      info = info.food;
      if (this.cartList.length == 0) {
        this.cartList.push(info);
      } else {
        let index = this.cartList.indexOf(info);
        if (this.cartList.includes(info)) {
          this.cartList[index].__v = info.__v;
        } else {
          this.cartList.push(info);
        }
      }
      let num = 0,
        sum = 0;
      this.cartList.map((item, index) => {
        if (item.__v == 0) {
          // console.log("数量1");
          this.cartList.splice(index, 1);
        }
        // console.log("数量2");
        num += item.__v;
        sum += item.__v * item.specfoods[0].price;
      });
      this.cart_count = num;
      this.cart_price = sum;
    },
    // 清空购物车
    emptyCart() {
      if (this.cartList.length) {
        this.cartList = [];
        this.cart_count = 0;
        this.cart_price = 0;
        this.goodsList.map(item => {
          item.foods.map(v => {
            v.__v = 0;
          });
        });
      }
    },
    // 支付按钮
    payGoods(value) {
      if (value < 20) {
        return;
      }
      this.emptyCart();
      value = value + 5;
      alert(`支付了${value}`);
    }
  },
  computed: {}
};
</script>
<style lang="less">
@import url("../../assets/styles/detail.less");
</style>