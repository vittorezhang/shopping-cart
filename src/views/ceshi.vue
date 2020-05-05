<template>
  <div>
    <!-- 商家信息 -->
    <div class="details">
      <div class="details_info">
        <div class="details_image">
          <van-image
            fit="contain"
            :src="'http://kumanxuan1.f3322.net:8001/img/'+InfoList.image_path"
          />
        </div>
        <!-- 配送 -->
        <div class="details_right">
          <h2>{{InfoList.name}}</h2>
          <div class="right_info">
            <div class="left">
              <p>{{InfoList.delivery_mode?InfoList.delivery_mode.text:''}}/{{InfoList.piecewise_agent_fee?InfoList.piecewise_agent_fee.tips:''}}</p>
              <p>公告:{{InfoList.promotion_info}}</p>
            </div>
            <div class="right">
              <van-icon name="arrow" size="22" />
            </div>
          </div>
        </div>
      </div>
      <!-- 满减 -->
        <!-- activities -->
        <van-nav-bar>
          <template #left>
            <div v-for="item in InfoList.activities" :key="item.id">
              <van-tag type="warning" >{{item.icon_name}}</van-tag>
              <span>{{item.description}}</span>
            </div>
           
          </template>
          <template #right>
            <p>{{InfoList.activitie?InfoList.activities.length:1}}个活动</p>
            <van-icon name="arrow" size="18" class="icon" />
          </template>
        </van-nav-bar>
    </div>
    <!-- 产品信息 -->
    <van-tabs title-active-color="#1989fa" color="#1989fa" line-width="50">
      <div></div>
      <van-tab title="商品">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item :title="item.name" dot v-for="item in goodsList" :key="item.id"/>
        </van-sidebar>
        <van-panel
          style=""
          @scroll="handleScroll" id="scroll"
        >
          <template #header>
          </template>
          <div v-for="item in goodsList" :key="item.id">
            <div class="goodsTitle">
              <b>{{item.name}}</b>
              <span>{{item.description}}</span>
              <van-icon name="ellipsis" />
            </div>
            <!-- 商品 -->
            <van-card v-for="v in item.foods" :key="v.category_id" id="goods">
              <template #thumb>
                <span class="icon_top">新品</span>
                <van-image :src="'http://kumanxuan1.f3322.net:8001/img/171b022a48b2.jpg'" />
              </template>
              <!-- 标题 -->
              <template #title>
                <div class="goods_box">
                  <div class="icon_left">
                    <h3>{{v.name}}</h3>
                  </div>
                  <p class="icon_right">
                    <van-tag round plain color="#FF6347">
                      <span>品牌</span>
                    </van-tag>
                  </p>
                </div>
              </template>
              <!-- 内容 -->
              <template #tags>
                <!-- 描述 -->
                <div class="goods_box miao_shu">{{v.description}}</div>
                <div class="goods_box">{{v.tips}}</div>
                <div class="goods_box">
                  <van-tag round plain color="f07373" text-color="#f1884f">
                    <span>{{v.activity.image_text}}</span>
                  </van-tag>
                </div>
                <div class="goods_box">
                  <div class="icon_left Price">
                    ￥
                    <span>{{v.specfoods[0].price}}</span>
                  </div>
                  <div class="icon_right">
                    <van-stepper v-model="value" v-if="v.specfoods.length < 2"/>
                    <van-tag type="primary" v-if="v.specfoods.length >= 2">选规格</van-tag>
                  </div>
                </div>
              </template>
              <!-- <span class="icon_top"></span> -->
            </van-card>
          </div>
        </van-panel>
      </van-tab>

      <van-tab title="评价">123</van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getStore,get1,get2 } from "../request/Api.js";
