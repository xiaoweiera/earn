<script setup lang="ts">
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
  <span class="text-kd14px20px text-global-hui01 short huawei-medium">{{ data[field] || "-" }}</span>
</template>
