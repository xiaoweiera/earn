<script setup lang="ts">
/**
 * tag切换
 */
import { ref } from "vue";
const list = [
  { name: "ETH", value: "eth" },
  { name: "USD", value: "usd" },
];
const tag = ref("eth");
const selectTag = (value: string) => (tag.value = value);
</script>
<template>
  <div class="tag-container">
    <template v-for="item in list" :key="item.value">
      <div class="tag" :class="item.value === tag ? 'tag-ok' : 'tag-no'" @click="selectTag(item.value)">{{ item.name }}</div>
    </template>
  </div>
</template>
<style scoped lang="scss">
.tag-container {
  background: #fafbfc;
  border: 1px solid rgba(3, 54, 102, 0.04);
  @apply h-7 h-7 flex items-center justify-center rounded-kd6px;
}
.tag {
  @apply px-2 h-6  flex justify-center items-center cursor-pointer rounded-kd4px;
}
.tag-ok {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.06);
  @apply text-kd12px16px font-medium text-global-black-title bg-global-white;
}
.tag-no {
  @apply text-kd12px16px font-medium text-global-text-grey;
}
</style>
