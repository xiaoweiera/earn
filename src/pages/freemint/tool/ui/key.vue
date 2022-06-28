<script setup lang="ts">
/**
 * 私钥
 */
import { ElInput, ElPopover } from "element-plus";
import { isConnect } from "src/logic/common/wallet";
import Wallet from "src/plugins/web3/wallet";
import safeGet from "@fengqiaogang/safe-get";
import { messageError, smallToken } from "src/lib/tool";
import { getErrorMessageContent } from "src/plugins/web3/message";
import { ref, computed, onMounted, PropType } from "vue";
import { toolMode } from "src/types/freemint";
import { EventType } from "src/types/web3";

const props = defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
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
  //是否有钱包按钮
  isWallet: {
    type: Boolean,
    default: true,
  },
});
const wallet = new Wallet();
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
  return props.toolModel.metamusk_address ? `${smallToken(props.toolModel.metamusk_address)}` : "Connect Wallet";
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
      props.toolModel.metamusk_address = wallet.getChainAddress();
      props.toolModel.metamusk_is_collected = wallet.getChainAddress() ? true : false;
    }
  } catch (e) {
    const code = safeGet<number>(e as object, "code");
    messageError(getErrorMessageContent(code));
  }
};
onMounted(() => {
  props.toolModel.metamusk_address = wallet.getChainAddress();
  props.toolModel.metamusk_is_collected = wallet.getChainAddress() ? true : false;
  wallet.on(EventType.account, function (metaAddress) {
    if (!metaAddress.length) {
      props.toolModel.metamusk_address = "";
      props.toolModel.metamusk_is_collected = false;
    }
  });
});
</script>
<template>
  <div class="w-full border-css relative">
    <div class="md:flex items-center justify-between">
      <div>
        <div class="flex items-center">
          <ui-image class="mr-2 w-5 h-5" oss :src="`/mint/${icon}.png`" />
          <span class="title">{{ title }}</span>
        </div>
        <div class="des mt-1.5">{{ des }}</div>
      </div>

      <ui-popover class="break-words" placement="bottom" width="auto" trigger="click">
        <template #reference>
          <div v-if="isWallet" class="flex items-center mt-3 md:mt-0 md:ml-4" @click="onConnect">
            <div class="button-mint">
              <ui-image class="mr-1 w-4 h-4" oss src="/mint/walletOk.png" />
              <span>{{ walletTxt }}</span>
            </div>
          </div>
        </template>
        <template #content>
          <div class="flex items-center text-kd12px18px px-2 py-1.5">MetaMask 插件中退出</div>
        </template>
      </ui-popover>
    </div>
    <client-only v-if="!toolModel['metamusk_address'] || !isWallet" class="flex mt-3 items-center">
      <el-input v-model="key" placeholder="请输入私钥地址" autocomplete="off" />
      <div class="button-mint ml-4" @click="add">Add</div>
    </client-only>
    <div v-else class="mt-3 text-kd16px24px text-global-highTitle text-number">
      MetaMusk Account:
      {{ toolModel.metamusk_address }}
    </div>
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
