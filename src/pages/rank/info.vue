<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="flex items-center">
    <div class="text-kd22px22px i8n-font-Barlow font-semibold md:text-kd32px32px text-global-highTitle">{{ props.title }}</div>
  </div>
</template>
