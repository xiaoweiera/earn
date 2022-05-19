<script setup lang="ts">
/**
 * @file 进度条
 * @auth svon.me@gmail.com
 */

import { toNumber } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { ElProgress } from "element-plus";
import type { PropType } from "vue";

defineProps({
  name: {
    required: true,
    type: Array as PropType<string[]>,
  },
  data: {
    required: true,
    type: Object,
  },
});

// 计算百分比
const getValue = function (name: string[], data: object): number {
  const [key1, key2] = name || [];
  if (key1 && key2) {
    const number1 = toNumber(safeGet<number>(data, key1));
    const number2 = toNumber(safeGet<number>(data, key2));
    if (number1 >= number2) {
      return 100;
    }
    if (number2 > 0) {
      return toNumber((number1 / number2) * 100);
    }
  }
  return 1;
};
</script>

<template>
  <client-only>
    <el-progress :percentage="getValue(name, data)" :show-text="false" />
  </client-only>
</template>
