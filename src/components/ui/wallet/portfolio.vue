<script setup lang="ts">
import I18n from "src/utils/i18n";
import { computed } from "vue";
import { wallet_address, isConnect } from "src/logic/common/wallet";
import { config as routerConfig } from "src/router/config";

const i18n = I18n();

const href = computed<object | undefined>(() => {
  if (isConnect()) {
    return {
      path: routerConfig.portfolio,
      query: {
        isBeta: "ok",
        wallet_address,
      },
    };
  }
  return void 0;
});
</script>

<template>
  <v-router :href="href" class="block text-14-18">
    <IconFont class="align-middle text-global-primary mr-2" size="20" type="icon-myWallet" />
    <span class="align-middle">{{ i18n.wallet.moneyManage }}</span>
  </v-router>
</template>
