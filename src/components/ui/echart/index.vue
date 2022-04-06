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

useReactiveProvide<object>(EchartsOptionName.series);
useRefProvide<object>(EchartsOptionName.yAxis, []);
useReactiveProvide<object>(EchartsOptionName.xAxis);
useReactiveProvide<object>(EchartsOptionName.tooltip);
useReactiveProvide<object>(EchartsOptionName.legend);

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
      <Echarts class="h-full" :custom="custom" />
    </div>
    <div class="hidden">
      <slot></slot>
    </div>
  </div>
</template>
