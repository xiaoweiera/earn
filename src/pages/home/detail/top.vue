<script setup lang="ts">
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { onMounted } from "vue";
import { Model } from "src/logic/home";
import { getValue } from "src/utils/root/data";
import { getSaveNumber } from "src/lib/tool";

const top3: any = createRef<object[]>("API.home.getTop3", []);
onMounted(() => {
  // 得到数据汇总
  onLoadRef<object[]>(top3, () => {
    const id: string = getValue("query.id");
    const api = new Model();
    return api.getTop3<object[]>(id);
  });
});
</script>
<template>
  <div v-if="top3 && top3.length > 0" class="max-fit bg-global-topBg h-37.5 p-3 md:ml-12 font-kdFang rounded-kd8px">
    <div class="flex">
      <IconFont size="16" type="icon-hot" />
      <span class="ml-1.5 text-kd14px18px font-medium font-kdFang text-global-highTitle">Tag Top 3</span>
    </div>
    <template v-for="(item, index) in top3.slice(0, 3)" :key="index">
      <div class="flex items-center justify-between mt-3 h-6">
        <div class="flex items-center">
          <ui-image class="w-6 h-6 max-w-6 max-h-6 min-w-6 min-h-6 text-kd12px16px" rounded :title="item.name" :src="item.logo" />
          <span class="text-kd14px18px ml-1.5 font-medium text-global-highTitle text-opacity-85 max-w-23 short">{{ item.name }}</span>
          <span class="text-kd12px16px ml-1.5 text-global-highTitle text-opacity-45 max-w-15 short">{{ item.description }}</span>
        </div>
        <div class="flex items-center">
          <IconFont size="16" type="icon-star" />
          <span class="ml-1 text-kd14px16px text-number text-global-highTitle">{{ item.score ? getSaveNumber(item.score, 1) : 0 }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