import {data} from '../assets/data';
export default {
  
  data() {
    return {
      // 高度数组
      heightList:[],
      InfoList: [],
      activeKey: 0,
      goodsList:data,
      // 数量
      value:1
    };
  },
  created() {
    get1({restaurant_id:1}).then(res=>{
      console.log(res);
    })
    get2().then(res=>{
      console.log(res);
    })
    let { shopid } = this.$route.params;
    getStore({ shopid }).then(res => {
      if (res.status == 200) {
        this.InfoList = res.data;
      }
    });
  },
  mounted() {
    this.$nextTick(() =>{
      // 商品盒子高度，标题盒子高度
      let goodsHieght,titleHeight;
      titleHeight = document.getElementsByClassName("goodsTitle")[0].offsetHeight;
      goodsHieght = document.getElementById("goods").offsetHeight;
      this.getScrollAll(goodsHieght,titleHeight);
    })
  },
  methods: {
    /**
     * 高度数组
     * goodsHieght 商品盒子高度
     * titleHeight 标题盒子高度
    */
    getScrollAll(goodsHieght, titleHeight){
        // 商品盒子高度
        let goods = goodsHieght;
        let heightList = this.goodsList.map((v, k) =>v.foods.length);
        heightList = [0,...heightList];
        for(let i=0; i < heightList.length; i++){
          heightList[i] = i!=0?Math.floor((heightList[i-1]/ goods+heightList[i])* goods) + titleHeight: heightList[i] * goods;
        }
        this.heightList = heightList;
    },
    /**
     *  左侧点击
     * index 当前索引
     * */ 
    onChange(index){
        // 当前索引小于高度数组时
        if(index < this.heightList.length)
          document.getElementById("scroll").scrollTop = this.heightList[index]!=0 ?this.heightList[index] + 1:this.heightList[index] ;
    },
    // 右侧滑动
    handleScroll() {
        let heightList = this.heightList;
        let hiddenTop = document.getElementById("scroll").scrollTop;
        if(hiddenTop >= heightList[this.activeKey+1]){
          if(this.activeKey < heightList.length-2){
            this.activeKey += 1;
          }
        }else{
          if(hiddenTop < heightList[this.activeKey]){
            this.activeKey = this.activeKey - 1;
          }
          return false;
        }
        // console.log(hiddenTop)
        // console.log(heightList[this.activeKey+1]);
    },
  },
  computed: {
  },
};
</script>
<style lang="less" scope>
.van-tab__pane{
    .van-cell-group.van-hairline--top-bottom.van-panel{
      background:red;
      display:inline-block;
      width:80%;
      height:1270px;
      overflow-y:scroll;
      background:rgba(0,0,0,0)
    }
}
// 分类标题
.goodsTitle{
  padding:0.3rem 0.2rem;
  b{
    font-size:36px;
    margin-right:0.2rem
  }
  .van-icon.van-icon-ellipsis{
    font-size:35px;
    float:right;

  }
}
// 商家信息
.details {
  background: #aaa;
  .van-nav-bar.van-hairline--bottom {
    color: #fff;
    background: rgba(0, 0, 0, 0);
    padding-bottom: 20px;
    font-size: 20px;
  }
  .icon {
    color: #fff;
  }
  .details_info {
    color: #fff;
    width: 100%;
    display: flex;
    padding: 20px;
    padding-bottom: 0;
    .details_image {
      flex: 1;
    }
    .details_right {
      padding: 0 25px;
      flex: 3;
      .right_info {
        overflow: hidden;
        position: relative;
        .left {
          float: left;
        }
        .right {
          float: right;
          position: absolute;
          top: 30%;
          right: 0;
        }
      }
    }
  }
}
// 商品、评价
.van-tabs.van-tabs--line {
  height: 1rem;
  .van-tabs__wrap {
    overflow: visible;
  }
  .van-tabs__wrap.van-hairline--top-bottom {
    height: 1rem;
    .van-tabs__nav.van-tabs__nav--line {
      // line-height:1rem;
      padding-bottom: 0;

      .van-tab.van-ellipsis {
        line-height: 1rem;
        .van-tab__text {
          font-size: 0.4rem;
        }
      }
    }
    .van-tab.van-tab--active.van-ellipsis {
      line-height: 1rem;
    }
  }
  // 左侧导航
  .van-tabs__content {
    .van-tab__pane {
      overflow: hidden;
      .van-sidebar {
        float: left;
        width: 20%;
        height:1270px;
        overflow-y: scroll;
        .van-sidebar-item.van-sidebar-item--select {
          border-width: 0.08rem;
          border-color: rgb(25, 137, 250);
          background: #fcfcfc;
        }
        .van-sidebar-item {
          line-height: 0.5rem;
          background-color: rgba(0, 0, 0, 0, 0);
          .van-sidebar-item__text {
            height: 0.6rem;
            width: 100%;
            text-align: center;
            font-size: 0.33rem;
            .van-infovan-sidebar-item__info,
            .van-info.van-sidebar-item__info {
              width: 0.3rem;
              height: 0.3rem;
              line-height: 0.3rem;
            }
          }
        }
      }
    }
  }
  .van-card {
    background: #fff;
    position: relative;
    // padding:0.2rem 0.2rem;
    .van-card__thumb {
      padding: 0.5rem 0.15rem 0 0;
    }
    .icon_top {
      position: absolute;
      border: 2px solid #ffffff;
      top: -0.106667rem;
      left: -0.213333rem;
      z-index: 4;
      font-family: "dincondm";
      color: #ffffff;
      line-height: 20px;
      padding: 4px 8px;
      background: lightgreen;
    }
    // 商品描述
    .miao_shu {
      color: #aaa;
    }
    // 商品价格
    .Price {
      color: orange;
      span {
        font-weight: 1000;
      }
    }
  }
  // 商品
  .goods_box {
    overflow: hidden;
    position: relative;
    font-size: 0.4rem;
    .icon_left {
      display: inline-block;
      position: absolute;
      top: 15%;
    }
    .icon_right {
      display: inline-block;
      float: right;
      margin: 10px 0;
    }
  }
}
</style>