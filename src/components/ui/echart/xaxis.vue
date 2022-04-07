<script lang="ts" setup>
/**
 * @file 横坐标
 * @author svon.me@gmail.com
 */

import type { PropType } from "vue";
import { onBeforeMount } from "vue";
import { setInject } from "src/utils/use/state";
import safeSet from "@fengqiaogang/safe-set";
import { EchartsOptionName } from "src/types/echarts/type";

const props = defineProps({
  type: {
    type: String,
    default: () => "category",
  },
  boundaryGap: {
    type: [Boolean, Array],
    default: () => [20, 20],
  },
  color: {
    type: String,
    default: "",
  },
  value: {
    type: Array as PropType<object[] | string[] | number[]>,
    required: true,
  },
});

const set = setInject(EchartsOptionName.xAxis);

onBeforeMount(function () {
  if (set) {
    const option = {
      type: props.type,
      boundaryGap: props.boundaryGap,
      data: props.value,
    };
    const colorKey = "axisLabel.textStyle.color";
    if (props.color) {
      safeSet(option, colorKey, props.color);
    }
    set(option);
  }
});
</script>

<template>
  <p>xAxis</p>
</template>
