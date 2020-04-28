<template>
  <div class="index-wapper">
    <router-view></router-view>
    <tar-bar :route="true"></tar-bar>
  </div>
</template>

<script>
import tarBar from "../../components/tarBar/tarBar.vue";

export default {
  components: {
    tarBar
  }
};
</script>

<style>
</style>