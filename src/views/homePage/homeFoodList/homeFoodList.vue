<template>
  <van-swipe :loop="false" class="my-swipe">
    <!-- 第一页 -->
    <van-swipe-item v-for="(value,index) in foodTypeList" :key="index">
      <home-grid :dataList="value"></home-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import homeGrid from "./homeGrid";
import { foodListApi } from "../../../request/index";
import Bus from "../bus";
export default {
  data() {
    return {
      foodTypeList: []
    };
  },
  components: {
    homeGrid
  },
  created() {
    this.getFoodList();
    let that = this;
    Bus.$on("my-refresh", function() {
      that.getFoodList();
    });
  },
  methods: {
    getFoodList() {
      foodListApi("").then(res => {
        if (res.data.status == 0) Toast("刷新失败,请检查网络");
        this.foodTypeList = this.sliceArr(res.data, 8);
      });
    },
    //截取数据 : 数组,每页多少项
    sliceArr(array, itemNum) {
      let tempArr = [];
      //计算有多少页
      let blockNum = Math.ceil(array.length / itemNum);
      let start = itemNum;
      for (let i = 0; i < blockNum; i++) {
        //截取数组
        tempArr.push(array.slice(i * start, itemNum));
        //结束位置
        itemNum =
          itemNum + itemNum > array.length ? array.length : itemNum + itemNum;
      }
      return tempArr;
    }
  }
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  height: 320px;
  padding-bottom: 10px;
}
</style>