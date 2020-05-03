<template>
  <div class="start-wapper">
    <!-- -->
    <div class="start" :style="`background-position-x:${((startLength-100)*0.1)}vw`">
      <div class="tempStart"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      startLength: 0,
      startArr: []
    };
  },
  created() {
    //获取星星数
    // 4 7  -> 94
    this.startLength = this.startNum * 2 * 10;
    // console.log(this.startLength);

    // this.setStartArr(this.startNum);
  }
  //   methods: {
  //     setStartArr(startNum) {
  //       for (let num = 0; num < Math.ceil(startNum); num++) {
  //         startNum - num > 1
  //           ? this.startArr.push(1)
  //           : this.startArr.push(
  //               Number((startNum - Math.floor(startNum)).toFixed(1))
  //             );
  //       }
  //     }
  //   }
};
</script>

<style lang="less" scoped>
.start-wapper {
  width: 100%;
  height: 100%;
  background: url("../../assets/gray.png") 0 0 no-repeat;
  background-size: contain;
  .tempStart {
    height: 100%;
    width: 100%;
    background: url("../../assets/tempstart.png") 0 0 no-repeat;
    background-size: contain;
  }
  .start {
    height: 100%;
    width: 100%;
    background: url("../../assets/yellow.png") 0 0 no-repeat;
    background-size: contain;
    // border:1px solid red;/*no */
  }
}
</style>