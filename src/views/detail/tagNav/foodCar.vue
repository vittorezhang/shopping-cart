<template>
  <van-card :thumb="imgSrc+items.image_path">
    <template #tags>
      <div class="title-row publicRow">
        <span>{{items.name}}</span>
        <div
          v-for="(icon,index) in items.attributes"
          :class="icon.icon_name == '招牌' ? 'brand food-tag' : 'new-goods food-tag'"
          :key="index"
        >
          <span type="warning" round plain>{{icon.icon_name|iconsFilters}}</span>
        </div>
      </div>
      <div class="descr-row publicRow">
        <p>{{items.description}}</p>
      </div>
      <p>{{items.tips}}</p>
      <van-tag class="publicRow" plain type="warning" round>{{items.activity.image_text}}</van-tag>
      <div class="footer-row publicRow">
        <div>
          <span class="price-box">&yen;{{items.specfoods[0].price.toFixed(2)}}</span>
        </div>
        <div>
          <van-button
            size="small"
            @click="(e)=>{cutHandle(itemObj.id,items,items.specfoods)}"
            v-show="canCut"
            round
            plain
          >-</van-button>
          <span
            v-show="canCut"
            class="goods-num"
          >{{goodsNumFliter($store.state.goodList,items._id)}}</span>
          <van-button
            @click="selectHandle"
            v-if="items.specfoods.length>1"
            size="small"
            type="info"
            round
          >选规格</van-button>
          <!-- 弹框 -->
          <van-overlay :show="show">
            <div class="wrapper" @click.stop>
              <div class="block">
                <div class="name-box">
                  <div style="display:inline-block;">{{items.name}}</div>
                  <van-icon class="cross" name="cross" @click="closeHandle" />
                </div>
                <div class="content-box">
                  <div>规格</div>
                  <span
                    v-for="(tagsName,index) in items.specfoods"
                    :class="index==0?'specFood activeSpecFood '+items._id:'specFood '+items._id"
                    @click="tagsHandle(items._id,index,tagsName)"
                    :key="tagsName._id"
                  >{{tagsName.specs_name}}</span>
                </div>
                <div class="confirm-box">
                  <div class="price">
                    &yen;
                    <span>{{specInfo.price}}</span>
                  </div>
                  <van-button
                    class="confirm-button"
                    type="info"
                    @click="dialogConfirmHandle(itemObj.id,items)"
                  >加入购物车</van-button>
                </div>
              </div>
            </div>
          </van-overlay>
          <button
            @click="(e)=>{addHandle(itemObj.id,items,items.specfoods[0])}"
            class="plus-button"
            v-show="items.specfoods.length<=1"
          >+</button>
        </div>
      </div>
    </template>
  </van-card>
</template>

