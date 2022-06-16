<script setup lang="ts">
import { ElInput } from "element-plus";
import { ref } from "vue";
const key = ref("");
</script>
<template>
  <div class="w-full border-css">
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center">
          <ui-image class="mr-2 w-5 h-5" oss src="/mint/yaoshi.png" />
          <span class="title">填入私钥匙</span>
        </div>
        <div class="des mt-1.5">本地操作，服务器不会获取你的私钥。为了安全考虑，建议用小号；多个私钥请点击 Add 后添加。</div>
      </div>
      <div class="flex items-center">
        <div class="button-mint">
          <ui-image class="mr-1 w-4 h-4" oss src="/mint/walletOk.png" />
          <span>Connect Wallet</span>
        </div>
      </div>
    </div>
    <client-only class="flex mt-3 items-center">
      <el-input v-model="key" placeholder="输入 ERC721 合约地址或者输入别人的 Mint Hash" autocomplete="off" />
      <div class="button-mint">Add</div>
    </client-only>
    <!--私钥列表-->
    <div class="mt-3">
      <template v-for="item in 4" :key="item">
        <div class="flex items-center justify-between hand keyItem">
          <div class="text-kd12px16px text-global-black-title">A6Gt6xw8ygwrKS4QDVYzgw7nG9b5t2VScnsJqE22H3Fb{{ item }}</div>
          <IconFont class="text-global-numRed" size="16" type="shan" />
        </div>
      </template>
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
  @apply text-kd14px18px font-medium text-global-black-title;
}
.button-mint {
  @apply bg-global-primary bg-opacity-6 rounded-kd4px;
  @apply ml-4 h-8 px-3 text-kd14px18px font-medium;
  @apply flex items-center text-global-primary flex-nowrap justify-center whitespace-nowrap cursor-pointer;
}
.des {
  @apply text-kd12px16px text-global-text-grey;
}
.keyItem:not(:last-child) {
  @apply mb-1.5;
}
</style>
