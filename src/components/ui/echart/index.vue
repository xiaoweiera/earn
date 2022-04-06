<script lang="ts" setup>
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */
import * as echarts from "echarts";
import { getCurrentInstance, onMounted } from "vue";

const instance = getCurrentInstance();

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

const init = function () {
  const opt = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };
  const chart = getChart();
  if (chart) {
    chart.setOption(opt);
  }
};

onMounted(function () {
  setTimeout(init);
});
</script>

<template>
  <div>
    <div class="h-full flex">
      <div class="h-full w-full j-echarts"></div>
    </div>
  </div>
</template>
