<script lang="ts" setup>
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */

import * as echarts from "echarts";
import { Callback } from "src/types/common";
import { getCurrentInstance, onMounted, PropType, toRaw } from "vue";
import { makeChart } from "src/logic/ui/echart/index";

const props = defineProps({
  custom: {
    type: Function as PropType<Callback>,
    default: null,
  },
});

const instance = getCurrentInstance();

const chart = makeChart();

const getChart = function () {
  const vNode = instance?.vnode;
  if (vNode) {
    const dom: HTMLDivElement = vNode.el as any;
    const container = dom.querySelector(".j-echarts");
    if (container) {
      return echarts.init(container as HTMLElement);
    }
  }
  return null;
};

const getOption = function () {
  return {
    tooltip: chart.getTooltip(),
    legend: chart.getLegend(),
    series: chart.getSeriesList(),
    xAxis: chart.getXAxis(),
    yAxis: chart.getYAxis(),
  };
};

const init = async function () {
  const chart = getChart();
  if (chart) {
    const value = getOption();
    if (props.custom) {
      const opt = await Promise.resolve(props.custom<object>(value));
      if (opt) {
        return chart.setOption({ ...opt });
      }
    }
    chart.setOption(value);
  }
};

onMounted(function () {
  setTimeout(init);
});
</script>

<template>
  <div>
    <div class="h-full j-echarts"></div>
  </div>
</template>
