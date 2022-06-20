<script setup lang="ts">
/**
 * 状态卡片元素
 */
import _ from "lodash";
defineProps({
  state: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="card font-kdFang text-center">
    <div class="flex items-center justify-center">
      <ui-image class="w-6 h-6" oss rounded :src="`/mint/${state}.png`" />
      <div class="state">{{ _.upperFirst(state) }}</div>
    </div>
    <div class="mt-2" :class="state">
      <span class="wei">48</span>
      <span class="text-kd16px22px font-medium">Gwei</span>
    </div>
    <div class="des other">
      <span class="mr-1.5">Base:</span>
      <span>47</span>
      <div class="mx-1.5 gang" />
      <span class="mr-1.5">Priority:</span>
      <span>1</span>
    </div>
    <div class="des other">
      <span>$1.80</span>
      <div class="mx-3 gang" />
      <span>约</span>
      <span class="mx-2">3</span>
      <span>mins:</span>
      <span class="mx-1">0</span>
      <span>secs</span>
    </div>
  </div>
</template>
<style scoped>
.card {
  @apply w-full h-36.25 p-4 rounded-kd6px;
  @apply border-1 border-global-highTitle border-opacity-10;
}
.state {
  font-weight: 500;
  @apply ml-1 text-kd16px22px font-medium text-global-hei;
}
.wei {
  font-weight: 600;
  @apply text-kd32px32px font-kdFang mr-1;
}
.des {
  @apply flex items-center justify-center mt-2;
}
.other {
  @apply text-kd12px16px text-global-black-desc;
}
.gang {
  border-left: 1px solid rgba(3, 54, 102, 0.25);
  @apply h-3.2;
}
.low {
  color: #00c908;
}
.averag {
  color: #006ff7;
}
.high {
  color: #dd4415;
}
</style>
