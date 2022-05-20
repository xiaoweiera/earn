<script setup lang="ts">
/**
 * @file 交易量
 * @auth svon.me@gmail.com
 */

import { computed } from "vue";
import { toNumber } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";

const props = defineProps({
  field: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});

const value = computed<number>(function () {
  const text = props.field ? safeGet<string>(props.data, props.field) : 0;
  return toNumber(text);
});
</script>

<template>
  <span class="text-global-highTitle text-14-16">{{ value }}</span>
</template>
