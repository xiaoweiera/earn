<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";
import { languageKey } from "src/config/";
import { Model } from "src/logic/home";
import { lazyLoad } from "src/plugins/lazyload/";
// import DAppHomeAirdrop from "src/pages/dapp/homeairdrop.vue";
const DAppHomeAirdrop = lazyLoad(() => import("src/pages/dapp/homeairdrop.vue"));
// import DAppHomeDiscover from "src/pages/dapp/homediscover.vue";
const DAppHomeDiscover = lazyLoad(() => import("src/pages/dapp/homediscover.vue"));
// import DAppHomeDiscoverEnd from "src/pages/dapp/homediscoverend.vue";
const DAppHomeDiscoverEnd = lazyLoad(() => import("src/pages/dapp/homediscoverend.vue"));
// import DAppHomeNft from "src/pages/dapp/homenft.vue";
const DAppHomeNft = lazyLoad(() => import("src/pages/dapp/homenft.vue"));
// import DAppHomeResearch from "src/pages/home/research.vue";
const DAppHomeResearch = lazyLoad(() => import("src/pages/home/research.vue"));
import type { summaryModel } from "src/types/home";
import { Language } from "src/types/language/";
import { getValue } from "src/utils/root/data";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import { stateAlias, useReactiveProvide } from "src/utils/use/state";
import { onMounted } from "vue";
// import HomeAd from "./ad.vue";
const HomeAd = lazyLoad(() => import("./ad.vue"));
// import HomeCompany from "./company.vue";
const HomeCompany = lazyLoad(() => import("./company.vue"));
import HomeHeader from "./header.vue";
// import Quota from "./quota/index.vue";
const Quota = lazyLoad(() => import("./quota/index.vue"));
import HomeRecommend from "./recommend.vue";
import HomeTopic from "./topic.vue";
import HomeTrends from "./trends.vue";

useReactiveProvide(stateAlias.ui.tab);

const isShowQuota = function () {
  const query = getValue<object>("query", {});
  const value = safeGet<Language>(query, languageKey) || Language.en;
  return value === Language.cn;
};

const summary = createReactive<summaryModel>(alias.dApp.summary.list, {} as summaryModel);
onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadReactive(summary, () => api.getSummary());
});
</script>
<template>
  <div class="top home-container">
    <div class="home-content">
      <!--      顶部信息-->
      <HomeHeader v-if="summary" :data="summary" />
      <!--            话题切换-->
      <HomeTopic class="mt-6" />
      <!--            趋势-->
      <HomeTrends class="mt-4" />
      <!--            topic推荐-->
      <HomeRecommend class="mt-6" />
      <!--      广告位-->
      <HomeAd class="mt-4 md:mt-6" :position="21" />
      <!--指标-->
      <Quota v-if="isShowQuota()" class="mt-15" />
      <!--  nft模块  -->
      <DAppHomeNft v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      <!-- 研究文章-->
      <DAppHomeResearch class="mt-11 md:mt-17.5" />
      <DAppHomeDiscover v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      <!--      项目方-->
      <HomeCompany class="mt-6" />
      <!-- Airdrops-->
      <DAppHomeAirdrop class="mt-11 md:mt-17.5" />
      <DAppHomeDiscoverEnd v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      <!-- 投融资项目 -->
      <!--      <HomeInvest class="mt-11 md:mt-17.5"/>-->
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/styles/function";
.home-container {
  @apply min-h-164 pt-3 md:pt-5 md:pb-16 pb-7;
}
.home-content {
  @apply md:max-w-360 md:px-22.5 px-3 mx-auto;
}
.top {
  background-color: #e5e5e51a;
  background-image: cdn("/dapp/homebeijing.jpeg");
  background-size: 100% 652px;
  background-repeat: no-repeat;
}
</style>
