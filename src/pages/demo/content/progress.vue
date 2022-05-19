<script setup lang="ts">
/**
 * @file 进度条
 * @auth svon.me@gmail.com
 */

import { computed } from "vue";
import { toNumber } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { ElProgress } from "element-plus";

const props = defineProps({
  name: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});

// 计算百分比
const value = computed<number>(function () {
  const value = safeGet<number>(props.data, props.name);
  return toNumber(value);
});
</script>

<template>
  <client-only>
    <el-progress :percentage="value" :show-text="false" />
  </client-only>
</template>
