<script setup lang="ts">
/**
 * @file 变化率，百分比
 * @auth svon.me@gmail.com
 */

import { computed } from "vue";
import { toNumber } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";

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

const value = computed<string>(function () {
  if (props.name) {
    const value = safeGet<string | number>(props.data, props.name);
    if (value || value === 0) {
      return `${value}`;
    }
  }
  return "";
});
</script>

<template>
  <span class="text-14-16">
    <template v-if="value">
      <span :class="{ 'text-global-numRed': toNumber(value) > 0, 'text-global-numGreen': toNumber(value) <= 0 }">
        <span>{{ toNumber(value) }}%</span>
      </span>
    </template>
    <template v-else>
      <span class="text-global-highTitle">--</span>
    </template>
  </span>
</template>
