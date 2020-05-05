<template>
  <div class="foodlist-wapper">
    <!-- 左侧导航 -->

    <van-sticky class="sticky-wapper">
      <van-sidebar class="sidebar-wapper" v-model="activeKey">
        <van-sidebar-item
          v-for="item in dataList"
          :key="item.id"
          @click="()=>{changeHandle(item.id)}"
          :title="item.name"
        ></van-sidebar-item>
      </van-sidebar>
    </van-sticky>

    <!-- 右侧商品 -->
    <div class="food-data-list">
      <food-item v-for="item in dataList" :key="item.id" :id="item.id" :itemObj="item"></food-item>
    </div>
    <!-- 底部购物车 -->
    <shop-car class="shop-car"></shop-car>
  </div>
</template>

<script>
import Bus from "../../../plugin/bus";
import { storeFoodListApi } from "../../../request/index";
import { Toast } from "vant";
import shopCar from "../shopCar";
import foodItem from "./foodItem";
let that;
export default {
  data() {
    return {
      activeKey: 0,
      dataList: [],
      eleHeightArr: [],
      topHeight: 0
    };
  },
  created() {
    that = this;
    this.getData();
    Bus.$on("getTopHeight", value => {
      this.topHeight = value;
    });
  },
  mounted() {
    document.addEventListener("scroll", this.scrollHanlde);
  },

  methods: {
    //设置滚动条位置数组
    setEleScroll() {
      let countNum = this.topHeight;
      this.eleHeightArr.push(countNum);
      let eleNode = document.getElementsByClassName("food-data-box");
      for (let i = 0; i < eleNode.length - 1; i++) {
        countNum = eleNode[i].offsetHeight + this.eleHeightArr[i];
        this.eleHeightArr.push(countNum);
      }
    },
    //滚动条事件
    scrollHanlde(e) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //判断滚动条高度于菜单位置数组
      for (let i = 0; i < this.eleHeightArr.length; i++) {
        this.activeKey =
          scrollTop > 0 && scrollTop <= this.eleHeightArr[0]
            ? 0
            : this.activeKey;
        this.activeKey =
          this.eleHeightArr[i - 1] < scrollTop &&
          scrollTop < this.eleHeightArr[i]
            ? i
            : this.activeKey;
      }
    },
    getData() {
      //获取接口数据，获取页面元素高度信息
      storeFoodListApi({ restaurant_id: this.$route.params.shopid }).then(
        res => {
          this.dataList = res.data;
          if (res.data.length == 0) {
            Toast.fail("菜单获取异常,请看看其他店叭");
          }
          //渲染结束后的回调
          this.$nextTick(() => {
            this.setEleScroll();
          });
        }
      );
    },
    //导航栏切换，实现联动菜单
    changeHandle(index) {
      document.getElementById(index).scrollIntoView();
    }
  },
  components: {
    shopCar,
    foodItem
  }
};
</script>

<style lang='less' scoped>
@import url("../../../assets/styles/global.less");

.foodlist-wapper {
  display: flex;
  flex-direction: row;
  position: relative;
  .sticky-wapper,
  .sidebar-wapper {
    width: 110px;
    flex: 1;
    background-color: #f5f5f5;
    overflow: hidden;
  }
}
.shop-car {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
}
.food-data-list {
  flex: 4;
  overflow: scroll;
}
</style>