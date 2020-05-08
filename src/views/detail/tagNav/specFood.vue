<template>
  <van-dialog  :title="itemObj.name" show-cancel-button>
    <div>规格</div>
    <van-tag
      class="specFood"
      v-for="tagsName in itemObj.specfoods"
      @click="tagsHandle"
      :key="tagsName._id"
      plain
    >{{tagsName.specs_name}}</van-tag>
    <div class="price">&yen;</div>
  </van-dialog>
</template>

<script>
export default {
  props: {
    itemObj: {
      type: Object,
      default() {
        return {};
      },
    
      price:0,
    }
    
  },
  data(){
   return{
    //    show:false,
   } 
  },
  methods:{
      tagsHandle(){

      },
  }
};
</script>

<style>
</style>