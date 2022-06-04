<template>
  <van-tabbar>
    <div class="left">
      <div class="goobs_icon">
        <div class="icon" @click="is_show">
          <van-icon name="shopping-cart-o" :badge="cart_count" />
        </div>
      </div>
      <div class="goobs_pics">
        <h2 style="margin:0 0 0 1.4rem;
    font-size: 0.3rem;">￥{{cart_price}}</h2>
        <p style="position: relative;
    left: 70px;font-size:0.3rem">配送费:￥5</p>
      </div>
    </div>
    <div
      class="right"
      @click="out"
      :style="cart_price > 0?'background:limegreen':'background:#ccc'"
    >去结算</div>
  </van-tabbar>
</template>

<script>
export default {
  //接收父组件传递过来的属性
  props: {
    is_good_show: {
      type: Boolean,
      default: false
    },
    cart_count: {
      type: Number
    },
    cart_price: {
      type: Number
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    out() {
      this.$emit("payGoods", this.cart_price);
    },
    is_show() {
      let is_show = !this.is_good_show;
      this.$emit("is_show", is_show);
    }
  }
};
</script>

<style lang="less">
p {
  margin-bottom: 0;
  margin-top: 5px;
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border-width: 0;
}
.van-hairline--top-bottom.van-tabbar.van-tabbar--fixed {
  z-index: 99999;
  color: #fff;
  .left {
    flex: 2;
    display: flex;
    background: rgb(0, 0, 0, 0.3);
    .goobs_icon {
      flex: 1;
      position: relative;
      .icon {
        width: 100px;
        height: 100px;
        left: 50px;
        top: -25px;
        position: absolute;
        background: rgb(25, 137, 250);
        border: 6px solid rgb(0, 0, 0, 0.3);
        border-radius: 50%;
        text-align: center;
        .van-icon.van-icon-shopping-cart-o {
          font-size: 54px;
          line-height: 100px;
          .van-info {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            line-height: 30px;
          }
        }
      }
    }

    .goobs_pics {
      flex: 2;
    }
  }
  .right {
    flex: 1;
    background: limegreen;
    line-height: 88px;
    text-align: center;
    font-size: 36px;
  }
}
</style>