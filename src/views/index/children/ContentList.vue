<template>
  <div class="content-list">
    <div class="list-shoping">
      <!-- <van-icon class-prefix="&#xe690;" name="extra" /> -->
      <van-icon name="wap-home-o" />
      <p>附近商家</p>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item) in list" :key="item.id">
          <div class="list-content">
            <van-image width="80px" height="68px" :src="image_paths + item.image_path" />
            <div class="list-content-right">
              <div class="right-top">
                <div class="right-top-left">
                  <span>品牌</span>
                  <span>&nbsp;&nbsp;{{item.category}}</span>
                </div>
                <span>类别</span>
              </div>
              <div class="right-zhongjian">
                <div class="right-top-left">
                  <span>★★★★★</span>&nbsp;
                  <span>{{item.rating}}</span>
                  <span>月售{{item.recent_order_num}}单</span>
                </div>
                <div class="right-top-right">
                  <span>{{item.delivery_mode.text}}</span>
                  <span>{{item.supports[1].name}}</span>
                </div>
              </div>
              <div class="right-button">
                <div class="right-top-left">
                  <span>￥20起送</span>
                  <span>/</span>
                  <span>{{item.piecewise_agent_fee.tips}}</span>
                </div>
                <div class="right-top-right">
                  <span>{{item.distance}}</span>
                  <span>/</span>
                  <span>{{item.order_lead_time}}</span>
                </div>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 1,
      arrList: [],
      image_paths: "http://kumanxuan1.f3322.net:8001/img/",
    };
  },
  methods: {
    axiosList(limitNum) {
      let arr = [];
      axios
        .get("http://kumanxuan1.f3322.net:8001/shopping/restaurants", {
          params: {
            latitude: 23.128225,
            longitude: 113.289752,
            offset: limitNum * (this.pageNum - 1),
            limit: limitNum
          }
        })
        .then(data => {
            if (this.refreshing) {
              this.list = [];
              this.refreshing = false;
            }
            for(let i = 0; i < data.data.length; i++) {

                this.list.push(data.data[i]);
            }
            this.loading = false;
            if (data.data.length < 20) {
              this.finished = true;
            }
        })
        .catch(error => {
          alert(error);
        });
    },
    onLoad() {
      this.axiosList(20);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  }
};
</script>

<style lang="less" scoped>
.content-list {
  width: 100%;

  .list-shoping {
    width: 100%;
    height: 50px;
    margin-top: 35px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      color: #ccc;
      font-size: 14px;
      margin-top: 10px;
      margin-left: 20px;
    }
  }
}
.list-content {
  display: flex;
  flex-direction: row;
  .list-content-right {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    margin-left: 20px;
    .right-top {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .right-top-left {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span:nth-child(1) {
          background-color: yellow;
          display: flex;
          flex-direction: row;
        }
        span:nth-child(2) {
          font-size: 20px;
          font-weight: 600;
          margin-left: 10px;
        }
      }
      span {
        font-size: 16px;
      }
    }
    .right-zhongjian {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .right-top-left {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span:nth-child(1) {
          display: flex;
          flex-direction: row;
          color: yellow;
        }
        span:nth-child(2) {
          font-size: 20px;
          font-weight: 600;
          margin-left: 10px;
        }
        span:nth-child(3) {
          margin-left: 10px;
        }
      }
      .right-top-right {
        display: flex;
        flex-direction: row;
        span {
          line-height: 23px;
        }
        span:nth-child(1) {
          color: #fff;
          background-color: #3190e8;
          border-radius: 2px;
          margin-right: 10px;
        }
        span:nth-child(2) {
          color: #3190e8;
          border: 1px solid #3190e8;
          border-radius: 2px;
        }
      }
      span {
        font-size: 16px;
      }
    }
    .right-button {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .right-top-left {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        span:nth-child(1) {
          display: flex;
          flex-direction: row;
        }
        span:nth-child(2) {
          font-size: 20px;
          font-weight: 600;
          margin-left: 10px;
        }
        span:nth-child(3) {
          margin-left: 10px;
        }
      }
      .right-top-right {
        display: flex;
        flex-direction: row;
        span:nth-child(1) {
          display: flex;
          flex-direction: row;
        }
        span:nth-child(2) {
          font-size: 20px;
          font-weight: 600;
          margin-left: 10px;
        }
        span:nth-child(3) {
          margin-left: 10px;
          color: #3190e8;
        }
      }
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
<style lang="less">
.van-cell__value {
  text-align: left;
}
</style>