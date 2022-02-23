<script lang="ts" setup>
import HomeHeader from "./header.vue";
import HomeTopic from "./topic.vue";
import HomeTrends from "./trends.vue";
import HomeRecommend from "./recommend.vue";
import HomeCompany from "./company.vue";
//@ts-ignore
import DappHomediscover from "src/pages/dapp/homediscover"
//@ts-ignore
import DappHomenft from "src/pages/dapp/homenft.vue"
//@ts-ignore
import DappHomediscoverend from "src/pages/dapp/homediscoverend"
import {onMounted} from 'vue'
import {Model} from "~/logic/home";
import {createReactive, onLoadReactive} from "~/utils/ssr/ref";
import {summaryModel} from "~/types/home";

const summary = createReactive<summaryModel>("API.home.getSummary", {} as summaryModel);
onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadReactive(summary, () => api.getSummary());
});
</script>
<template>
  <div class="top  min-h-164  pt-6 ">
    <div class="max-w-360 px-22.5   mx-auto">
      <HomeHeader :data="summary"/>
      <HomeTopic class="mt-9"/>
      <HomeTrends class="mt-6"/>
      <HomeRecommend class="mt-6"/>
      <DappHomediscover class="mt-16.5" :summary="summary"/>
      <HomeCompany class="mt-6"/>
      <DappHomenft class="mt-16.5"/>
      <DappHomediscoverend class="mt-16.5"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/styles/function";

.top {
  background: #e5e5e51a;
  background-image: cdn("/dapp/dappsBg.jpg");
  background-size: 100% 652px;
  background-repeat: no-repeat;
}
</style>
