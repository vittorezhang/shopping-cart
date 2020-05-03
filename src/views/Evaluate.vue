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
    </div>
</template>

<script>
import {getEvaluate} from '../request/Api'
export default {
    props:{
        shop_id:{
            type:String
        }
    },
    data(){
        return{
            EvaluateInfo:{}
        }
    },
    created() {
        getEvaluate({restaurant_id:this.shop_id}).then(res=>{
            this.EvaluateInfo = res.data;
        })
    },
    filters:{
        getFolter(value){
            return parseFloat(value).toFixed(1);
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
</style>