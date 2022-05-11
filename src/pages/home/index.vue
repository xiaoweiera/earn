<script lang="ts" setup>
import { Model } from "src/logic/home";
import * as track from "src/logic/track";
import { asyncLoad } from "src/plugins/lazyload/";
import type { summaryModel } from "src/types/home";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import { stateAlias, useReactiveProvide } from "src/utils/use/state";
import { onMounted } from "vue";
import Trend from "./new/data/trend.vue";

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
  <div>
    <div class="top">
      <div class="home-content">
        <div class="flex items-center">
          <newAd class="mr-6" :position="25" />
          <div class="w-full md:w-127.75">
            <div class="w-full h-54.5">
              <chartData class="w-full h-full" />
            </div>
            <div class="w-full h-30 mt-6">
              <Trend />
            </div>
          </div>
        </div>
        <hotProject class="mt-6" />
      </div>
    </div>
    <div class="home-content mt-6">
      <newTopic />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "src/styles/function";

.home-content {
  @apply md:max-w-360 h-144.25 md:px-22.5 px-3 mx-auto;
}

.top {
  background-image: cdn("/dapp/homebeijing.jpeg");
  background-size: 100% 577px;
  background-repeat: no-repeat;
}
</style>
