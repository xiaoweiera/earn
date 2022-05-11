<script setup lang="ts">
import { ref } from "vue";
const activeId = ref(1);
const list = [
  { id: 1, name: "NFT", icon: "icon-paihang" },
  { id: 2, name: "DApp", icon: "icon-nfttag" },
  { id: 3, name: "APY", icon: "icon-apytag" },
];
const tabClick = function (value: any) {
  activeId.value = value.id;
};
</script>
<template>
  <div>
    <div class="flex items-center justify-center">
      <div class="w-92 h-14.25 bg-global-highTitle bg-opacity-6 rounded-md p-1 flex items-center hand">
        <div v-for="(item, index) in list" :key="index" :class="item.id === activeId ? 'tab-item tab-item-active' : 'tab-item'" @click="tabClick(item)">
          <IconFont :type="item.icon" size="24" />
          <span class="ml-3.5">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.tab-item {
  @apply w-45 h-full flex items-center justify-center text-global-highTitle text-kd24px28px font-medium font-kdFang;
}
.tab-item-active {
  @apply bg-global-darkblue text-global-white rounded-md;
}
</style>
