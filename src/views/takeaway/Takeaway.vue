<template>
  <div class="takeaway">
  <!-- <router-view /> -->
    <div class="head">
      <div class="head-left">
        <van-icon class="icon" name="search" color="#fff" size="30" />
      </div>
      <div class="head-middle">{{addressName}}</div>
      <div class="head-right">登录 | 注册</div>
    </div>

    <div class="middle">
      <van-swipe
        class="my-swipe"
        indicator-color="#39a9ed"
        :loop="bool"
        slot="indicator"
      >
        <van-swipe-item class="van-swipe-item">
          <div class="m-item" v-for="(item,index) in grid" :key="index" v-show="index<8">
            <img
              :src="'https://fuss10.elemecdn.com'+item.image_url"
              style="width:50px;height:50px"
              alt
            />
            <p>{{item.title}}</p>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="m-item" v-for="(item,index) in grid" :key="index" v-show="index>7">
            <img
              :src="'https://fuss10.elemecdn.com'+item.image_url"
              style="width:50px;height:50px"
              alt
            />
            <p>{{item.title}}</p>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="list">
      <div class='l-head'>
        <i><van-icon name="shop-o" size="25"/></i>
        <p class="l-title">附近商家</p>
      </div>
      <!-- <div class="l-item">
        <img src="https://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1589181862&t=f3df9de545d1ea5cca4bf9d36f47f6cf" style="width:110px;height:100px" alt="">
        <div class="item-right">
          <div class="r-head">
            <div class="r-head-left"><p>品牌</p></div>
            <p class="r-head-right">一点点</p>
          </div>
          <div class="r-middle">
            <div class="r-middle-left">
              <p>评分: 4.7</p>
              <p>月售567单</p>
            </div>
            <div class="r-middle-right">
              <div>蜂鸟转送</div>
              <div>准时达</div>
            </div>
          </div>
          <div class="r-foot">
            <div class="r-foot-left">
              <p>¥20起送</p>
              <p>/ 配送费约¥5</p>
            </div>
            <div class="r-foot-right">
              <p>11.11公里 /</p>
              <p>1小时7分钟</p>
            </div>

          </div>
        </div>
      </div> -->
     
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset=300
    >   
      <router-view />
        <div class="l-item" v-for="(item, index) in list" :key='index' @click="getId(item.id)">
        <img :src="'http://kumanxuan1.f3322.net:8001/img/'+item.image_path" style="width:110px;height:100px" alt="">
        <div class="item-right">
          <div class="r-head">
            <div class="r-head-left"><p>品牌</p></div>
            <p class="r-head-right">{{item.name}}</p>
          </div>
          <div class="r-middle">
            <div class="r-middle-left">
              <p>评分: {{item.rating}}</p>
              <p>月售{{item.recent_order_num}}单</p>
            </div>
            <div class="r-middle-right">
              <div>蜂鸟转送</div>
              <div>准时达</div>
            </div>
          </div>
          <div class="r-foot">
            <div class="r-foot-left">
              <p>¥20起送</p>
              <p v-if="item.piecewise_agent_fee.tips">/ 配送费约¥5</p>

            </div>
            <div class="r-foot-right">
              <p>{{item.distance}} /</p>
              <p>{{item.order_lead_time}}</p>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    </div>
 
  </div>
</template>

<script>
import { GaodeApi, GridApi, ListApi, DetailApi } from "../../request/api";

export default {
  data() {
    return {
      bool: false,
      addressName: "",
      grid: [],
      list: [],
      loading: false,
      finished: false,
    }
  },
  methods: {
    onLoad() {
       ListApi({}).then(res=>{
          this.list = res.data;
          console.log(res.data);

        });
    },
    getId(id) {
      console.log(id);
      this.$router.push('/detail/'+id);
      //  this.$router.push({ 
      //    path: '/detail', 
      //    query:{
      //      val:id,
      //    }
      //    });
    },
  },

  created() {
   
    GaodeApi({ address: "23.128225,113.289752" }).then(res => {
      // console.log(res);
      this.addressName = res.data.name;
      // console.log(this.addressName);
    });
    GridApi({}).then(res => {
      // console.log(res.data);
      this.grid = res.data;
      // console.log(this.grid[0].image_url);
      // console.log(this.grid[0].title);
    });
    DetailApi({id:1}).then(res=> {
      console.log(res);
      
    })
  
  }
};
</script>

