<template>
  <van-nav-bar :title="title" left-arrow  @click-left="onClickLeft"
  @click-right="onClickRight">
    <template #left>
      <van-icon name="search" size="18" />
    </template>
    <template #right>
      <div>登录 | 注册</div>
    </template>
  </van-nav-bar>
</template>

<script>
import { Toast } from "vant";
import {getAddress} from "../request/Api.js";
export default {
    data(){
        return {
            title:""
        }
    },
    created(){
        getAddress({geohash:"23.128225,113.289752"}).then(res =>{
            this.title = res.data.name;
        })
    },
    methods: {
        onClickLeft() {
        Toast("返回");
        },
        onClickRight() {
        Toast("按钮");
        }
    }
};
</script>

<style lang="less" scope>
    
    
</style>