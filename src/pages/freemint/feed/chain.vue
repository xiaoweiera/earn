<script setup lang="ts">
import { ElSelect, ElOption } from "element-plus";
import { ref } from "vue";
const chain = ref("eth");
const list = [{ name: "Ethereum", icon: "eth", key: "eth" }];
</script>
<template>
  <div class="bg-global-primary flex items-center rounded-kd4px h-7 px-2 justify-center">
    <ui-image class="w-3.5 h-3.5 mr-1" oss src="/mint/eth.png" />
    <client-only class="w-23 flex items-center">
      <el-select v-model="chain" :popper-append-to-body="false" class="flex-1 select" size="small">
        <el-option v-for="item in list" :key="item.key" :label="item.name" :value="item.key" />
      </el-select>
      <IconFont class="text-global-white mt-0.5" size="12" type="xiajiantou" />
    </client-only>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border: none !important;
  box-shadow: none !important;
  padding-right: 0 !important;
  @apply bg-global-primary text-kd14px18px font-medium text-global-white;
}
::v-deep(.el-input__wrapper) {
  border: none !important;
  box-shadow: none !important;
}
::v-deep(.el-select) {
  --el-select-input-focus-border-color: transparent;
}
::v-deep(.el-input__suffix) {
  display: none;
}
</style>
