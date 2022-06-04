<template>
  <div>
    <!-- 评价分数 -->
    <div class="evaluate">
      <div class="eva_left">
        <p>{{EvaluateInfo.food_score | getFolter}}</p>
        <div>综合评价</div>
        <div>
          <span>高于周边商家{{EvaluateInfo.compare_rating*100 | getFolter}}%</span>
        </div>
      </div>
      <div class="eva_right">
        <div>
          服务态度
          <van-rate v-model="EvaluateInfo.service_score" disabled disabled-color="orange" />
          <span>{{EvaluateInfo.service_score | getFolter}}</span>
        </div>
        <div>
          送餐评价
          <van-rate v-model="EvaluateInfo.overall_score" disabled disabled-color="orange" />
          <span>{{EvaluateInfo.overall_score | getFolter}}</span>
        </div>
        <p>
          送达时间
          <span>{{EvaluateInfo.deliver_time | getFolter}} 分钟</span>
        </p>
      </div>
    </div>
    <!-- 评价分类 -->
    <div class="EvaluateCategory">
      <van-tag
        v-for="item in EvaluateCategoryInfo"
        :key="item._id"
        :color="item.unsatisfied?'#4999fa':'lightblue'"
        @click="click(item)"
        class="EvaluateCategoryItem"
      >{{`${item.name + '(' + item.count + ')'}`}}</van-tag>
    </div>
    <!-- 评价信息列表 -->
    <div class="EvaluateInfoList" v-for="item in EvaluateInfoList" :key="item._id">
      <div class="EvaluateInfoList_left">
        <van-image width="80px" height="50px" :src="require('../../assets/star1.jpg')" />
      </div>
      <div class="EvaluateInfoList_right">
        <div class="right_title">
          {{item.username}}
          <span>{{item.rated_at}}</span>
        </div>
        <div>
          <van-rate v-model="item.rating_star" disabled disabled-color="orange" />
          {{item.time_spent_desc}}
        </div>
        <div>
          <van-image width="80px" height="60px" :src="require('../../assets/star1.jpg')" />
          <van-image width="80px" height="60px" :src="require('../../assets/star1.jpg')" />
        </div>
        <div>
          <div class="tag_box" v-for="v in item.item_ratings" :key="v._id">
            <van-tag plain>{{v.food_name}}</van-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  EvaluateApi,
  EvaluateCategoryApi,
  CommentListApi
} from "../../request/index";
export default {
  //接收父组件传递过来的属性
  props: {
    shop_id: {
      type: String
    }
  },
  data() {
    return {
      EvaluateInfo: {},
      EvaluateCategoryInfo: [],
      EvaluateInfoList: []
    };
  },
  created() {
    EvaluateApi({ restaurant_id: this.shop_id }).then(res => {
      this.EvaluateInfo = res.data;
      // console.log(res.data)
    });
    EvaluateCategoryApi({ restaurant_id: this.shop_id }).then(res => {
      this.EvaluateCategoryInfo = res.data;
      // console.log(res.data);
    });
    CommentListApi({
      restaurant_id: this.shop_id,
      offset: 10,
      limit: 10
    }).then(res => {
      this.EvaluateInfoList = res.data;
    });
  },
  filters: {
    getFolter(value) {
      return parseFloat(value).toFixed(1);
    }
  },
  methods: {
    click(item) {
      // console.log(item);
      this.EvaluateCategoryInfo.map(itemChild => {
        itemChild.unsatisfied = false;
        // console.log(itemChild);
      });
      item.unsatisfied = true;
      // 获取对应offset的评论数据
      this.getInfo();
    },
    // 获取对应offset的评论数据
    getInfo() {
      let index;
      this.EvaluateCategoryInfo.map(item => {
        if (item.unsatisfied == true) {
          index = this.EvaluateCategoryInfo.indexOf(item);
        }
      });
      // console.log(index);
      CommentListApi({
        restaurant_id: this.shop_id,
        offset: index * 10,
        limit: 10
      }).then(res => {
        this.EvaluateInfoList = res.data;
      });
    }
  }
};
</script>

<style lang="less">
.evaluate {
  display: flex;
  background: #fff;
  padding: 10px 5px;
  span {
    font-size: 20px;
    color: #aaa;
  }
  div {
    padding: 5px;
    font-size: 28px;
  }
  .eva_left {
    flex: 0.9;
    text-align: center;
    p {
      font-size: 36px;
      color: orange;
    }
    div {
      padding: 0;
    }
  }
  .eva_right {
    flex: 1;
    div {
      span {
        font-size: 24px;
        color: orange;
      }
    }
  }
}
.EvaluateCategory {
  background: #fff;
  margin-top: 20px;
  .EvaluateCategoryItem {
    margin-left: 50px;
    font-size: 24px;
    font-weight: bold;
  }
}
.EvaluateInfoList {
  border-top: 0.5px solid #ccc;
  padding: 10px 20px;
  background: #fff;
  display: flex;
  .EvaluateInfoList_left {
    flex: 1;
  }
  .EvaluateInfoList_right {
    flex: 5;
    .right_title {
      padding: 5px 0;
      span {
        float: right;
        color: #aaa;
        font-size: 20px;
      }
    }
    .van-image {
      margin-right: 10px;
    }
    .tag_box {
      display: inline-block;
      margin-right: 10px;
    }
    .van-tag.van-tag--plain.van-tag--default.van-hairline--surround {
      width: 68px;
      overflow: hidden;
      text-overflow: ellipsis; /*表示文本超出时候用 “...” 来代替*/
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; // 几行
    }
  }
}
</style>