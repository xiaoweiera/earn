<script lang="ts" setup>
// 链接钱包
import { isConnect } from "src/logic/common/wallet";
import Wallet from "src/plugins/web3/wallet";
import safeGet from "@fengqiaogang/safe-get";
import { messageError } from "src/lib/tool";
import { getErrorMessageContent } from "src/plugins/web3/message";
import I18n from "src/utils/i18n";
const i18n = I18n();
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
</script>
<template>
  <div class="rounded-kd6px bg top w-full">
    <div class="flex flex-col justify-center items-center h-36 md:h-41.5">
      <div class="text-kd16px20px font-medium text-global-highTitle text-opacity-85">{{ i18n.home.new.wallet }}</div>
      <div class="mt-1.5 text-kd13px18px text-global-highTitle text-opacity-85">{{ i18n.home.new.des1 }}</div>
      <v-login class="hand">
        <div class="wallet-btn" @click="onConnect">
          <iconFont size="16" class="mr-0.5" type="icon-manage" />
          <div class="text-kd14px18px font-medium font-kdFang">{{ i18n.home.new.wallet }}</div>
        </div>
      </v-login>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wallet-btn {
  @apply mt-2.5 text-global-white rounded-kd6px h-8 w-24.5 bg-global-primary flex items-center justify-center;
}
.top {
  background-image: url("https://res.kingdata.xyz/common/chartBg.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
