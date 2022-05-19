<script setup lang="ts">
/**
 * @file 柱状图
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted, PropType, reactive } from "vue";
import { onUpdateReactive } from "src/utils/ssr/ref";
import type { SeriesType } from "src/types/echarts/type";
import type { EchartData } from "src/types/echarts/type";

defineProps({
  type: {
    required: true,
    type: String as PropType<SeriesType>,
  },
  name: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});

const chart = reactive<EchartData>({} as EchartData);
const onUpdate = onUpdateReactive(chart, async function () {
  const api = new API();
  return api.apy.getHecoTrends();
});

onMounted(onUpdate);
</script>

<template>
  <div>
    <client-only v-if="chart.key" class="w-full h-full">
      <ui-echart-small :type="type" :data="chart" class="h-full" />
    </client-only>
  </div>
</template>
