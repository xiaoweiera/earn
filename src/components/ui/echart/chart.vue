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
import { Direction, LegendItem } from "src/types/echarts/type";
import safeSet from "@fengqiaogang/safe-set";

const emitEvent = defineEmits(["load"]);

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

  const series = chart.getSeriesList();

  const xAxis = chart.getXAxis(props.direction);
  const yAxis = chart.getYAxis(series, props);

  const opt = {
    legend,
    series,
    tooltip: chart.getTooltip(),
    // 背景
    graphic: graphic(30),
    backgroundColor: props.bgColor,
    // 布局
    grid: getGrid(props.legend, dom, list, props.grid),
  };

  // 垂直方向
  if (Direction.vertical === props.direction) {
    safeSet(opt, "xAxis", yAxis);
    safeSet(opt, "yAxis", xAxis);
  } else {
    safeSet(opt, "xAxis", xAxis);
    safeSet(opt, "yAxis", yAxis);
  }
  return opt;
};

const init = async function () {
  const chart = getChart();
  if (chart) {
    const value = getOption(chart.getDom());
    if (props.custom) {
      const opt = await Promise.resolve(props.custom<object>(value));
      if (opt) {
        chart.setOption({ ...opt });
      } else {
        chart.setOption(value);
      }
    } else {
      chart.setOption(value);
    }
  }
  emitEvent("load");
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
