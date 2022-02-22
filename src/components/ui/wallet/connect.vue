<script setup lang="ts">
/**
 * @file 链接钱包
 */
import I18n from "src/utils/i18n";
import { ElButton } from "element-plus";

const i18n = I18n();

</script>

<template>
  <el-button>
    <IconFont size="16" class="text-global-primary mr-1" type="icon-wallet"/>
    <span class="text-14-18 text-global-primary font-medium">{{ i18n.wallet.connectWallet }}</span>
  </el-button>
</template>

