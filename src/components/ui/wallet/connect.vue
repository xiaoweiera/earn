<script setup lang="ts">
/**
 * @file 链接钱包
 */

import { onMounted } from "vue";
import I18n from "src/utils/i18n";
import { Encryption } from "src/utils/";
import { ElButton } from "element-plus";
import Wallet from "src/plugins/web3/wallet";
import { EventType } from "src/types/web3";
import { address, isConnect } from "src/logic/common/wallet";
import safeGet from "@fengqiaogang/safe-get";
import { messageError } from "src/lib/tool";
import { getErrorMessageContent } from "src/plugins/web3/message";

const i18n = I18n();

const walletAddress = function (): string {
  if (isConnect()) {
    const encryption = new Encryption(address.value);
    encryption.set$1Count(6);
    encryption.set$2Count(4);
    return encryption.value();
  }

  return i18n.wallet.connectWallet;
};

// 链接钱包
const onConnect = async function () {
  // 如果已获取到地址
  if (isConnect()) {
    return true;
  }
  const wallet = new Wallet();
  try {
    const status = await wallet.requestPermissions();
    if (status) {
      // todo 授权成功
    }
  } catch (e) {
    const code = safeGet<number>(e as object, "code");
    // if (code === 4001) {
    //   // todo 用户取消授权
    // }
    messageError(getErrorMessageContent(code));
  }
};

// 同步钱包地址
const syncAddress = function () {
  // 获取钱包地址
  const wallet = new Wallet();
  address.value = wallet.getChainAddress();
};

onMounted(() => {
  // 监听钱包
  const wallet = new Wallet();
  // 链接或者切换链接
  wallet.on(EventType.account, syncAddress);
  // 断开链接
  wallet.on(EventType.disconnect, () => {
    address.value = "";
  });
  syncAddress();
});
</script>

<template>
  <ui-hover class="flex" placement="bottom" trigger="hover">
    <template #label>
      <v-login class="block">
        <el-button class="px-1" @click="onConnect">
          <IconFont size="16" class="text-global-primary mr-1" type="icon-wallet" />
          <span class="text-14-18 text-global-primary font-medium">
            <span>{{ walletAddress() }}</span>
          </span>
        </el-button>
      </v-login>
    </template>
    <template #content>
      <div class="text-global-highTitle text-opacity-85">
        <ui-wallet-portfolio v-if="isConnect()" class="p-2" />
        <div v-else class="p-2 text-14-18">
          <span>{{ i18n.wallet.walletTip }}</span>
        </div>
      </div>
    </template>
  </ui-hover>
</template>
