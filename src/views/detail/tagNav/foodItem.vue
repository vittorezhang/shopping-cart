<template>
  <div class="food-data-box">
    <div class="title-box">
      <span class="title">{{itemObj.name}}</span>
      <span class="desc">{{itemObj.description}}</span>
    </div>
    <item-car v-for="items in itemObj.foods" :key="items._id" :items="items" :itemObj="itemObj"></item-car>  
  </div>
</template>

<script>
import itemCar from "./foodCar";


export default {
  components:{
    itemCar
  },
  props: {
    itemObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  
};
</script>
 
<style lang="less" scoped>

.food-data-box {
  display: flex;
  flex-direction: column;
  .title-box {
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    .title {
      font-weight: 800;
      color: #777;
    }
    .desc {
      margin-left: 20px;
      font-size: 12px;
      color: #999;
    }
  }

}
</style>