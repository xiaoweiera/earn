<script setup lang="ts">
import { PropType } from "vue";
import type { Data } from "src/types/quota/";
import { toNumberCash } from "src/utils";

defineProps({
  data: {
    type: Object as PropType<Data>,
    required: true,
  },
});
</script>

<template>
  <div class="content-wrap p-4">
    <div class="flex justify-between items-center">
      <!-- 标题 -->
      <div>
        <h3 class="text-24 text-global-highTitle">{{ data.chart.name }}</h3>
      </div>
    </div>
    <div class="mt-3 flex items-center text-global-highTitle text-opacity-65">
      <IconFont type="icon-users" size="16" />
      <span class="ml-1 text-12-16">{{ toNumberCash(data.chart.follow_count) }}人关注</span>
      <IconFont class="ml-3" type="icon-view" size="16" />
      <span class="ml-1 text-12-16">{{ toNumberCash(data.chart.view_count) }}</span>
    </div>
    <div v-if="data.chart.desc" class="mt-3">
      <div class="pt-3 border-t border-dashed border-global-highTitle border-opacity-10">
        <h4 class="text-12-16 text-global-highTitle">指标解释</h4>
        <div class="mt-1 text-12-16 text-global-highTitle text-opacity-65">
          <div class="whitespace-pre-wrap" v-html="data.chart.desc"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-wrap {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
}
</style>