<style lang="less" scoped>
.takeaway{
  height: 100%;
  overflow: hidden;
}
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

.middle {
  height:310px;
  background: #fff;
}
.my-swipe {
  height: 310px;
  text-align: center;
  // padding: 10px;
  .van-swipe-item {
    color: #000;
    font-size: 20px;
    text-align: center;
    background-color: #fff;
    padding-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}

.m-item {
  width: 170px;
  height: 110px;
  div {
    padding: 0;
    margin: 0;
    width: 170px;
    height: 110px;
  }
  p {
    margin-top: 5px;
    width: 100%;
    height: 30px;
  }

  .dot {
    width: 100%;
    height: 25px;
    background: coral;
    float: left;
    // margin-top: 0px;
    // margin: 0 auto;
  }
}

.list {
  margin-top: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  padding-top: 20px;
  .l-head {
    height: 50px;
    // padding-top: 20px;
    padding-left: 20px;
    line-height: 10px;
    // background: blue;
    position: relative;
    i {
      position: absolute;
      top: 0px;
    }
    p {
      position: absolute;
      top: 20px;
      padding-left: 55px;
      display: inline-block;
      font-size: 39px;
    }

  }
    .l-item{
      width:100%;
      height: 200px;
      display: flex;
      padding:10px;
      margin-top: 20px;
      border-bottom: 1px rgb(212, 212, 212) solid;
      // background: rgb(97, 153, 51);
      .item-right {
        flex: 1;
        flex-direction: column;
        margin-left: 20px;
        .r-head {
          display: flex;
          height: 40px;
          line-height: 40px;
          align-items:center;
          .r-head-left{
            margin-top: 3px;
            width:60px;
            height: 30px;
            line-height: 33px;
            text-align: center;
            font-weight: bold;
            background: yellow;
            border-radius: 5px;
          }
          .r-head-right {
            font-weight: bold;
            padding-left: 10px;
            font-size: 34px;
          }
        }
        
        .r-middle {
          margin-top: 30px;
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 50px;
          justify-content: space-between;
          .r-middle-left {
            display: flex;
            width: 250px;
            height: 50px;
            justify-content: space-between;
            // text-align: center;
            line-height: 50px;
          }
          p:nth-child(1){
            color:darkgoldenrod;
            font-size: 28px;
          
          } 
          p:nth-child(2){
            color:#ccc;
            font-size: 25px;
          } 
          .r-middle-right {
            display: flex;
            width: 235px;
            height: 50px;
            text-align: center;
            line-height: 50px; 
           div:nth-child(1){
            color:#fff;
            font-size: 25px;
            width: 120px;
            height: 50px;
            background: rgb(19, 109, 212);
            border-radius: 7px;

          } 
            div:nth-child(2){
              margin-left: 5px;
              color:#fff;
              font-size: 25px;
              width: 90px;
              height: 50px;
              color: rgb(19, 109, 212);
              border: 1px rgb(19, 109, 212) solid;
              border-radius: 7px;
            // background: rgb(136, 69, 21);
          } 
          }
        }

        .r-foot {
          display: flex;
          margin-top: 30px;
          flex-direction: row;
          text-align: right;

          justify-content: space-between;
          color:rgb(99, 99, 99);
          .r-foot-left{
            display: flex;
            flex:1;
            p:nth-child(2){
              margin-left: 5px;
            }
          }

          .r-foot-right{
            margin-left: 50px;
            display: flex;
            flex:1;
            p:nth-child(2){
              margin-left: 5px;
              color: rgb(19, 109, 212);
            }
          }
        }
      }
    }
}
</style>