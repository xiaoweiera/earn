<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted, reactive } from "vue";
import { onUpdateReactive } from "src/utils/ssr/ref";
import type { EchartData, LegendItem } from "src/types/echarts/type";

const chart = reactive<EchartData>({} as EchartData);

const onUpdateChartData = onUpdateReactive(chart, async function () {
  const api = new API();
  return api.apy.getHecoTrends();
});
onMounted(function () {
  onUpdateChartData();
});
</script>

<template>
  <div class="p-4 md:p-10">
    <div class="flex">
      <div v-if="chart.key" class="h-6 w-30 border border-black">
        <ui-echart-small :data="chart" class="h-full" />
      </div>
      <!--      <div v-if="chart.key" class="h-6 w-30 ml-5">-->
      <!--        <ui-echart-small :data="setBar(chart)" class="h-full" />-->
      <!--      </div>-->
    </div>
    <!--    <div class="mt-2">-->
    <!--      <div v-if="chart.key" class="w-100 h-80 border border-black">-->
    <!--        <ui-echart-content :data="chart" class="h-full" />-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
