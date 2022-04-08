<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */

import { onMounted } from "vue";
import type { EchartData } from "src/types/echarts/type";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";

const name = "api.apy.getHecoTrends";

const echart = createReactive<EchartData>(name, {} as EchartData);

onMounted(function () {
  return onLoadReactive(echart, name);
});
</script>

<template>
  <div class="p-4 md:p-10">
    <div v-if="echart.legends" class="max-w-300 mx-auto">
      <ui-echart-content :data="echart" class="h-75" />
    </div>
  </div>
</template>
