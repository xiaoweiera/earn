<script lang="ts" setup>
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */

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
</script>

<template>
  <div class="ui-echart">
    <div class="h-full echart-main">
      <Echarts :bg-color="props.bgColor" :class="props.customClass" :custom="props.custom" :direction="props.direction" :grid="props.grid" :legend="props.legend" />
    </div>
    <div class="hidden">
      <slot></slot>
    </div>
  </div>
</template>
