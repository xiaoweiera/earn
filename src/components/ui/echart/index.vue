<script lang="ts" setup>
/**
 * @file Echarts
 * @auth svon.me@gmail.com
 */

import { Callback } from "src/types/common/";
import { useReactiveProvide, useRefProvide } from "src/utils/use/state";
import { EchartsOptionName } from "src/types/echarts/type";
import { asyncLoad } from "src/plugins/lazyload/";
import { PropType } from "vue";

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

defineProps({
  custom: {
    type: Function as PropType<Callback>,
    default: null,
  },
});

const Echarts = asyncLoad(() => import("./chart.vue"));
</script>

<template>
  <div>
    <div class="h-full">
      <Echarts :custom="custom" class="h-full" />
    </div>
    <div class="hidden">
      <slot></slot>
    </div>
  </div>
</template>
