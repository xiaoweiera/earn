<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */

import { onMounted } from "vue";
import * as console from "src/plugins/log/";
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
      <ui-echart-content :custom="onCustom" :data="echart" class="h-full" />
    </div>
  </div>
</template>
