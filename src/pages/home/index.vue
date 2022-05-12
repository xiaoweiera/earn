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
const Apy = asyncLoad(() => import("src/pages/home/apy/index.vue"));
const Quota = asyncLoad(() => import("./quota/index.vue"));

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
    <div class="top md:h-123.75">
      <div class="home-content pt-3">
        <div class="md:flex items-center">
          <newAd class="md:mr-6" :position="25" />
          <div class="w-full mt-4 md:mt-0 md:w-127.75">
            <div class="w-full">
              <chartData class="w-full h-full" />
            </div>
            <div class="w-full h-22.5 mt-4 md:mt-6">
              <Trend class="h-full" />
            </div>
          </div>
        </div>
        <hotProject class="mt-4 md:mt-6" />
      </div>
    </div>
    <div class="topic-content mt-6">
      <newTopic />
    </div>
    <lazy-load>
      <div class="apy-content mt-11">
        <Apy />
      </div>
    </lazy-load>
    <!--指标-->
    <lazy-load>
      <div class="quota">
        <div class="quota-content">
          <Quota />
        </div>
      </div>
    </lazy-load>
  </div>
</template>
<style lang="scss" scoped>
@import "src/styles/function";

.home-content {
  @apply md:max-w-360  md:px-22.5 px-3 mx-auto;
}
.topic-content {
  @apply md:max-w-360 md:px-22.5 px-3 mx-auto;
}
.apy-content {
  @apply md:max-w-360 md:px-22.5 px-3 md:py-11 py-6 mx-auto;
}
.quota {
  background: #f8fafa;
  @apply md:py-11 py-6;
}
.quota-content {
  @apply md:max-w-360 md:px-22.5 px-3 mx-auto;
}
.top {
  background-image: cdn("/dapp/homebeijing.jpeg");
  background-size: 100% 495px;
  background-repeat: no-repeat;
}
</style>
