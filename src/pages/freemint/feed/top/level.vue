<script setup lang="ts">
import _ from "lodash";
import { computed } from "vue";
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});
const typeCss = computed(() => {
  if (props.count <= 0) {
    return "none";
  } else if (props.count <= 2) {
    return "low";
  } else if (props.count <= 4) {
    return "medium";
  } else if (props.count <= 6) {
    return "high";
  }
  return "extreme";
});
</script>
<template>
  <div class="tip" :class="typeCss">{{ _.upperFirst(typeCss) }}</div>
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
