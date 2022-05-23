<script lang="ts" setup>
import NewsQuotaTrends from "./trends.vue";
import { indicatorTypes } from "src/types/quota/";
import OnFollow from "src/pages/quota/follow/on.vue";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="quota-content relative rounded-lg bg-white">
    <!-- 显示趋势图 -->
    <div v-if="data.trends" class="absolute left-0 top-0 right-0 bottom-0">
      <NewsQuotaTrends :data="data" />
    </div>
    <div class="h-40 relative z-2">
      <div class="absolute left-0 top-4 right-0 px-4">
        <h3 class="text-16-24 font-m text-global-highTitle">{{ data.name }}</h3>
        <p v-if="!data.trends" class="text-14-18 text-global-highTitle text-opacity-45 line-clamp-2 mt-2">{{ data.desc }}</p>
      </div>
      <div class="absolute bottom-4 right-4">
        <OnFollow :id="data.id" v-model:status="data.followed" :type="indicatorTypes.news" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quota-content {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
}
</style>
