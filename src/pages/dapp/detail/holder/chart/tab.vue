<script lang="ts" setup>
import { ref } from "vue";
import type { HolderTab } from "src/types/dapp/holder";

defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["change"]);
const activeId = ref<string>("30d");
const tabClick = function (value: any) {
  if (activeId.value === value.id) return false;
  activeId.value = value.id;
  emit("change", value);
};
</script>

<template>
  <div>
    <p class="inline-flex items-center p-0.5 rounded-kd6px bg-global-highTitle bg-opacity-4 cursor-pointer">
      <span v-for="item in data" :key="item.id" :class="activeId === item.id ? 'active' : ''" class="change-tab" @click="tabClick(item)">{{ item.name }}</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.change-tab {
  @apply min-w-11 inline-flex items-center justify-center text-kd12px16px font-kdFang text-global-highTitle text-opacity-65;
}
.active {
  background: #fefefe;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  @apply rounded-kd4px py-0.5 px-2 text-global-highTitle text-opacity-100 font-medium;
}
</style>
