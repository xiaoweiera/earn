<script setup lang="ts">
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { onMounted } from "vue";
import { Model } from "src/logic/home";
import { getParam } from "src/utils/router";
import { getSaveNumber } from "src/lib/tool";

const top3: any = createRef("API.home.getTop3", []);
onMounted(() => {
  // 得到数据汇总
  onLoadRef(top3, () => {
    const id = getParam<string>("id");
    const api = new Model();
    return api.getTop3(id);
  });
});
</script>
<template>
  <div class="w-full bg-global-topBg h-37.5 p-3 font-kdFang rounded-kd8px">
    <div class="flex">
      <IconFont size="16" type="icon-hot" />
      <span class="ml-1.5 text-kd14px18px font-medium font-kdFang text-global-highTitle">Tag Top 3</span>
    </div>
    <template v-for="item in top3">
      <div class="flex items-center justify-between mt-3 h-6">
        <div class="flex items-center">
          <ui-image class="w-6 h-6" :src="item.logo" />
          <span class="text-kd14px18px ml-1.5 font-medium text-global-highTitle text-opacity-85 max-w-23 short">{{ item.name }}</span>
          <span class="text-kd12px16px ml-1.5 text-global-highTitle text-opacity-45 max-w-15 short">{{ item.symbol }}</span>
        </div>
        <div class="flex items-center">
          <IconFont size="16" type="icon-star" />
          <span class="ml-1 text-kd14px16px text-number text-global-highTitle">{{ item.overall_score?getSaveNumber(item.overall_score,1):0 }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
