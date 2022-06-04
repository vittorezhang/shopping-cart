<template>
  <div class="detail-container">
    <div class="select_food_model" v-show="isSelected">
      <div class="select_model_content">
        <div class="select_header">
          <span class="food_name">{{selectFood?selectFood.name:''}}</span>
          <van-icon @click="canelSelect" class="close_icon" name="cross" />
        </div>
        <p class="con_title">规格</p>

        <van-checkbox-group
          class="food_content"
          icon-size="0px"
          @change="getSelect"
          v-model="result"
          direction="horizontal"
        >
          <van-checkbox
            v-for="food in selectFoodItem"
            :key="food.sku_id"
            :class="result.includes(food.sku_id)?'selected':''"
            :name="food.sku_id"
          >{{food.name}}</van-checkbox>
        </van-checkbox-group>

        <div class="food_bottom">
          <span class="count_price">￥{{count_price}}</span>
          <span @click="joinCart" class="join_cart_btn">加入购物车</span>
        </div>
      </div>
    </div>
    <div class="detail-header">
      <van-icon class="goback" @click="goBack" name="arrow-left" />
      <van-icon class="arrow" name="arrow" />
      <div class="top">
        <img :src="storeDetail.image_path?(image_path+storeDetail.image_path):''" alt="无法显示" />
        <div class="right-content">
          <p class="name">{{storeDetail.name}}</p>
          <p class="send">商家配送 / 分钟送达 / {{storeDetail.piecewise_agent_fee.tips}}</p>
          <p class="notice">公告：买买买</p>
        </div>
      </div>
      <div class="bottom">
        <p>
          <span
            :style="{background:'#'+storeDetail.activities[0].icon_color}"
            class="icon_name"
          >{{storeDetail.activities[0]?storeDetail.activities[0].icon_name:'减'}}</span>
          <span>{{storeDetail.activities[0].description}}</span>
          <span class="bottom-right">
            1个活动
            <van-icon name="arrow" />
          </span>
        </p>
      </div>
    </div>

    <van-tabs
      class="detail-tabs"
      color="blue"
      title-active-color="blue"
      line-width="40px"
      line-height="4px"
      v-model="active"
    >
      <van-tab title="商品">
        <div class="detail-content">
          <van-sidebar
            class="sidebar-tabs"
            :badge="food_count"
            v-model="activeKey"
            @change="onChange"
          >
            <van-sidebar-item v-for="item in foodList" :key="item.id" :title="item.name" />
          </van-sidebar>
          <div class="detail-right-content">
            <div class="content-box" v-for="item in foodList" :key="item.id">
              <div class="foodmenu-header">
                <span class="menu-title">{{item.name}}</span>
                <span class="menu-desc">{{item.description}}</span>
                <van-icon class="ellipsis-icon" name="ellipsis" />
              </div>
              <div v-for="food in item.foods" :key="food.item_id" class="food-item">
                <img :src="food.image_path?(image_path + food.image_path):''" alt />
                <div class="item-text">
                  <div class="food_title">
                    <span class="food_name">{{food.name}}</span>
                    <div class="icon_box">
                      <span
                        class="food_icon"
                        v-for="(tab,index) in food.attributes"
                        :key="index"
                        :style="{color:'#'+tab.icon_color,border:'1px solid #' + tab.icon_color}"
                      >{{tab.icon_name}}</span>
                    </div>
                  </div>
                  <p class="food_desc">{{food.description}}</p>
                  <p class="food_sales">月售{{food.month_sales}}份 好评率{{food.satisfy_rate}}%</p>
                  <span
                    class="discount"
                    :style="{color:'#'+food.activity.image_text_color,border:'1px solid #'+food.activity.icon_color}"
                  >{{food.activity.image_text}}</span>
                  <div class="price-line">
                    <span class="price">
                      <span class="price_icon">￥</span>20
                    </span>
                    <span>起</span>
                    <span class="select_food" v-if="food.specfoods.length > 1">
                      <span class="reduce_food">-</span>
                      <span class="food_num">{{food_num}}</span>
                      <span
                        class="select_set"
                        @click="selectFoods(food.category_id,food.item_id)"
                      >选规格</span>
                    </span>
                    <span class="select_food" v-if="food.specfoods.length == 1">
                      <span class="reduce_food" @click="reduce">-</span>
                      <span class="food_num">{{food_num}}</span>
                      <span class="add_food" @click="add">+</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content_bottom">我是有底线的~</div>
          </div>
          <div class="detail-bottom">
            <div class="cart_icon">
              <van-icon name="cart" dot />
            </div>
            <div class="cart_price">
              <span class="price_count">￥{{cart_price}}</span>
              <span class="price_send">配送费5</span>
            </div>
            <div class="pay_btn">去结算</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="评价">
        <div class="detail-rate">
          <div class="rate_box">
            <div class="rare_box_left">
              <h2>{{rateData.overall_score.toFixed(1)}}</h2>
              <p class="allrate">综合评价</p>
              <p class="compare">高于周边商家{{(rateData.compare_rating * 100).toFixed(1)}}%</p>
            </div>
            <div class="rare_box_right">
              <p>
                <span>服务态度</span>
                <span class="service">
                  <van-icon
                    v-for="item in Math.round(rateData.service_score?rateData.service_score:1)"
                    :key="item"
                    name="star"
                  />
                  <span
                    class="service_core"
                  >{{rateData.service_score ? rateData.service_score.toFixed(1):''}}</span>
                </span>
              </p>
              <p>
                <span>菜品评价</span>
                <span class="foods_rate">
                  <van-icon
                    v-for="item in Math.round(rateData.food_score?rateData.food_score:1)"
                    :key="item"
                    name="star"
                  />
                  <span
                    class="foods_core"
                  >{{rateData.food_score ? rateData.food_score.toFixed(1) : ''}}</span>
                </span>
              </p>
              <p>
                <span>送达时间</span>
                <span class="finish_time">{{rateData.deliver_time}}分钟</span>
              </p>
            </div>
          </div>
          <div class="tags_box">
            <van-tag
              class="tag_icon"
              v-for="item in categoryData"
              :key="item._id"
              @click="getCommentsList(item.name)"
              :color="item.unsatisfied ? 'rgb(243, 243, 243)':'rgb(197, 197, 248)'"
            >{{item.name}}({{item.count}})</van-tag>
          </div>
          <div class="comments_box">
            <div class="comment_item" v-for="item in commentsData" :key="item._id">
              <img class="user_head" :src="item.avatar?(image_path+item.avatar):''" alt="找不到图片" />
              <div class="item_right">
                <p>
                  <span>{{item.username}}</span>
                  <span class="comment_time">{{item.rated_at}}</span>
                </p>
                <p>
                  <van-icon
                    class="star_icon"
                    v-for="star_i in item.rating_star"
                    :key="star_i"
                    name="star"
                  />
                  <span>{{item.time_spent_desc}}</span>
                </p>
                <div class="comment_images">
                  <img
                    v-for="food_i in item.item_ratings"
                    :key="food_i._id"
                    :src="food_i.image_hash?(image_path+food_i.image_hash):''"
                    alt="找不到图片"
                  />
                </div>
                <div>
                  <span
                    class="food_name"
                    v-for="food_n in item.item_ratings"
                    :key="food_n._id"
                  >{{food_n.food_name}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  getStoreDetail,
  getFoodList,
  getScores,
  getCategory,
  getComments
} from "../../request/api";
export default {
  data() {
    return {
      storeDetail: {
        image_path: "",
        piecewise_agent_fee: "",
        activities: [{}]
      },
      result: [],
      active: 0,
      activeKey: 0,
      isSelected: false,
      foodList: [
        {
          foods: [
            {
              activity: { image_text_color: "" },
              specfoods: [{ price: 0 }],
              image_path: "171b029c7118.jpg"
            }
          ]
        }
      ],
      food_num: 0,
      food_count: 0,
      rateData: { food_score: 0, overall_score: 0 },
      categoryData: [],
      commentsData: [],
      id: 1,
      image_path: "http://kumanxuan1.f3322.net:8001/img/",
      selectFoodItem: null,
      selectFood: null,
      count_price: 0,
      cart_price: 0
    };
  },
  methods: {
    // 选择规格
    selectFoods(category_id, item_id) {
      //选中的食物数据 用于循环规格列表
      this.selectFoodItem = this.foodList[category_id - 1].foods[
        item_id - 1
      ].specfoods;
      this.selectFood = this.foodList[category_id - 1].foods[item_id - 1];
      //计算选中食品金额
      this.count_price = this.selectFoodItem[0].price;
      //显示弹框
      this.isSelected = true;
      //设置默认规格选择第一个
      this.result[0] = this.selectFoodItem[0].sku_id;
    },
    // 取消选择规格
    canelSelect() {
      this.isSelected = false;
      this.result = [];
    },
    //选项改变 计算选项总金额
    getSelect(select) {
      //当前选中的食品
      this.result = select;
      //计算选中食品金额
      if (select.length == 0) {
        this.count_price = 0;
        return;
      }
      this.count_price = this.selectFoodItem
        .filter(item => this.result.includes(item.sku_id))
        .map(item => item.price)
        .reduce((prev, cur, index, array) => {
          return prev + cur;
        });
    },
    // 加入购物车
    joinCart() {
      //存储购物车数据
      this.cart_food = this.selectFoodItem.filter(item =>
        this.result.includes(item.sku_id)
      );
      this.cart_price += this.count_price;
      this.result = [];
      //关闭弹框
      this.isSelected = false;
    },
    //返回外卖页面
    goBack() {
      this.$router.push("/takeout");
    },
    onChange(index) {
      var dom = document.getElementsByClassName("detail-right-content")[0];
      let scrollTop = 0;
      if (index == 0) {
        dom.scrollTop = 0;
        return;
      } else {
        for (var i = 0; i < index; i++) {
          scrollTop += this.foodList[i].foods.length * 150;
        }
      }
      dom.scrollTop = scrollTop;
    },
    reduce() {
      if (this.food_num == 0) {
        return;
      }
      this.food_num--;
    },
    add() {
      this.food_num++;
    },
    getCommentsList(name) {
      console.log(name);
      let params = {
        tag_name: name
      };
      this.getCommentsData(params);
    },
    getCommentsData(params) {
      params = params || {};
      getComments(this.id, params).then(data => {
        this.commentsData = data;
      });
    }
  },
  created() {
    this.id = this.$route.params.id;
    let storeId = this.id;
    //获取店铺详情
    getStoreDetail(storeId).then(data => {
      this.storeDetail = data;
    });
    //获取食品列表
    getFoodList({ params: { restaurant_id: storeId } }).then(data => {
      console.log(data);
      this.foodList = data;
    });
    //获取评价分数
    getScores(storeId).then(data => {
      this.rateData = data;
    });
    //获取评价分类
    getCategory(storeId).then(data => {
      this.categoryData = data;
    });
    //获取评价信息
    this.getCommentsData();
  }
};
</script>

