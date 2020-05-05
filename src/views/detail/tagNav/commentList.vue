<template>
  <div class="comment-wapper">
    <div class="info-box">
      <div class="info-left">
        <p style="font-size:20px;color:orange">{{startObj.service_score|setNum(1)}}</p>
        <p style="color:#333">综合评价</p>
        <p style="font-size:12px;color:#777">高于周边商家{{startObj.compare_rating*100|setNum(2)}}%</p>
      </div>
      <div class="info-right">
        <div class="start-row">
          服务态度
          <my-start class="start-box" :startNum="startObj.food_score|setNum(1)"></my-start>
          <span>{{startObj.service_score|setNum(1)}}</span>
        </div>
        <div class="start-row">
          菜品评价
          <my-start class="start-box" :startNum="startObj.food_score|setNum(1)"></my-start>
          <span>{{startObj.food_score|setNum(1)}}</span>
        </div>
        <div class="start-row">
          送达时间
          <span class="arrive-time">分钟</span>
        </div>
      </div>
    </div>

    <div class="tag-box">
      <van-tag
        v-for="item in tagsArr"
        :unAble="item.name == '不满意'?true:false"
        class="tags"
        @click="tagClickHandle"
        :color="item.name == '不满意'?'#eee':'#EBF5FF'"
        :key="item._id"
      >{{item.name}}({{item.count}})</van-tag>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment-item class="comment-item" v-for="item in listArr" :key="item.id" :itemObj="item"></comment-item>
    </van-list>
  </div>
</template>

<script>
import { foodStartApi, commentListApi } from "../../../request/index";
import { Toast } from "vant";
import myStart from "../../../components/start/start";
import commentItem from "./commentItem";
export default {
  components: {
    myStart,
    commentItem
  },
  data() {
    return {
      startObj: {},
      tagsArr: [],
      listArr: [],
      loading: false,
      finished: false,
      offset: 0,
      limit: 10
    };
  },
  created() {
    console.log(this.$route.params.shopid + "/ratings/scores");

    foodStartApi(this.$route.params.shopid + "/ratings/scores").then(res => {
      if (res.data.status == 0) Toast.fail("获取评分失败，请重试！");
      console.log(res.data);
      this.startObj = res.data;
    });
    foodStartApi(this.$route.params.shopid + "/ratings/tags").then(res => {
      console.log(res.data);
      this.tagsArr = res.data;
    });
    this.getCommint(this.offset, this.limit);
    // foodStartApi({url:this.$route.params.shopid + "/ratings",param:offset,limit}).then(res => {
    //   console.log(res.data);
    //   this.listArr = res.data;
    // });
  },
  filters: {
    setNum(num, position) {
      let myNum = Number(num);
      return Number(myNum.toFixed(position));
    }
  },
  methods: {
    tagClickHandle(e) {
      let tagsNoed = document.getElementsByClassName("tags");
      for (let i = 0; i < tagsNoed.length; i++) {
        if (tagsNoed[i].getAttribute("unable")) {
          tagsNoed[i].style.backgroundColor = "#eee";
          tagsNoed[i].style.color = "#777";
          continue;
        }
        tagsNoed[i].style.backgroundColor = "#EBF5FF";
        tagsNoed[i].style.color = "#777";
      }
      e.target.style.backgroundColor = "#1989fa";
      e.target.style.color = "#fff";
    },
    onLoad() {
      this.getCommint(this.listArr.length, this.limit);
    },
    getCommint(offset, limit) {
      commentListApi({
        url: this.$route.params.shopid + "/ratings",
        option: { offset, limit }
      }).then(res => {
        console.log(res.data);
        let that = this;
        this.loading = false;
        res.data.map(item => {
          that.listArr.push(item);
        });
        if(this.listArr.length>20){
          this.finished = true
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  border-top: 1px solid #eee;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  background: #fff;
  .info-left {
    flex: 1.5;
    text-align: center;
  }
  .info-right {
    padding: 20px 0;
    flex: 2;
    font-size: 14px;
    margin-left: 20px;
    display: inline-block;
    .start-row {
      display: flex;
      flex-direction: row;
      .arrive-time {
        color: #666;
        margin-left: 10px;
      }
    }
    .start-box {
      margin-left: 10px;
      width: 150px;
      height: 20px;
      display: inline-block;
    }
  }
}
.tag-box {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid #eee; /*no */
  .tags {
    padding: 10px;
    margin: 5px;
    color: #777;
    border-radius: 10px;
  }
  .unable {
    background-color: #ddd;
  }
}
</style>