<script setup lang="ts">
/**
 * @file 变化率，百分比
 * @auth svon.me@gmail.com
 */

import { computed } from "vue";
import { toNumberCashFormat } from "src/utils/convert/to";
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

const value = computed<string>(function () {
  if (props.field) {
    const value = safeGet<string | number>(props.data, props.field);
    if (value || value === 0) {
      return `${value}`;
    }
  }
  return "";
});
</script>

<template>
  <span class="text-12-16 text-number flex items-center">
    <template v-if="value">
      <span class="text-global-highTitle text-opacity-65">{{ toNumberCashFormat(value, "%") }}</span>
    </template>
    <template v-else>
      <span class="text-global-highTitle">--</span>
    </template>
  </span>
</template>
