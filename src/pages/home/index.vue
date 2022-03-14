<script lang="ts" setup>
import DAppHomeDiscover from "src/pages/dapp/homediscover.vue";
import DAppHomeNft from "src/pages/dapp/homenft.vue";
import DAppHomeDiscoverEnd from "src/pages/dapp/homediscoverend.vue";
import DAppHomeResearch from "src/pages/blog/homeresearch.vue";
import { onMounted } from "vue";
import { Model } from "src/logic/home";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { summaryModel } from "src/types/home";
import { stateAlias, useReactiveProvide } from "src/utils/use/state";
import HomeCompany from "./company.vue";
import HomeRecommend from "./recommend.vue";
import HomeTrends from "./trends.vue";
import HomeTopic from "./topic.vue";
import HomeHeader from "./header.vue";

useReactiveProvide(stateAlias.ui.tab);

const summary = createReactive<summaryModel>(alias.dApp.summary.list, {} as summaryModel);
onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadReactive(summary, () => api.getSummary());
});

</script>
<template>
  <div class="top  min-h-164 pt-3 md:pt-6 md:pb-16 pb-7">
    <div class="md:max-w-360 md:px-22.5 px-3  mx-auto">
      <!--      顶部信息-->
      <HomeHeader v-if="summary" :data="summary" />
      <!--            话题切换-->
      <HomeTopic class="mt-6 md:mt-9" />
      <!--            趋势-->
      <HomeTrends class="mt-6" />
      <!--            topic推荐-->
      <HomeRecommend class="mt-6" />
      <!--  nft模块  -->
      <DAppHomeNft v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      <!-- 研究文章-->
      <DAppHomeResearch class="mt-11 md:mt-17.5"/>
      <DAppHomeDiscover v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
      <!--      项目方-->
      <HomeCompany class="mt-6" />
      <DAppHomeDiscoverEnd v-if="summary" :summary="summary" class="mt-11 md:mt-17.5" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/styles/function";

.top {
  background-color: #e5e5e51a;
  background-image: cdn("/dapp/homebeijing.jpeg");
  background-size: 100% 652px;
  background-repeat: no-repeat;
}
</style>
