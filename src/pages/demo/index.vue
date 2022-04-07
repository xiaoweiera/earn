<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */

import { onMounted } from "vue";
import * as console from "src/plugins/log/";
import { Position } from "src/types/echarts/type";
import type { EchartData } from "src/types/echarts/type";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";

const name = "api.apy.getHecoTrends";
const echart = createReactive<EchartData>(name, {} as EchartData);

const onCustom = function (data: object) {
  console.log(data);
  return data;
};
onMounted(function () {
  return onLoadReactive(echart, name);
});
</script>

<template>
  <div class="p-10">
    <div v-if="echart.legends" class="w-200 h-100 mx-auto">
      <ui-echart :custom="onCustom" class="h-full">
        <!--提示框-->
        <ui-echart-tooltip />
        <!--x轴数据-->
        <ui-echart-xaxis :value="echart.xAxis" />
        <!--Y轴数据-->
        <ui-echart-yaxis :index="0" :unit="echart.yAxis.left" />
        <ui-echart-yaxis :index="1" :unit="echart.yAxis.right" :position="Position.right" />
        <!--图表数据-->
        <template v-for="(data, index) in echart.legends" :key="index">
          <ui-echart-legend :index="index" :position="data.kline ? Position.right : Position.left" :value="data.name" :type="data.type" :color="data.color" />
          <ui-echart-series :index="index" :value="echart.series[index]" />
        </template>
      </ui-echart>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
