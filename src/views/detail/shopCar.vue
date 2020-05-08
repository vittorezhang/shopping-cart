<template>
  <div class="shop-car-wapper">
    <div class="shopCar-box">
      <div class="shopping-icon">
        <van-icon name="shopping-cart" class="shopping-cart" @click="clickHandle"></van-icon>
        <div class="car-dot" v-show="dotNum!=0">{{$store.state.goodList|shopDotNum}}</div>
      </div>
      <div class="peice-box">
        <p class="total">&yen;{{$store.state.goodList|shopCarNum}}</p>
        <p class="sent">配送费:&yen;5</p>
      </div>
      <div class="pay-button">
        <button>去结算</button>
      </div>
    </div>
    <div v-show="showCar" class="cat-content">
      <div class="content-box">
        <div class="title-row">
          <span>购物车</span>
          <span class="temp">
            <van-icon name="delete" @click="celanHandle()" class="delete-icon" />清空
          </span>
        </div>
        <div class="content-row">
          <van-empty v-if="shopList.length == 0" description="购物车是空的" />
          <div
            class="content-item-row"
            v-for="(item,index) in shopList"
            :key="item.foodsId+item.specFoods._id"
          >
            <div class="name-box">
              <p class="name">{{item.name}}</p>
              <p class="type" v-if="item.specFoods">{{item.specFoods.specs_name}}</p>
            </div>
            <span
              class="price"
              v-if="item.specFoods"
            >&yen;{{item.specFoods.price*item[item.foodsId]}}</span>
            <div class="button-box">
              <van-button size="small" @click="(e)=>{cutHandle(item,index)}" round plain>-</van-button>
              <span class="goods-num">{{item[item.foodsId]}}</span>
              <button @click="(e)=>{addHandle(item)}" class="plus-button">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that;
export default {
  data() {
    return {
      showCar: false,
      shopList: [],
      dotNum: 0
    };
  },
  created() {
    that = this;
  },
  methods: {
    clickHandle() {
      let shopArr = [];
      let dotNum = 0;
      //获取当前选中信息
      this.$store.state.goodList.map(item => {
        if (
          item.restaurant_id == this.$route.params.shopid &&
          item[item.foodsId] != 0
        ) {
          shopArr.push(item);

          dotNum += item[item.foodsId];
        }
      });
      this.shopList = shopArr;
      this.showCar = !this.showCar;
      this.dotNum = dotNum;
      // console.log(this.shopList);
    },
    //减少商品数量--购物车删除内容
    cutHandle(item, index) {
      this.$store.dispatch("cutGoodsAction", item);
      console.log(item);
      //item.foodsId+item.specFoods._id
      //数量为0，在数组中删除这个元素
      let shopList = this.shopList;
      if (item[item.foodsId] == 0) {
        shopList.splice(index, 1);
      }
    },
    //添加商品数量
    addHandle(item) {
      this.$store.dispatch("addGoodsAction", item);
    },
    celanHandle(){    
      this.$store.dispatch("clearGoodsAction", this.$route.params.shopid);
      this.shopList = [];
    }
  },
  filters: {
    shopCarNum(array) {
      let restaurantId = that.$route.params.shopid;
      let shopPrice = 0;
      array.map(item => {
        if (item.restaurant_id == that.$route.params.shopid) {
          shopPrice += item.specFoods.price * item[item.foodsId];
        }
      });

      return shopPrice;
    },
    shopDotNum(array) {
      let dotNum = 0;
      that.$store.state.goodList.map(item => {
        if (item.restaurant_id == that.$route.params.shopid) {
          dotNum += item[item.foodsId];
        }
      });
      that.dotNum = dotNum;
      return dotNum;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/styles/global.less");

.shop-car-wapper {
  background-color: #444;
  .shopCar-box {
    height: 100%;
    padding-left: 30px;
    position: relative;
    display: flex;
    flex-direction: row;
    z-index: 99;
    .shopping-icon {
      position: relative;
      height: 100%;
      flex: 1;
      .shopping-cart {
        background-color: @globalColor;
        color: #fff;
        border: 6px solid #444;
        border-radius: 50%;
        position: absolute;
        height: 70px;
        width: 70px;
        text-align: center;
        line-height: 70px;
        bottom: 10px;
        font-size: 30px; /*no */
      }
      .car-dot {
        font-size: 12px; /*no */
        line-height: 30px;
        text-align: center;
        height: 30px;
        width: 30px;
        background: red;
        color: #fff;
        border-radius: 50%;
        position: absolute;
        top: -25px;
        right: 0px;
      }
    }
    .peice-box {
      flex: 3;
      color: #fff;
      .total {
        font-weight: 800;
        font-size: 22px; /*no */
      }
      .sent {
        font-size: 12px; /*no */
      }
    }
    .pay-button {
      flex: 2;
      height: 100%;
      background-color: #4cd964;
      color: #fff;
      button {
        width: 100%;
        height: 100%;
        display: block;
        background-color: #4cd964;
        border: none;
        font-weight: 800;
        text-align: center;
      }
    }
  }
}
.cat-content {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 70px;
  .content-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    .title-row {
      // width: 100%;
      height: 60px;
      background: #eceff1;
      line-height: 60px;
      padding: 0 10px;
      color: #555;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .temp {
        font-size: 14px;
        .delete-icon {
          font-size: 14px; /*no */
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
    .content-item-row {
      background-color: #fff;
      display: flex;
      padding: 20px 10px;
      flex-direction: row;
      align-content: center;
      .name-box {
        color: #333;
        flex: 5;
        .name {
          font-size: 16px; /*no */
          font-weight: 800;
        }
        .type {
          font-size: 12px; /*no */
        }
      }
      .plus-button {
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background-color: @globalColor;
        color: #fff;
        font-size: 20px; /*no */
        border: none;
        line-height: 30px;
        vertical-align: middle;
      }
      .price {
        flex: 1;
      }
      .button-box {
        flex: 2;
        .goods-num {
          margin: 0 10px;
        }
      }
    }
    .van-empty {
      background: #fff;
    }
  }
}
</style>