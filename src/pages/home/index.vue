<script lang="ts" setup>
import * as track from "src/logic/track";
import { asyncLoad } from "src/plugins/lazyload/";
import { stateAlias, useReactiveProvide } from "src/utils/use/state";
import { onMounted } from "vue";

const newAd = asyncLoad(() => import("src/pages/home/new/ad.vue"));
const chartData = asyncLoad(() => import("src/pages/home/new/data/index.vue"));
const hotProject = asyncLoad(() => import("src/pages/home/new/hot.vue"));
const newTopic = asyncLoad(() => import("src/pages/home/new/topic/index.vue"));
const Apy = asyncLoad(() => import("src/pages/home/apy/index.vue"));
const Quota = asyncLoad(() => import("./quota/index.vue"));

useReactiveProvide(stateAlias.ui.tab);

onMounted(() => {
  // 上报数据
  track.push(track.Origin.gio, track.event.home);
});
</script>
<template>
  <div>
    <div class="top md:h-123.75">
      <div class="home-content pt-3">
        <div class="md:flex items-center">
          <newAd class="md:mr-6" :position="25" />
          <div class="w-full mt-4 md:mt-0 md:w-127.75 md:h-70 h-full">
            <div class="w-full h-full">
              <chartData class="w-full h-full" />
            </div>
          </div>
        </div>
        <hotProject class="mt-4 md:mt-6" />
      </div>
    </div>
    <div class="topic-container pb-6 pt-6 md:pb-11">
      <div class="topic-content">
        <newTopic />
      </div>
    </div>
    <lazy-load>
      <div class="apy-content">
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
.topic-container {
  background: rgba(248, 250, 250, 1);
}
.topic-content {
  background: rgba(248, 250, 250, 1);
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
  background-image: cdn("/common/homeDefault.jpg");
  background-size: 100% 495px;
  background-repeat: no-repeat;
}
</style>
