<script lang="ts" setup>
/**
 * @file 价格
 * @auth svon.me@gmail.com
 */

import { toUpper } from "ramda";
import { toNumberFormat } from "src/utils/";

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div>
    <label class="text-14-18 text-global-highTitle text-opacity-65">{{ label }}</label>
    <p class="text-32 mt-2 text-global-highTitle">
      <b v-if="unit">{{ toNumberFormat(value, toUpper(unit)) }}</b>
      <b v-else>{{ toNumberFormat(value) }}</b>
    </p>
  </div>
</template>
