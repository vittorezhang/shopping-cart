<template>
  <div class="food-data-box">
    <div class="title-box">
      <span class="title">{{itemObj.name}}</span>
      <span class="desc">{{itemObj.description}}</span>
    </div>
    <van-card v-for="items in itemObj.foods" :key="items._id" :thumb="imgSrc+items.image_path">
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
              @click="(e)=>{cutHandle(itemObj.id,items,items.specfoods[0])}"
              v-show="canCut"
              round
              plain
            >-</van-button>
            <span
              v-show="canCut"
              class="goods-num"
            >{{$store.state.goodList|goodsNumFliter(items._id)}}</span>
            <van-button
              @click="seleHandle"
              v-if="items.specfoods.length>1"
              size="small"
              type="info"
              round
            >选规格</van-button>
            <!-- 弹框 -->
            <van-dialog v-model="show" :title="items.name" show-cancel-button>
              <div>规格</div>
              <van-tag
                class="specFood"
                v-for="tagsName in items.specfoods"
                @click="tagsHandle"
                :key="tagsName._id"
                plain
              >{{tagsName.specs_name}}</van-tag>
              <div class="price">&yen;{{price}}</div>
            </van-dialog>

            <button
              @click="(e)=>{addHandle(itemObj.id,items,items.specfoods[0])}"
              class="plus-button"
              v-show="items.specfoods.length<=1"
            >+</button>
          </div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
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
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/",
      show: false,
      price: 0,
      canCut: false
    };
  },
  filters: {
    goodsNumFliter(array, goodsId) {
      let num = 0;

      array.map(item => {
        // console.log(item, goodsId);
        if (item[goodsId]) {
          num = item[goodsId];
        }
      });
      // if (num === 0) {
      //   that.canCut = false;
      // }
      return num;
    },
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
    //选择商品规格
    seleHandle() {
      this.show = true;
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
      const foodObj = {
        restaurant_id: this.$route.params.shopid,
        listId: ListId,
        foodsId: items._id,
        name: items.name,
        specFoods
      };

      this.$store.dispatch("cutGoodsAction", foodObj);
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
    }
  }
};
</script>
 
<style lang="less" scoped>
@import url("../../../assets/styles/global.less");

.food-data-box {
  display: flex;
  flex-direction: column;
  .title-box {
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    .title {
      font-weight: 800;
      color: #777;
    }
    .desc {
      margin-left: 20px;
      font-size: 12px;
      color: #999;
    }
  }
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
}
</style>