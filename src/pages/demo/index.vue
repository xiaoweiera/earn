<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */
// import API from "src/api/";
// import { onMounted, reactive } from "vue";
// import { onUpdateReactive } from "src/utils/ssr/ref";
// import { LegendDirection } from "src/types/echarts/type";
// import type { EchartData } from "src/types/echarts/type";

import Table from "./table.vue";

// const chart = reactive<EchartData>({} as EchartData);
//
// const onUpdateChartData = onUpdateReactive(chart, async function () {
//   const api = new API();
//   return api.apy.getHecoTrends();
// });
// onMounted(function () {
//   onUpdateChartData();
// });
</script>

<template>
  <div class="p-4 md:p-10">
    <!--    <div class="flex">-->
    <!--      <div v-if="chart.key" class="h-6 w-30 border border-black">-->
    <!--        <ui-echart-small :data="chart" class="h-full" />-->
    <!--      </div>-->
    <!--      <div v-if="chart.key" class="h-6 w-30 ml-5">-->
    <!--        <ui-echart-small :data="setBar(chart)" class="h-full" />-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="mt-2">-->
    <!--      <div v-if="chart.key" class="w-200">-->
    <!--        &lt;!&ndash;-->
    <!--          当设置 legend 为 custom 时，ui-echart 的 class 需要使用 custom-class 属性-->
    <!--        &ndash;&gt;-->
    <!--        <ui-echart-content custom-class="h-80 border border-black" :legend="LegendDirection.custom" :data="chart">-->
    <!--          &lt;!&ndash;展示自定义图列&ndash;&gt;-->
    <!--          <template #legend="scope">-->
    <!--            <span class="block p-2 cursor-pointer" :style="scope.style">-->
    <!--              <span class="legend-item">-->
    <!--                <span class="text-base" v-html="scope.icon"></span>-->
    <!--                <span>{{ scope.value }}</span>-->
    <!--              </span>-->
    <!--            </span>-->
    <!--          </template>-->
    <!--        </ui-echart-content>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="mt-10">
      <Table />
    </div>
  </div>
</template>

<style scoped lang="scss">
.legend-item {
  @apply flex items-center;
  @at-root .disabled & {
    @apply text-global-disabled;
  }
}
</style>
