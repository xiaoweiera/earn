<script setup lang="ts">
import _ from "lodash";

defineProps({
  type: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="tip" :class="type">{{ _.upperFirst(type) }}</div>
</template>
<style scoped lang="scss">
.tip {
  @apply h-4.5 px-1.5 text-global-white flex items-center flex-nowrap text-kd12px16px rounded-kd4px;
}
.extreme {
  background: #d60fce;
}
.high {
  background: #dd4415;
}
.medium {
  background: #006ff7;
}
.low {
  background: #008f28;
}
.none {
  background: #033666;
}
</style>
