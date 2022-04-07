<script lang="ts" setup>
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import * as echarts from "echarts";
import { graphic } from "src/logic/ui/echart/option";
import { makeChart, getGrid } from "src/logic/ui/echart/";
import { chartProps } from "src/logic/ui/echart/props";
import { getCurrentInstance, onMounted } from "vue";

const props = defineProps(chartProps());

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

const getOption = function (dom: HTMLElement) {
  const legend = chart.getLegend(props.legend);
  const list = safeGet<object[]>(legend, "data") || [];
  return {
    legend,
    tooltip: chart.getTooltip(),
    series: chart.getSeriesList(),
    xAxis: chart.getXAxis(props.direction),
    yAxis: chart.getYAxis(),
    // 背景
    graphic: graphic(30),
    backgroundColor: props.bgColor,
    // 布局
    grid: getGrid(props.legend, dom, list, props.grid),
  };
};

const init = async function () {
  const chart = getChart();
  if (chart) {
    const value = getOption(chart.getDom());
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
