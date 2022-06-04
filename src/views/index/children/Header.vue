<template>
  <van-nav-bar left-arrow>
    <template #left>
      <van-icon size="20px" color="#fff" name="search" />
    </template>
    <template #title>
      <h2 class="title">{{name}}</h2>
    </template>
    <template #right>
      <van-button type="default">登录</van-button>|
      <van-button type="default">注册</van-button>
    </template>
  </van-nav-bar>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name:"",
      offset: 20,
      limit: 20,
    }
  },
  methods: {},

  created() {
    // http://kumanxuan1.f3322.net:8001/shopping/restaurants?latitude=23.128225&longitude=113.289752
    axios.get("http://kumanxuan1.f3322.net:8001/v2/pois/23.128225,113.289752").then((data) => {
      // console.log(data.data.name);
      this.name = data.data.name;
    }).catch((error) => {
      alert(error);
    });
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3190e8;
  color: #fff;
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  .title {
    color: #fff;
    font-size: 44px;
    margin-top: 0px;
  }
  .van-button--default {
    border: none;
    color: #fff;
    background-color: #3190e8;
    font-size: 26px;
  }
}
</style>