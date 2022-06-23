<script setup lang="ts">
/**
 * 私钥
 */
import { ElInput } from "element-plus";
import { ref } from "vue";
import { isConnect } from "src/logic/common/wallet";
import Wallet from "src/plugins/web3/wallet";
import safeGet from "@fengqiaogang/safe-get";
import { messageError } from "src/lib/tool";
import { getErrorMessageContent } from "src/plugins/web3/message";
defineProps({
  icon: {
    type: String,
    default: "yaoshi",
  },
  title: {
    type: String,
    default: "填入私钥",
  },
  des: {
    type: String,
    default: "本地操作，服务器不会获取你的私钥。为了安全考虑，建议用小号；多个私钥请点击 Add 后添加。",
  },
  isWallet: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["keyCall"]);
const key = ref("");
const keyList = ref<string[]>([]);
const add = () => {
  if (!key.value) return;
  if (!keyList.value.includes(key.value)) {
    keyList.value.push(key.value);
    emit("keyCall", keyList.value);
  }
  key.value = "";
};
const deleteItem = (index: number) => {
  keyList.value.splice(index, 1);
  emit("keyCall", keyList.value);
};
</script>
<template>
  <div class="w-full border-css">
    <div class="md:flex items-center justify-between">
      <div>
        <div class="flex items-center">
          <ui-image class="mr-2 w-5 h-5" oss :src="`/mint/${icon}.png`" />
          <span class="title">{{ title }}</span>
        </div>
        <div class="des mt-1.5">{{ des }}</div>
      </div>
    </div>
    <client-only class="flex mt-3 items-center">
      <el-input v-model="key" placeholder="请输入私钥地址" autocomplete="off" />
      <div class="button-mint ml-4" @click="add">Add</div>
    </client-only>
    <!--私钥列表-->
    <div class="mt-3">
      <template v-for="(item, index) in keyList" :key="item">
        <div class="flex items-center justify-between hand keyItem">
          <div class="text-kd12px16px text-global-black-title">{{ item }}</div>
          <IconFont class="text-global-numRed" size="16" type="shan" @click="deleteItem(index)" />
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
.des {
  @apply text-kd12px16px text-global-text-grey;
}
.keyItem:not(:last-child) {
  @apply mb-1.5;
}
</style>
