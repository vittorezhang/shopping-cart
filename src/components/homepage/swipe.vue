<template>
  <van-swipe class="my-swipe" indicator-color="white" :loop="false">
    <van-swipe-item v-for="(value,index) in Listdat" :key="index">
        <my-grid :dataList="value"></my-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { entryList } from "../../request/api";
// 引入组件
import myGrid from "./grid"
export default {
    components:{
        myGrid
    },
  data() {
    return {
      Listdat: [[1], [0]]
    };
  },
  methods: {
    // 调用API的方法
    gogetList() {
      entryList("").then(res => {
        this.Listdat = this.Processing(res);
     
      });
    },
    // 定义一个方法对传入的数据进行处理
    Processing(data) {
      console.log();
      // 定义一个空数组
      let conList = [];
      // 获取页数 总数除以每页个数
      let number = Math.ceil(data.length / 8);
      // 定义一个数据接取的结束位置
      let end = 8;
      // 将数据分成二维数组
      for (let i = 0; i < number; i++) {
        conList.push(data.slice(i * 8, end));
        //判断结束的位置
        end  = end+end >data.length ? data.length:end+end 
      }
      return conList
    }
  },
  created() {
    this.gogetList();
  }
};
</script>

<style>
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