<script lang="ts" setup>
import { Model } from "src/logic/home";
import * as track from "src/logic/track";
import { asyncLoad } from "src/plugins/lazyload/";
import type { summaryModel } from "src/types/home";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import { stateAlias, useReactiveProvide } from "src/utils/use/state";
import { onMounted } from "vue";
import HomeHeader from "./header.vue";
import HomeRecommend from "./recommend.vue";
import HomeTopic from "./topic.vue";
import HomeTrends from "./trends.vue";
import Trend from "./new/data/trend.vue";

const DAppHomeAirdrop = asyncLoad(() => import("src/pages/home/airdrop/index.vue"));
const DAppHomeDiscover = asyncLoad(() => import("src/pages/dapp/homediscover.vue"));
const DAppHomeDiscoverEnd = asyncLoad(() => import("src/pages/dapp/homediscoverend.vue"));
const DAppHomeNft = asyncLoad(() => import("src/pages/dapp/homenft.vue"));
const DAppHomeResearch = asyncLoad(() => import("src/pages/home/research.vue"));
const HomeAd = asyncLoad(() => import("./ad.vue"));
const HomeCompany = asyncLoad(() => import("./company.vue"));
const Quota = asyncLoad(() => import("./quota/index.vue"));
const HomeInvest = asyncLoad(() => import("src/pages/home/invest.vue"));

const newAd = asyncLoad(() => import("src/pages/home/new/ad.vue"));
const chartData = asyncLoad(() => import("src/pages/home/new/data/index.vue"));
const hotProject = asyncLoad(() => import("src/pages/home/new/hot.vue"));
const newTopic = asyncLoad(() => import("src/pages/home/new/topic/index.vue"));

useReactiveProvide(stateAlias.ui.tab);

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
      <div class="flex">
        <newAd class="mr-6" :position="25" />
        <div class="w-127.75">
          <div class="w-full h-54.5">
            <chartData class="w-full h-full" />
          </div>
          <div class="w-full h-30 mt-6">
            <Trend />
          </div>
        </div>
      </div>
      <hotProject class="mt-6 mb-12" />
      <newTopic class="mt-6" />
      <HomeTopic />
      <!--      &lt;!&ndash;      顶部信息&ndash;&gt;-->
      <!--      <HomeHeader v-if="summary" :data="summary" />-->
      <!--      &lt;!&ndash;            话题切换&ndash;&gt;-->
      <!--      <HomeTopic class="mt-6" />-->
      <!--      &lt;!&ndash;            趋势&ndash;&gt;-->
      <!--      <HomeTrends class="mt-4" />-->
      <!--      &lt;!&ndash;            topic推荐&ndash;&gt;-->
      <!--      <HomeRecommend class="mt-6" />-->
      <!--      &lt;!&ndash;      广告位&ndash;&gt;-->
      <!--      <lazy-load>-->
      <!--        <HomeAd :position="21" class="mt-4 md:mt-6" />-->
      <!--      </lazy-load>-->
      <!--      &lt;!&ndash;指标&ndash;&gt;-->
      <!--      <lazy-load>-->
      <!--        <Quota class="mt-15" />-->
      <!--      </lazy-load>-->
      <!--      &lt;!&ndash; Airdrops&ndash;&gt;-->
      <!--      <lazy-load>-->
      <!--        <DAppHomeAirdrop class="mt-11 md:mt-17.5" />-->
      <!--      </lazy-load>-->
      <!--      &lt;!&ndash;  nft模块  &ndash;&gt;-->
      <!--      <lazy-load>-->
      <!--        <DAppHomeNft v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />-->
      <!--      </lazy-load>-->
      <!--      &lt;!&ndash; 投融资项目 &ndash;&gt;-->
      <!--      <lazy-load>-->
      <!--        <HomeInvest class="mt-11 md:mt-17.5" />-->
      <!--      </lazy-load>-->
      <!--      &lt;!&ndash; 研究文章&ndash;&gt;-->
      <!--      <lazy-load>-->
      <!--        <DAppHomeResearch class="mt-11 md:mt-17.5" />-->
      <!--      </lazy-load>-->
      <!--      <lazy-load>-->
      <!--        <DAppHomeDiscover v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />-->
      <!--      </lazy-load>-->
      <!--      &lt;!&ndash;      项目方&ndash;&gt;-->
      <!--      <lazy-load>-->
      <!--        <HomeCompany class="mt-6" />-->
      <!--      </lazy-load>-->
      <!--      <lazy-load>-->
      <!--        <DAppHomeDiscoverEnd v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />-->
      <!--      </lazy-load>-->
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
  background-size: 100% 577px;
  background-repeat: no-repeat;
}
</style>
