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
  <span class="text-kd14px20px text-global-hui01 short huawei-regular">{{ data[field] ? toNumberCashFormat(data[field] * 100, "%") : "-" }}</span>
</template>