<script>
import specFoodsblock from "./specFood";
import { Toast } from "vant";
let that;
export default {
  components: {
    specFoodsblock
  },
  props: {
    itemObj: {
      type: Object,
      default() {
        return {};
      }
    },
    items: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      canCut: false,
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/",
      show: false,
      specInfo: {}
    };
  },
  filters: {
    iconsFilters(value) {
      let str = "";
      switch (value) {
        case "招牌":
          str = "招牌";
          break;
        case "新":
          str = "新品";
          break;
      }
      return str;
    }
  },
  methods: {
    goodsNumFliter(array, goodsId) {
      let num = 0;

      array.map(item => {
        // console.log(item, goodsId);
        if (item[goodsId]) {
          num += item[goodsId];
        }
      });
      this.canCut = num == 0 ? false : true;
      return num;
    },
    //点击标签句柄
    tagsHandle(e) {
      let tagsNoed = document.getElementsByClassName("specFood");
      for (let i = 0; i < tagsNoed.length; i++) {
        tagsNoed[i].style.backgroundColor = "transparent";
        tagsNoed[i].style.color = "#333";
      }
      e.target.style.color = "#1989fa";
      e.target.style.borderColor = "#1989fa";
    },
    //减少商品数量
    cutHandle(ListId, items, specFoods) {
      //获取一级分类，商品名字、id、口味、价格
      // console.log(id,items);
      if (specFoods.length > 1) {
        return Toast("多规格商品只能在购物车中删除！");
      }

      const foodObj = {
        restaurant_id: this.$route.params.shopid,
        listId: ListId,
        foodsId: items._id,
        name: items.name,
        specFoods: specFoods[0]
      };

      this.$store.dispatch("cutGoodsAction", foodObj);
      this.$store.state.goodList.map(item => {
        if (item[items._id] == 0) {
          this.canCut = false;
        }
      });
    },
    //添加商品数量
    addHandle(ListId, items, specFoods) {
      //获取一级分类，商品名字、id、口味、价格
      // console.log(id,items);
      this.canCut = true;
      const foodObj = {
        restaurant_id: this.$route.params.shopid,
        listId: ListId,
        foodsId: items._id,
        name: items.name,
        specFoods
      };
      this.$store.dispatch("addGoodsAction", foodObj);
    },
    //选择规格句柄
    selectHandle() {
      //(items._id,index,tagsName.price)
      this.canCut = true;
      this.show = true;
      //设置默认口味
      this.tagsHandle(this.items._id, 0, this.items.specfoods[0]);
    },
    //标签按钮
    tagsHandle(id, index, specInfo) {
      let tags = document.getElementsByClassName(id);

      for (let i = 0; i < tags.length; i++) {
        tags[i].className = "specFood " + id;
      }
      tags[index].className = "specFood activeSpecFood " + id;

      this.specInfo = specInfo;
    },
    //加入购物车按钮
    dialogConfirmHandle(ListId, items) {
      // this.canCut = true;
      const foodObj = {
        restaurant_id: this.$route.params.shopid,
        listId: ListId,
        foodsId: items._id,
        name: items.name,
        specFoods: this.specInfo
      };
      console.log(foodObj);

      this.$store.dispatch("addGoodsAction", foodObj);
    },
    //关闭按钮
    closeHandle() {
      this.show = false;
    }
    //控制num
  },
  created() {
    that = this;
  }
};
</script>

<style lang='less' scoped>
@import url("../../../assets/styles/global.less");

.van-card {
  padding: 20px;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  .publicRow {
    margin-bottom: 10px;
  }
  .van-card__content {
    position: unset;
  }
  .footer-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .goods-num {
      margin: 0 5px;
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
    .dialog-block {
      width: 400px;
      height: 300px;
      font-size: 16px; /*no */
      .van-dialog__content {
        padding: 20px;
      }
    }
  }
  .price-box {
    color: orange;
    font-weight: 800;
    font-size: 18px; /*no */
  }
}

.title-row {
  font-size: 16px; /*no */
  font-weight: 800;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .food-tag {
    font-size: 12px; /*no */
  }
  .brand {
    font-weight: normal;
    border: 1px solid orange;
    border-radius: 15px;
    color: orange;
    padding: 0 10px;
    height: 25px;
    line-height: 25px;
  }
  .new-goods {
    font-size: 12px; /*no */
    font-weight: 400;
    position: absolute;
    top: -30px;
    left: -30px;
    background-color: #4cd964;
    color: #fff;
    height: 65px;
    width: 65px;
    text-align: center;
    line-height: 100px;
    transform: rotatez(-45deg);
  }
}
.descr-row {
  color: #999;
}
.footer-row {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 400px;
    height: 300px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;

    .name-box {
      flex: 1;
      font-size: 16px; /*no */
      padding: 20px;
      text-align: center;
      .cross {
        font-size: 30px;
        vertical-align: baseline;
        float: right;
      }
    }
    .content-box {
      padding: 0 20px;
      flex: 3;
      font-size: 14px; /*no */
      .specFood {
        display: inline-block;
        margin-top: 10px;
        margin-right: 10px;
        font-size: 14px; /*no */
        color: #000;
        border-color: #eee;
        padding: 10px 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
      .activeSpecFood {
        color: @globalColor;
        border-color: @globalColor;
      }
    }
    .confirm-box {
      background-color: #eee;
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      position: relative;
      .price {
        color: #ff6000;
        span {
          font-weight: bold;

          font-size: 30px;
        }
      }
      .confirm-button {
        border-radius: 10px;
        position: absolute;
        right: 10px;
      }
    }
  }
}
</style>