<script setup lang="ts">
/**
 * @file demo
 * @auth svon.me@gmail.com
 */

import * as console from "src/plugins/log/";

const xAxis = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const onCustom = function (data: object) {
  console.log(data);
  return data;
};
</script>

<template>
  <div class="p-10">
    <div class="w-150 h-100 border border-black">
      <ui-echart class="h-full" :custom="onCustom">
        <!--提示框-->
        <ui-echart-tooltip />
        <!--横轴数据-->
        <ui-echart-xaxis :value="xAxis" />
        <!--Y轴数据-->
        <ui-echart-yaxis :index="0" />
        <ui-echart-yaxis :index="1" position="right" />
      </ui-echart>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
