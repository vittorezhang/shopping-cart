<template>
    <div>
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
                    <van-rate v-model="EvaluateInfo.service_score" disabled disabled-color="orange"/>
                    <span>{{EvaluateInfo.service_score | getFolter}}</span>
                </div>
                <div>
                    送餐评价
                    <van-rate v-model="EvaluateInfo.overall_score" disabled disabled-color="orange"/>
                    <span>{{EvaluateInfo.overall_score | getFolter}}</span>
                </div>
                <p>
                    送达时间
                    <span>{{EvaluateInfo.deliver_time | getFolter}} 分钟</span>
                </p>
            </div>
        </div>
        <div class="comment">
            <div class="comment_top">
                <van-tag :color="item.unsatisfied?'#4999fa':'lightblue'" v-for="(item,index) in Comment" :key="item._id" @click="click(item,index)">
                    {{item.name}}({{item.count}})
                </van-tag>
            </div>
            <div class="comment_content" v-for="item in CommentList" :key="item._id">
                <div class="content_left">
                    <van-image width="50px" height="50px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                </div>
                <div class="content_right">
                    <div class="right_title">
                        {{item.username}}
                        <span>{{item.rated_at}}</span>
                    </div>
                    <div>
                        <van-rate v-model="item.rating_star" disabled disabled-color="orange"/>
                        {{item.time_spent_desc}}
                    </div>
                    <div>
                        <van-image width="60px" height="60px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                        <van-image width="60px" height="60px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    </div>
                    <div>
                        <div class="tag_box" v-for="v in item.item_ratings" :key="v._id">
                        <van-tag plain >
                            {{v.food_name}}
                        </van-tag>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getEvaluate, getComment, getCommentList} from '../request/Api'
export default {
    props:{
        shop_id:{
            type:String
        }
    },
    data(){
        return{
            EvaluateInfo:{},
            Comment:[],
            CommentList:[]
        }
    },
    created() {
        getEvaluate({restaurant_id:this.shop_id}).then(res=>{
            this.EvaluateInfo = res.data;
        });
        getComment({restaurant_id:this.shop_id}).then(res =>{
            this.Comment = res.data;
            // 获取对应offset的评论数据
            this.getInfo();
        });
    },
    filters:{
        getFolter(value){
            return parseFloat(value).toFixed(1);
        }
    },
    methods:{
        // 获取对应offset的评论数据
        getInfo(){
            let index;
            this.Comment.map(v => {
                if(v.unsatisfied == true){
                    index = this.Comment.indexOf(v);
                }
            });
            getCommentList({
                restaurant_id:this.shop_id,
                offset:index*10,
                limit:10
            }).then(res =>{
                this.CommentList = res.data;
            })
        },
        click(item,index){
            console.log(item,index);
            this.Comment.map(v => {
                v.unsatisfied = false;
            })
            item.unsatisfied = true;
            // 获取对应offset的评论数据
            this.getInfo();
            console.log(this.CommentList)
        }
    }
}
</script>

<style lang="less" scope>
    .evaluate{
        display:flex;
        background:#fff;
        padding:10px 5px;
        span{
            font-size:20px;
            color:#aaa;
        }
        div{
            padding:5px;
            font-size:28px;
        }
        .eva_left{
            flex:0.9;
            text-align: center;
            p{
                font-size:36px;
                color:orange;
            }
            div{
                padding:0;
                
            }
        }
        .eva_right{
            flex:1;
            div{
                span{
                    font-size:24px;
                    color:orange;
                }
            }
            p{

            }
            
        }
    }
    .comment{
        .comment_top{
            margin-top:20px;
            padding:20px;
            background:#fff;
            .van-tag{
                font-size:26px;
                padding:6px 10px;
                text-align:center;
                margin: 10px 15px 10px 0;
                .van-tag--primary{}
            }
        }
        .comment_content{
            border-top:0.5px solid #ccc;
            padding:10px 20px;
            background:#fff;
            display:flex;
            .content_left{
                flex:1;
            }
            .content_right{
                flex:5;
                .right_title{
                    padding:5px 0;
                    span{
                        float:right;
                        color:#aaa;
                        font-size:20px;
                    }
                    
                }
                .van-image{
                    margin-right:10px;
                }
                .tag_box{
                    display:inline-block;
                    margin-right:10px;
                }
                .van-tag.van-tag--plain.van-tag--default.van-hairline--surround{
                    width:68px;
                    overflow: hidden;
                    text-overflow: ellipsis;    /*表示文本超出时候用 “...” 来代替*/
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;  // 几行
                }
           }
        }
       
    }
</style>