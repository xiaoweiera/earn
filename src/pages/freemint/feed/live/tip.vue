<script setup lang="ts">
/**
 * 状态小方块提示
 */
import _ from "lodash";
defineProps({
  type: {
    type: String,
    required: true, //free - high - low
  },
});
</script>
<template>
  <div class="w-fit default" :class="type">{{ _.upperFirst(type) }}</div>
</template>
<style scoped lang="scss">
.default {
  @apply text-kd12px16px rounded-kd4px h-4.5 px-1.5 whitespace-nowrap flex items-center justify-center;
}
.free,
.low {
  color: #008f28;
  background: rgba(0, 143, 40, 0.12);
}
.high {
  color: #dd4415;
  background: rgba(221, 68, 21, 0.12);
}
</style>
