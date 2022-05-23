<script setup lang="ts">
import Number from "src/pages/home/topic/content/number.vue";

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
  width: {
    type: Number,
    default: () => 0,
  },
});
</script>

<template>
  <span class="numberDefault short">{{ data[field] || "-" }}</span>
</template>
<style scoped lang="scss">
.numberDefault {
  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle;
}
</style>
