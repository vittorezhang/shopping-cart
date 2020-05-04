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
      <!-- 店铺商品 -->
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
          <!-- 类目标题 -->
          <div v-for="item in goodsList" :key="item.id">
            <div class="goodsTitle">
              <b>{{item.name}}</b>
              <span>{{item.description}}</span>
              <van-icon name="ellipsis" />
            </div>
            <!-- 商品 -->
            <van-card v-for="v in item.foods" :key="v.category_id" id="goods">
              <template #thumb>
                <span class="icon_top" v-if="v.specfoods.length == 1">
                    {{v.attributes[0].icon_name}}品
                </span>
                <van-image :src="'http://kumanxuan1.f3322.net:8001/img/' + v.image_path" />
              </template>
              <!-- 标题 -->
              <template #title>
                <div class="goods_box">
                  <div class="icon_left">
                    <h3>{{v.name}}</h3>
                  </div>
                  <p class="icon_right">
                    <van-tag round plain color="#FF6347" >
                      <span
                      >{{v.attributes[0].icon_name}}
                      </span>
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
                  <!-- 规格 -->
                  <div class="icon_right">
                    <Cartcontrol :food="v" @cartInfo="cartInfo"></Cartcontrol>
                  </div>
                </div>
              </template>
              <!-- <span class="icon_top"></span> -->
            </van-card>
          </div>
        </van-panel>
        
        <div class="goods_footer">
            <GoodsFooter @is_show="setCart" @payGoods="payGoods" :is_good_show="is_goods_show" :cart_count="cart_count" :cart_price="cart_price"></GoodsFooter>
            <van-popup v-model="is_goods_show" position="bottom"  @close="close" >
                <div class="popup_box popup_item_title">
                    <div class="popup_item_info ">
                        <h3>购物车</h3>
                    </div>
                    <div class="popup_item_btn" @click="emptyCart">
                        清空
                    </div>
                </div>
                <div class="popup_box" v-for="item in cartList" :key="item._id">
                    <div class="popup_item_info">
                        <h3>{{item.name}}</h3>
                        <div>默认</div>
                    </div>
                    <div class="popup_item_price">
                        ￥{{item.specfoods[0].price}}
                    </div>
                    <div class="popup_item_btn">
                        <Cartcontrol :food="item" @cartInfo="cartInfo"></Cartcontrol>
                    </div>
                </div>
            </van-popup>
        </div>
      </van-tab>
      <!-- 店铺评价 -->
      <van-tab title="评价">
        <Evaluate :shop_id = "shop_id"></Evaluate>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getStore, getGoodsInfo } from "../request/Api.js";
import {data} from '../assets/data';
import GoodsFooter from '../components/GoodsFooter'
import Cartcontrol from '../components/Cartcontrol'
import Evaluate from './Evaluate'
export default {
  data() {
    return {
      shop_id:null,
      // 高度数组
      heightList:[],
      InfoList: [],
      activeKey: 0,
      // 商品列表
      goodsList:[],
      // 控制商品弹出
      is_goods_show:false,
      // 购物车里的商品
      cartGoods:{},
      cartList:[],
      cart_count:0,
      cart_price:0
    };
  }
  ,
  created() {
    //   当前店铺ID
    this.shop_id = this.$route.params.shopid;
    
    getStore({ shopid:this.shop_id }).then(res => {
      if (res.status == 200) {
        this.InfoList = res.data;
      }
    });
    getGoodsInfo({restaurant_id:this.shop_id}).then(res =>{
        this.goodsList = res.data;
    })

  },
  mounted() {
    this.$nextTick(() =>{
    })
  },
  updated() {
        // 标题盒子高度
        let titleHeight = document.getElementsByClassName("goodsTitle")[0].offsetHeight;
        // 商品盒子高度
        let goodsHieght =document.getElementById("goods").offsetHeight || 0;
        // 盒子外边距
        let goodsMargin = parseFloat(getComputedStyle(document.getElementById("goods"), null).marginTop);
        goodsHieght = goodsHieght+goodsMargin;
        this.getScrollAll(goodsHieght,titleHeight);
  },
  components:{
      GoodsFooter,
      Cartcontrol,
      Evaluate
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
          document.getElementById("scroll").scrollTop = this.heightList[index]!=0 ?this.heightList[index] +1:this.heightList[index] ;
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

    // 点击购物车，显示或隐藏购物车信息
    setCart(value){
        this.is_goods_show = value;
    },
    // 关闭蒙版触发的事件
    close(){
        this.is_goods_show = false;
    },
    // 购物车商品信息列表
    cartInfo(info){
      info = info.food;
      if(this.cartList.length ==0){
          this.cartList.push(info);
      }else{

        let index = this.cartList.indexOf(info);
          if(this.cartList.includes(info)){
            this.$set(this.cartList[index], '__v', info.__v);
            // this.cartList[index].__v = info.__v;
          }else{
            this.cartList.push(info);
          }
      }
      let num = 0,sum=0;
      this.cartList.map((item,index) =>{
        if(item.__v == 0){
          this.cartList.splice(index,1)
        }
          num += item.__v;
          sum += item.__v * item.specfoods[0].price;
      });
      this.cart_count = num;
      this.cart_price = sum;
      this.$set(this, 'cartList',this.cartList);
      
      console.log(this.cart_count,this.cart_price)
      console.log(this.cartList)
    },
    // 清空购物车
    emptyCart(){
      if(this.cartList.length){
        this.cartList = []; 
        this.cart_count=0;
        this.cart_price=0;
        this.goodsList.map(item =>{
            item.foods.map(v =>{
              v.__v = 0;
            })
        })
      }
    },
    // 支付按钮
    payGoods(value){
      if(value < 20){
        return ;
      }
      this.emptyCart();
      alert(`支付了${value}`);
    }
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
    .van-panel__content{
        padding-bottom:200px;
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
      // 步进器
      .van-stepper{
          .van-stepper__minus.van-stepper__minus--disabled{
              
          }
      }
    }
  }
}
.popup{
    position: relative;
    z-index:88;
}
.goods_footer{
    height:88px;
    .van-hairline--top-bottom.van-tabbar.van-tabbar--fixed{
        height:88px;
        bottom:0;
    }
    .van-overlay{
        z-index:none;
    }
}
// 蒙版
.van-popup.van-popup--bottom{
    max-height:600px;
    // position: relative;
    .popup_box.popup_item_title{
        background:#eee;
        h3{
            line-height:88px;
        }
        .popup_item_btn{
            text-align:center;
        }
    }
    bottom:88px;
    .popup_box{
        height:88px;
        display:flex;
        line-height:88px;
        padding:10px 20px 0;
        .popup_item_info{
            flex:2.5;
            line-height:normal
        }
        .popup_item_price{
            flex:1;
            color:orange;
            font-size:30px;
            font-weight:800
        }
        .popup_item_btn{
            flex:1;
            height:44px;
            .cartcontrol{
              .cart-decrease{
                animation:none;
              }
              .cart-add.iconfont.icon-jia{
                width:0.346667rem;
                height:0.346667rem;
                line-height: 0.346667rem;
              }
            }
        }
    }
}
</style>