<style lang="less">
.detail-container {
  position: relative;
  .select_food_model {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(34, 33, 33, 0.6);
    .select_model_content {
      background-color: #fff;
      height: 500px;
      width: 500px;
      padding: 10px 20px;
      position: relative;
      .select_header {
        height: 50px;
        line-height: 50px;
        font-size: 30px;
        margin-top: 20px;
        text-align: center;
        position: relative;
        .close_icon {
          right: 0;
          top: 0;
          position: absolute;
          font-size: 50px;
        }
      }
      .con_title {
        font-size: 26px;
      }
      .food_content {
        /deep/ .van-checkbox {
          padding: 15px 20px;
          border: 1px solid gray;
          margin-right: 15px;
        }
        .selected {
          border-color: blue;
        }
        .van-checkbox__icon {
          display: none;
        }
      }
      .food_bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px;
        height: 60px;
        background-color: gainsboro;
        .count_price {
          font-size: 32px;
          line-height: 60px;
          color: rgb(235, 61, 61);
        }
        .join_cart_btn {
          padding: 15px;
          float: right;
          background-color: rgb(109, 109, 214);
          color: #fff;
        }
      }
    }
  }
  .detail-header {
    padding: 20px 15px;
    color: #fff;
    position: relative;
    height: 250px;
    width: 100%;
    box-sizing: border-box;
    background-color: rgba(165, 159, 159, 0.7);
    .goback {
      position: absolute;
      font-size: 36px;
    }
    p {
      margin: 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      font-size: 36px;
      top: 40%;
    }
    .top {
      display: flex;
      img {
        height: 150px;
        width: 150px;
      }
      .right-content {
        margin-left: 10px;
        .name {
          font-size: 35px;
        }
        .send,
        .notice {
          font-size: 24px;
          margin-top: 20px;
        }
      }
    }
    .bottom {
      margin-top: 20px;
      font-size: 24px;
      .bottom-right {
        float: right;
      }
      .icon_name {
        display: inline-block;
        padding: 3px 3px;
        margin-right: 5px;
        // background-color: #f07373;
      }
    }
  }
  .detail-tabs.van-tabs {
    .van-tabs__wrap {
      height: 70px;
      padding: 15px 0;
    }
  }

  .van-tab__text {
    line-height: 70px;
    font-size: 30px;
  }
  .detail-content {
    width: 100%;
    overflow: hidden;
    background-color: rgb(243, 243, 243);
    .sidebar-tabs {
      position: fixed;
      width: 150px;
      .van-sidebar-item {
        height: 80px;
        font-size: 26px;
        justify-content: center;
        display: flex;
        align-items: center;
      }
      .van-sidebar-item--select {
        background-color: rgb(243, 243, 243);
      }
      .van-sidebar-item--select::before {
        height: 100%;
      }
    }
    .detail-right-content {
      padding-top: 20px;
      width: 80%;
      height: 885px;
      overflow-y: auto;
      box-sizing: border-box;
      margin-left: 150px;
      .content_bottom {
        padding-bottom: 30px;
        text-align: center;
      }
      .foodmenu-header {
        height: 60px;
        padding: 10px 10px;
        line-height: 60px;
        .menu-title {
          font-size: 32px;
          color: rgb(73, 72, 72);
          font-weight: bold;
          margin: 0 10px;
        }
        .ellipsis-icon {
          float: right;
        }
        .menu-desc {
          color: rgb(105, 102, 102);
        }
      }
      .food-item {
        display: flex;
        padding: 20px;
        margin-bottom: 20px;
        background-color: #fff;
        img {
          height: 100px;
          width: 100px;
        }
        p {
          margin: 0;
        }
        .item-text {
          margin-left: 10px;
          box-sizing: border-box;
          flex: 1;
          .food_name {
            font-size: 32px;
            font-weight: bold;
          }
          .icon_box {
            float: right;
          }
          .food_icon,
          .discount {
            font-size: 12px;
            padding: 0 3px;
            border-radius: 10px;
          }
          .food_desc {
            color: gray;
            margin: 10px 0;
          }
          .price-line {
            margin: 20px 0;
            .price {
              color: rgb(221, 123, 18);
              font-size: 28px;
              font-weight: bold;
              .price_icon {
                font-size: 12px;
              }
            }
            .select_food {
              float: right;
              .reduce_food,
              .add_food {
                display: inline-block;
                height: 30px;
                width: 30px;
                color: gray;
                text-align: center;
                line-height: 30px;
                border: 1px solid gray;
                border-radius: 50%;
              }
              .food_num {
                color: gray;
                margin: 15px;
              }
              .select_set {
                border-radius: 8px;
                background-color: rgb(91, 134, 233);
                padding: 8px 10px;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .detail-bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 100px;
      width: 100%;
      position: relative;
      background-color: rgb(85, 83, 83);
      .cart_icon {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        text-align: center;
        line-height: 100px;
        font-size: 50px;
        color: #fff;
        position: absolute;
        left: 10%;
        bottom: 40%;
        background-color: rgb(112, 112, 209);
        border: 10px solid rgb(85, 83, 83);
      }
      .cart_price {
        margin-left: 30%;
        display: inline-block;
        .price_count {
          font-size: 40px;
          color: #fff;
          display: block;
        }
        .price_send {
          font-size: 24px;
          color: #fff;
          display: block;
        }
      }
      .pay_btn {
        height: 100%;
        width: 200px;
        float: right;
        text-align: center;
        line-height: 100px;
        font-size: 32px;
        font-weight: 600;
        color: #fff;

        background-color: rgb(16, 192, 16);
      }
    }
  }
  .detail-rate {
    width: 100%;
    background-color: rgb(243, 243, 243);
    .rate_box {
      background-color: #fff;
      width: 100%;
      display: flex;
      padding: 30px;
      box-sizing: border-box;
      p,
      h2 {
        margin: 0;
      }
      h2 {
        color: rgb(243, 143, 67);
      }
      .rare_box_left {
        text-align: center;
        width: 200px;
        padding: 0 20px;
        .allrate {
          font-size: 24px;
        }
        .compare {
          font-size: 18px;
        }
      }
      .rare_box_right {
        width: 250px;
        .service,
        .foods_rate {
          font-size: 18px;
          color: red;
          margin-left: 15px;
          .service_core,
          .foods_core {
            font-size: 20px;
            margin-left: 15px;
          }
        }
        .finish_time {
          margin-left: 15px;
          color: gray;
        }
      }
    }
    .tags_box {
      margin-top: 20px;
      padding: 20px 15px;
      background-color: #fff;
      box-sizing: border-box;
      .tag_icon {
        padding: 10px 13px;
        letter-spacing: 1px;
        color: #000;
        margin-right: 15px;
        border-radius: 10px;
        margin-bottom: 10px;
        font-size: 22px;
      }
    }
    .comments_box {
      margin-top: 10px;
      .comment_item {
        background-color: #fff;
        padding: 15px;
        padding-bottom: 30px;
        display: flex;
        margin-bottom: 10px;
        .user_head {
          height: 80px;
          width: 80px;
        }
        .item_right {
          margin-left: 20px;
          flex: 1;
          p {
            margin: 0;
          }
          .comment_time {
            float: right;
          }
          .star_icon {
            color: red;
            font-size: 18px;
          }
          .comment_images {
            img {
              height: 120px;
              width: 120px;
              display: inline-block;
            }
          }
          .food_name {
            display: inline-block;
            padding: 5px;
            border: 1px solid gray;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>