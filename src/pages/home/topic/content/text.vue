<script setup lang="ts">
/**
 * @file text
 * @auth svon.me@gmail.com
 */
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
  <span class="text-kd12px16px md:text-kd14px16px text-global-highTitle short">{{ data[field] || "-" }}</span>
</template>
