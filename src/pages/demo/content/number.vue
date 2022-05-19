<script setup lang="ts">
/**
 * @file 交易量
 * @auth svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import { toNumber } from "src/utils";
import { computed } from "vue";

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

const value = computed<number>(function () {
  const text = props.name ? safeGet<string>(props.data, props.name) : 0;
  return toNumber(text);
});
</script>

<template>
  <span class="text-global-highTitle text-14-16">{{ value }}</span>
</template>
