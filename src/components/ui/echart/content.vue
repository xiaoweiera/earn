<script setup lang="ts">
/**
 * @file 图表
 * @auth svon.me@gmail.com
 */

import type { PropType } from "vue";
import type { Callback } from "src/types/common";
import type { EchartData } from "src/types/echarts/type";
import { Position } from "src/types/echarts/type";

defineProps({
  data: {
    required: true,
    type: Object as PropType<EchartData>,
  },
  custom: {
    type: Function as PropType<Callback>,
    default: null,
  },
});
</script>

<template>
  <ui-echart :custom="custom">
    <!--提示框-->
    <ui-echart-tooltip />
    <!--x轴数据-->
    <ui-echart-xaxis :value="data.xAxis" />
    <!--Y轴数据-->
    <ui-echart-yaxis :index="0" :unit="data.yAxis.left" />
    <ui-echart-yaxis :index="1" :unit="data.yAxis.right" :position="Position.right" />
    <!--图表数据-->
    <template v-for="(legend, index) in data.legends" :key="index">
      <ui-echart-legend :index="index" :position="legend.kline ? Position.right : Position.left" :value="legend.name" :type="legend.type" :color="legend.color" />
      <ui-echart-series :index="index" :value="data.series[index]" />
    </template>
  </ui-echart>
</template>
