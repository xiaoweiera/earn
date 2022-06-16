<script setup lang="ts">
import { ElInput } from "element-plus";
import { ref } from "vue";
const address = ref("");
const isGet = ref(false);
const getMint = () => (isGet.value = true);
</script>
<template>
  <div class="w-full border-css">
    <div class="title">填入 Mint Hash 或 合约地址 可自动识别</div>
    <div class="flex items-center">
      <el-input v-model="address" placeholder="输入 ERC721 合约地址或者输入别人的 Mint Hash" autocomplete="off" />
      <div class="get-mint min-w-20.5" @click="getMint()">
        <span v-if="!isGet">Get Mint</span>
        <IconFont v-else size="14" type="loading" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border: 1px solid rgba(3, 54, 102, 0.04) !important;
  box-shadow: none;
  background: #fafbfc;
  height: 32px !important;
  padding-left: 8px !important;
  border-radius: 4px !important;
  color: #111316 !important;
  @apply text-kd12px16px;
}
.title {
  @apply text-kd14px18px font-medium text-global-black-title mb-1.4;
}
.get-mint {
  @apply bg-global-primary bg-opacity-6 rounded-kd4px;
  @apply ml-4 h-8 px-3 text-kd14px18px font-medium;
  @apply flex items-center text-global-primary flex-nowrap justify-center whitespace-nowrap cursor-pointer;
}
</style>
