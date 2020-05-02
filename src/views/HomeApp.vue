<template>
<div>
    <Head></Head>
    <router-view></router-view>
    <Footer></Footer>
</div>
</template>

<script>
import Head from '../components/Head';
import Footer from '../components/Footer';
import { getList, getGoods } from "../request/Api.js";
export default {
  components:{
    Head:Head,
    Footer:Footer
  },
};
</script>


<style lang="less" scope>
</style>