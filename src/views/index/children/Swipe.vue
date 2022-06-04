<template>
  <van-swipe>
    <van-swipe-item>
      <van-grid :border="false" :column-num="4">
        <van-grid-item v-for="(item) in swipeData_one" :key="item.id">
          <van-image width="60px" height="50px" :src="imgUrl + item.image_url" />
          <p>{{item.title}}</p>
        </van-grid-item>
      </van-grid>
    </van-swipe-item>
    <van-swipe-item>
      <van-grid :border="true" :column-num="4">
        <van-grid-item v-for="(item) in swipeData_two" :key="item.id">
          <van-image width="60px" height="50px" :src="imgUrl + item.image_url" />
          <p>{{item.title}}</p>
        </van-grid-item>
      </van-grid>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Toast } from "vant";

import axios from "axios";

export default {
  data() {
    return {
      swipeData: [],
      imgUrl: "https://fuss10.elemecdn.com",
      swipeData_one: [],
      swipeData_two: []
    };
  },
  created: function() {
    axios
      .get("http://kumanxuan1.f3322.net:8001/v2/index_entry")
      .then(data => {
        this.swipeData = data.data;
        this.jiequ(data.data);
      })
      .catch(error => {
        alert(error);
      });
  },
  methods: {
    jiequ(data) {
      this.swipeData_one = data.slice(0, data.length / 2);
      this.swipeData_two = data.slice(data.length / 2, data.length);
    }
  }
};
</script>

<style lang="less" scoped>

p {
  color: #000;
  font-size: 22px;
}
</style>
<style lang="less">
.van-swipe__indicator{
    width: 12px;
    height: 12px;
    display: block;
    margin-left: 10px;
}
</style>