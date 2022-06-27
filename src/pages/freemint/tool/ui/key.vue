<script setup lang="ts">
/**
 * 私钥
 */
import { ElInput } from "element-plus";
import { isConnect } from "src/logic/common/wallet";
import Wallet from "src/plugins/web3/wallet";
import safeGet from "@fengqiaogang/safe-get";
import { messageError } from "src/lib/tool";
import { getErrorMessageContent } from "src/plugins/web3/message";
import { ref, computed, onMounted } from "vue";
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
    default: "需要本地使用你的私钥进行操作，服务器不会获取你的私钥，为了安全考虑，建议用小号。填入私钥后点击 Add 添加。",
  },
  isWallet: {
    type: Boolean,
    default: true,
  },
});
const wallet = new Wallet();
const walletAddress = ref("");
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
const walletTxt = computed(() => {
  return walletAddress.value ? `${walletAddress.value.slice(0, 5)}...${walletAddress.value.slice(walletAddress.value.length - 3)}` : "Connect Wallet";
});
const deleteItem = (index: number) => {
  keyList.value.splice(index, 1);
  emit("keyCall", keyList.value);
};
//链接钱包
const onConnect = async function () {
  // 如果已获取到地址
  if (isConnect() || wallet.getChainAddress()) {
    return true;
  }
  try {
    const status = await wallet.requestPermissions();
    if (status) {
      // todo 授权成功
      walletAddress.value = wallet.getChainAddress();
    }
  } catch (e) {
    const code = safeGet<number>(e as object, "code");
    messageError(getErrorMessageContent(code));
  }
};
onMounted(() => {
  walletAddress.value = wallet.getChainAddress();
});
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
      <div v-if="isWallet" class="flex items-center mt-3 md:mt-0 md:ml-4" @click="onConnect">
        <div class="button-mint">
          <ui-image class="mr-1 w-4 h-4" oss src="/mint/walletOk.png" />
          <span>{{ walletTxt }}</span>
        </div>
      </div>
    </div>
    <client-only v-if="!walletAddress" class="flex mt-3 items-center">
      <el-input v-model="key" placeholder="请输入私钥地址" autocomplete="off" />
      <div class="button-mint ml-4" @click="add">Add</div>
    </client-only>
    <div v-else class="mt-3 text-kd16px24px text-global-highTitle text-number">Account: {{ walletAddress }}</div>
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
