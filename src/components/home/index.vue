<script setup lang="ts">
import {ref} from 'vue'
</script>
<template>
  <div class="top min-h-164 px-22.5  pt-6 ">
    <HomeHeader class=""/>
    <HomeTopic class="mt-9"/>
    <HomeTrends class="mt-6"/>
    <HomeRecommend class="mt-6"/>
    <HomeCompany class="mt-6"/>

  </div>
</template>
<style scoped lang="scss">
.top{
  background-image:url("#{$g-url}/dapp/dappsBg.jpg");
  background-size: 100% 652px;
  background-repeat: no-repeat;
}
</style>