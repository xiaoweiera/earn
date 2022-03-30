<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";
import { languageKey } from "src/config/";
import { Model } from "src/logic/home";
import * as track from "src/logic/track";
import { asyncLoad } from "src/plugins/lazyload/";
import type { summaryModel } from "src/types/home";
import { Language } from "src/types/language/";
import { getValue } from "src/utils/root/data";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import { stateAlias, useReactiveProvide } from "src/utils/use/state";
import { onMounted } from "vue";
import HomeHeader from "./header.vue";
import HomeRecommend from "./recommend.vue";
import HomeTopic from "./topic.vue";
import HomeTrends from "./trends.vue";
// import HomeInvest from "./invest.vue";

const DAppHomeAirdrop = asyncLoad(() => import("src/pages/dapp/homeairdrop.vue"));
const DAppHomeDiscover = asyncLoad(() => import("src/pages/dapp/homediscover.vue"));
const DAppHomeDiscoverEnd = asyncLoad(() => import("src/pages/dapp/homediscoverend.vue"));
const DAppHomeNft = asyncLoad(() => import("src/pages/dapp/homenft.vue"));
const DAppHomeResearch = asyncLoad(() => import("src/pages/home/research.vue"));
const HomeAd = asyncLoad(() => import("./ad.vue"));
const HomeCompany = asyncLoad(() => import("./company.vue"));
const Quota = asyncLoad(() => import("./quota/index.vue"));

useReactiveProvide(stateAlias.ui.tab);

const isShowQuota = function () {
  const query = getValue<object>("query", {});
  const value = safeGet<Language>(query, languageKey) || Language.en;
  return value === Language.cn;
};

const summary = createReactive<summaryModel>(alias.dApp.summary.list, {} as summaryModel);
onMounted(() => {
  // 上报数据
  track.push(track.Origin.gio, track.event.home);

  // 得到数据汇总
  onLoadReactive(summary, function () {
    const api = new Model();
    return api.getSummary();
  });
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
      <lazy-load>
        <HomeAd :position="21" class="mt-4 md:mt-6" />
      </lazy-load>
      <!--指标-->
      <lazy-load>
        <Quota v-if="isShowQuota()" class="mt-15" />
      </lazy-load>
      <!--  nft模块  -->
      <lazy-load>
        <DAppHomeNft v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      </lazy-load>
      <!-- 研究文章-->
      <lazy-load>
        <DAppHomeResearch class="mt-11 md:mt-17.5" />
      </lazy-load>
      <lazy-load>
        <DAppHomeDiscover v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      </lazy-load>
      <!--      项目方-->
      <lazy-load>
        <HomeCompany class="mt-6" />
      </lazy-load>
      <!-- Airdrops-->
      <lazy-load>
        <DAppHomeAirdrop class="mt-11 md:mt-17.5" />
      </lazy-load>
      <lazy-load>
        <DAppHomeDiscoverEnd v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      </lazy-load>
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
