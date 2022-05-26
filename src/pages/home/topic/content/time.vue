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
  <div class="numberDefault text-number text-center">{{ data[field] ? getDateMDY(dataToTimestamp(data[field])) : "TBA" }}</div>
</template>
