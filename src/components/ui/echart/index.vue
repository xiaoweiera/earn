<script lang="ts" setup>
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */

import { ref } from "vue";
import { asyncLoad } from "src/plugins/lazyload/";
import { chartProps } from "src/logic/ui/echart/props";
import { EchartsOptionName } from "src/types/echarts/type";
import { useReactiveProvide, useRefProvide } from "src/utils/use/state";

// 图例
useRefProvide<object[]>(EchartsOptionName.legend, []);
// 数据
useRefProvide<object>(EchartsOptionName.series, []);
// Y 轴
useRefProvide<object>(EchartsOptionName.yAxis, []);
// X 轴
useReactiveProvide<object>(EchartsOptionName.xAxis, {});
// 提示框
useReactiveProvide<object>(EchartsOptionName.tooltip, {});

const props = defineProps(chartProps());

const Echarts = asyncLoad(() => import("./chart.vue"));

const loading = ref<boolean>(true);

const onLoad = function () {
  loading.value = false;
};
</script>

<template>
  <div class="ui-echart relative">
    <client-only class="h-full echart-main">
      <Echarts :area="props.area" :bg-color="props.bgColor" :class="props.customClass" :custom="props.custom" :direction="props.direction" :grid="props.grid" :legend="props.legend" :log="props.log" :stack="props.stack" @load="onLoad" />
    </client-only>
    <div v-show="props.showLoading && loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <IconFont size="32" suffix="png" type="loading" />
    </div>
    <div class="hidden">
      <slot></slot>
    </div>
  </div>
</template>
