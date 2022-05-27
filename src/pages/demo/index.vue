<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted, reactive } from "vue";
import { onUpdateReactive } from "src/utils/ssr/ref";
import type { EchartData } from "src/types/echarts/type";
import { TimeUnit } from "src/types/echarts/data";

const chart = reactive<EchartData>({} as EchartData);

const onUpdateChartData = onUpdateReactive(chart, async function () {
  const api = new API();
  const query = {
    id: 3321,
    timeUnit: TimeUnit.hour,
    start: "2022-05-20",
    end: "2022-05-28",
    type: ["tvl", "price"],
  };
  // 第一个参数：查询参数
  // 第二个参数: 项目类型 [dapp / nft] 【可为空】
  // 第三个参数: 公链 【可为空】
  return api.chart.dapp(query, "dapp", ["eth"]);
});
onMounted(function () {
  onUpdateChartData();
});
</script>

<template>
  <div class="p-4 md:p-10">
    <div v-if="chart.key" class="w-200 h-150">
      <ui-echart-content class="h-full" :data="chart" />
    </div>
  </div>
</template>
