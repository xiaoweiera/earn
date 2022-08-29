<script setup lang="ts">

import { useRoute } from "vue-router";
import Header from "./header.vue";
import Footer from "./footer.vue";
const $route = useRoute();

</script>
<template>
  <div class="bg-global-hei">
    <div class="layout">
      <!--导航-->
      <Header/>
      <!--    <Header :headers="headerList" />-->
      <!--content-->
      <div class="main">
        <!--全局消息-->
        <div class="clearfix">
          <div class="router-view">
            <router-view />
          </div>
        </div>
      </div>
      <!--底部-->
      <Footer  class="mt-15"/>
    </div>

  </div>
</template>

<style scoped lang="scss">
.layout{
  background-image: url("./public/images/earn/bg.png");
  background-size: 100% 800px;
  background-repeat: no-repeat;
}
</style>
