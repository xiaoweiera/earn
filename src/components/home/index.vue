<script setup lang="ts">
import {ref} from 'vue'

</script>
<template>
  <div class="top   min-h-164  pt-6 ">
    <div class="max-w-360 px-22.5   mx-auto">
      <HomeHeader class=""/>
      <HomeTopic class="mt-9"/>
      <HomeTrends class="mt-6"/>
      <HomeRecommend class="mt-6"/>
      <DappHomediscover class="mt-16.5"/>
      <HomeCompany class="mt-6"/>
      <DappHomenft class="mt-16.5"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "src/styles/function";
.top{
  background-image:cdn("/dapp/dappsBg.jpg");
  background-size: 100% 652px;
  background-repeat: no-repeat;
}
</style>