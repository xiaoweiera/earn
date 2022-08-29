<script setup lang="ts">
import { dateDiff } from "src/utils";
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
  <span class="text-kd14px20px text-global-hui03 short huawei-medium">{{ dateDiff(data[field]) || "-" }}</span>
</template>
