<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */

import * as console from "src/plugins/log/";
import { Position } from "src/types/echarts/type";

const xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const list = [
  {
    position: Position.left,
    name: "AAA",
    list: [150, 230, 224, 218, 135, 147, 260],
  },
  {
    position: Position.right,
    name: "BBB",
    list: [60, 50, 10, 300, 200, 150, 220],
  },
];
const onCustom = function (data: object) {
  console.log(data);
  return data;
};
</script>

<template>
  <div class="p-10">
    <div class="w-150 h-100 border border-black">
      <ui-echart :custom="onCustom" class="h-full">
        <!--提示框-->
        <ui-echart-tooltip />
        <!--x轴数据-->
        <ui-echart-xaxis :value="xAxis" />
        <!--Y轴数据-->
        <ui-echart-yaxis :index="0" />
        <ui-echart-yaxis :index="1" :position="Position.right" />
        <!--图表数据-->
        <template v-for="(data, index) in list" :key="index">
          <ui-echart-legend :index="index" :position="data.position" :value="data.name" />
          <ui-echart-series :index="index" :value="data.list" />
        </template>
      </ui-echart>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
