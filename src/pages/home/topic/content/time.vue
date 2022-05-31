<script setup lang="ts">
import { dataToTimestamp } from "src/lib/tool";
import { getDateMDY } from "src/utils";
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
  <div class="text-kd12px16px md:text-kd14px16px text-global-highTitle text-number">{{ data[field] ? getDateMDY(dataToTimestamp(data[field])) : "TBA" }}</div>
</template>
