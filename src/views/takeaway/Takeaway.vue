<template>
  <div>
    <div class="head">
      <div class="head-left">
        <van-icon class="icon" name="search" color="#fff" size="30" />
      </div>
      <div class="head-middle">{{addressName}}</div>
      <div class="head-right">登录 | 注册</div>
    </div>

    <div class="middle">
        <van-swipe class="my-swipe" indicator-color="white">
            <van-swipe-item>
                <div class="m-item">
                    <img src="https://www.baidu.com/img/baidu_resultlogo@2.png" style="width:60px;height:60px" alt="">
                    <i>qqqq</i>
                </div>
            </van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
        </van-swipe>
    </div>
  </div>
</template>

<script>
import { GaodeApi } from "../../request/api";

export default {
    data() {
        return {
           addressName:'',
        };
    },
    created() {
        GaodeApi({address:"23.128225,113.289752"}).then(res => {
            console.log(res);
            this.addressName=res.data.name;
            console.log(this.addressName);
            
        });
    }
};
</script>

<style lang="less" scoped>
.head {
  width: 100%;
  height: 80px;
  background: rgb(34, 163, 214);
  text-align: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
}

.head-left {
  height: 50px;
  width: 70px;
  text-align: center;
}
.head-middle {
  height: 100%;
  color: #fff;
  font-size: 32px;
  font-weight: 100;
  text-align: center;
  line-height: 80px;
  flex: 2;
}
.head-right {
  height: 100%;
  width: 180px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 80px;
}

  .my-swipe {
      height:300px;
    .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
  }

  .m-item {
      float: left;
      width:75px;
      height: 150px;
      background: chocolate;
        // margin: 0 auto;
    
      
  }
</style>