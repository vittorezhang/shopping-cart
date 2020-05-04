<template>
    <div class="cartcontrol">
        <div class="cart-decrease " v-show="food.__v>0"
            @click="decreaseCart"
        >
            <span class="inner iconfont icon-jian"></span>
        </div>
        <div class="cart-count" v-show="food.__v > 0">{{food.__v}}</div>
        <div class="cart-add iconfont icon-jia" @click="addCart"></div>
    </div>
</template>

<script>
export default {
    props:{
        food:{
            type:Object
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        addCart(){
            if(!this.food.__v){
                this.food.__v = 1;
            }else{
                this.food.__v++;
            }
            this.$emit('cartInfo',{food:this.food});
        },
        decreaseCart(){
            if(this.food.__v){
                this.food.__v--;
                console.log(this.food)
                this.$emit('cartInfo',{food:this.food});
            }
        }
    },

}
</script>

<style lang="less" scope>
@keyframes myfirst
{
    from {
        opacity: 0;
        margin-right:-30px;
        transform: rotate(0);
    }
    to {
        opacity: 1;
        margin-right:0px;
        transform: rotate(180deg);
    }
}
    .cartcontrol{
        font-size:0;
        .cart-decrease,.cart-count,.cart-add{
            display:inline-block;
            padding:6px;
        }
        .cart-count{
            font-size:26px;
            margin-right:10px;
        }
        .cart-decrease{
            color:#fff;
            animation:myfirst 1.5s;
            .inner{
                line-height:26px;
                background:rgb(25, 137, 250);
                font-size:26px;
                padding:6px;
                border-radius:50%;
            }
        }
        .cart-add{

            color:#fff;
            background:rgb(25, 137, 250);
            font-size:26px;
            border-radius:50%;
        }
    }
    
</style>