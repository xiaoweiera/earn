<script setup lang="ts">
import { toNumberCashFormat } from "src/utils/convert/to";
defineProps({
  field: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});
</script>

<template>
  <span class="text-kd12px16px text-global-hui03 short huawei-medium">{{ data[field] ? toNumberCashFormat(data[field]) : "-" }}</span>
</template>
