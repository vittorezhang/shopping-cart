<template>
  <van-swipe :loop="false" class="my-swipe">
    <van-swipe-item v-for="(value,index) in foodCategoryList" :key="index">
      <!-- 3.使用组件 -->
      <home-category :dataList="value"></home-category>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
//引入食品分类列表数据
import { foodListApi } from "../../request/index";
//1.引入homeCategory组件
import homeCategory from "./homeCategory";
export default {
  data() {
    return {
      foodCategoryList: []
    };
  },
  //2.注册组件
  components: {
    homeCategory
  },
  created() {
    //实例已经创建完成之后调用getFoodList
    this.getFoodList();
  },
  methods: {
    //定义数据请求的方法
    getFoodList() {
      foodListApi("").then(res => {
        //需求=>对接口请求过来的数据进行处理，每页显示8条数据
        this.foodCategoryList = this.sliceArr(res.data, 8);
        // console.log(this.foodCategoryList);
      });
    },
    //处理数据
    sliceArr(array, demandItem) {
      //1.定义一个temp数组
      let tempArr = [];
      //2.取到相应的页数
      let pageNum = Math.ceil(array.length / demandItem);
      //3.取到数组以首的元素
      let startItem = demandItem;
      for (let i = 0; i < pageNum; i++) {
        //4.截取数组(slice方法包首不包末)
        tempArr.push(array.slice(i * startItem, demandItem));
        //5.取到数组以末的元素
        demandItem =
          demandItem + demandItem > array.length
            ? array.length
            : demandItem + demandItem;
      }
      //6.返回处理后的数据
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