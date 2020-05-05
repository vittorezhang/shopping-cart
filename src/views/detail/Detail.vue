<template>
<div class="detail">
<!-- <router-view></router-view> -->
  <div class="head">
    <div class="h-top">
      <van-icon name="arrow-left" size="30" color="#fff"/>
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588669501426&di=559abe9cdee755ae36b2228305573d6d&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd62a6059252dd42a1c362a29033b5bb5c9eab870.jpg"  style="width:100px;height:100px;border-radius:7px;margin-left:0px" alt="">
      <div class="h-right">
        <p>快餐车1</p>
        <p>商家配送&nbsp;/&nbsp;2分钟送达&nbsp;/&nbsp;配送费约¥5</p>
        <p>公告:&nbsp;买买买</p>
      </div>
    </div>
    <div class="h-foot">
      <div class="h-f-left">
        <div class='h-f-left-jian'>减</div>
        <p>满50减8</p>
        <p>(APP专享)</p>
      </div>

      <div class="h-f-right">
        <p>1个活动&nbsp;></p>
      </div>
    </div>
  </div>
  
  <van-tabs id="tab" ref="tab" v-model="active"  title-active-color="skyblue" line-width="30px">
    <van-tab class="tabss" title="商品" to='/productList' ></van-tab>
    <van-tab title="评价" to="/evaluation" ></van-tab>
  </van-tabs>
    <router-view></router-view>
  <!-- <div class="nav1">
    <div class="n-left" @click='onClick();jump()' >
      <p :class="this.isClick ? 'n-text2':'n-text'">商品</p>
      <div :class="this.isClick? 'xian' : 'xian2'"></div>
    </div>

    <div class="n-right" @click='onClick'>
      <p :class="this.isClick ? 'n-text':'n-text2'">评价</p>
      <div :class="this.isClick? 'xia2' : 'xian'"></div>
    </div>

  </div> -->

</div>
</template>

<script>
export default {
  data(){
    return {
      isClick:true,
      active: 2,
    }
  },
  methods:{
    onClick(){
      this.isClick=!this.isClick
      console.log(this);    
    },
    jump(){
      console.log(111);
      this.$router.replace('/productList')
    }
  },
  created() {
    console.log(this.$route.params.ids);
    
  },
}
</script>

<style lang="less" scoped>
.detail {
  height: 100%;
  overflow: hidden;
}
.head{
  padding-top: 20px;
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  background: rgb(202, 202, 202);
  opacity: 0.9;
  color: #fff;
  .h-top {
    display: flex;
    .h-right {
      flex: 1;
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      p {
        margin-top: 15px;
      }
      p:nth-child(1) {
        font-size: 40px;
        font-weight: bold;
      }
      p:nth-child(2) {
         font-size: 25px;
      }
       p:nth-child(3) {
         font-size: 25px;
      }
    }
  }

  .h-foot {
    margin-left: 50px;
    display: flex;
    margin-top: 20px;
    font-size: 25px;
    width: 100%;
    height:80px;
    line-height: 80px;
    color: #fff;
    .h-f-left {
      flex: 1;
      display: flex;
        p {
          margin-left: 10px;
        }
      .h-f-left-jian {
        width: 30px;
        height: 30px;
        margin-top: 25px;
        line-height: 30px;
        background: rgb(238, 76, 76);
      }
    }
    .h-f-right {
      flex: 1;
      p{
        float: right;
        margin-right: 50px;
      }
    }
  }
}

.nav1{
  height: 100px;
  widows: 100%;
  display: flex;
  font-size: 40px;
  font-weight: bold;
  background: #fff;
  text-align: center;
  // line-height: 80px;
  .n-left {
    flex: 1;
    display: flex;
    padding-top: 15px;
    flex-direction: column;
    
  }
   .n-right {
    flex: 1;
    display: flex;
    padding-top: 15px;
    flex-direction: column;
  }
  // .n-text {
  //   flex: 1;
  //   height: 100px;
  //   color: #eee;
  //   font-size: 30px;
  //   text-align: center;
  //   line-height: 100px;
    .n-text {
      margin-bottom: 10px;
    }
    .n-text2 {
      color: rgb(24, 100, 241);
    }
    .xian {
      width: 80px;
      height: 7px;
      margin-top: 5px;
      background: rgb(24, 100, 241);
      margin: 0 auto;
    }
    .xian2 {
      background: #fff;
    }
  
    // .nav{
    //   height: 100px;
    // }

    // .van-tabs{
    //   height: 100px;
    // }

    // .van-tabs--line{
    //   height: 100%;
    // }
   /deep/ .van-tabs--line{
    height: 100px
}
}

</style>