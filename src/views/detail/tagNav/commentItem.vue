<template>
  <div class="list-item">
    <div class="left-box">
      <img src="../../../assets/fail.png" alt />
    </div>
    <div class="right-box">
      <div class="flex-row title-row">
        <div>
          <span class="brand-name">{{itemObj.username}}</span>
        </div>

        <div>
          <span style="color:'#999'">{{itemObj.rated_at}}</span>
        </div>
      </div>
      <div class="serve-row">
        <my-start class="start-box" :startNum="itemObj.rating_star"></my-start>
        <span class="order-sell">{{itemObj.time_spent_desc}}</span>
      </div>
      <div class="info-row">
        <div class="info-distance">
          <img
            v-for="items in itemObj.item_ratings"
            :key="items._id"
            :src="imgSrc+items.image_hash"
            alt
          />
        </div>
        <span
          v-for="items in itemObj.item_ratings"
          class="commint-tags"
          :key="items._id"
          plain
        >{{items.food_name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import myStart from "../../../components/start/start";
export default {
  props: {
    itemObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {
    console.log(this.itemObj);
  },
  components: {
    myStart
  },
  data() {
    return {
      imgSrc: "http://kumanxuan1.f3322.net:8001/img/"
    };
  }
};
</script>

<style lang="less" scoped>
.list-item {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  .left-box {
    flex: 1;
    img {
      width: 100px; /*no */
      height: 100px; /*no */
    }
  }
  .right-box {
    flex: 3;
    .flex-row {
      font-size: 12px; /*no */
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .serve-row {
      width: 100%;
      font-size: 12px; /*no */
      .start-box {
        width: 100px;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
      }
    }
    .info-row {
      .info-distance{
      margin-bottom: 10px;
      }
      .commint-tags {
        color: #999;
        padding: 0 5px;
        border: 1px solid #999;
        font-size: 12px;/*no */
        display: inline-block;
        width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0 5px;
        margin-top: 10px;

      }
    }
  }
}
</style>