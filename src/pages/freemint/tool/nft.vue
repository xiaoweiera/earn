<script setup lang="ts">
import Card from "./ui/card/index.vue";
import Chain from "../feed/chain.vue";
import Key from "./ui/key.vue";
import Log from "./ui/log/index.vue";
import Node from "./ui/node.vue";
import Button from "./ui/button.vue";
import Info from "./ui/info.vue";
import Gas from "./ui/gas.vue";
import Address from "./ui/address.vue";
import { toolMode } from "src/types/freemint";
import { reactive } from "vue";
const toolModel: toolMode = reactive({
  node: "", //节点
  keyList: [], //私钥
  baseFeePerGas: 0,
  maxPriorityFeePerGas: 0,
  maxFeePerGas: 0,

  mintAmount: 0,
  mintValue: 0,
  inputData: "",
  logs: [],
});
//@ts-ignore
const keyList = (keyList: any) => (toolModel.keyList = keyList);

</script>
<template>
  <div class="container-mint">
    <div class="state justify-between">
      <div class="text-kd16px22px font-medium text-global-highTitle">一键 Mint NFT</div>
      <div>
        <Chain />
      </div>
    </div>
    <!--    卡片-->
    <Card class="mt-4" :toolModel="toolModel" />
    <!--    节点选择-->
    <Node class="mt-4" :toolModel="toolModel" />
    <!--    hash 或者 合约地址-->
    <Address class="mt-4" :toolModel="toolModel" />
    <!--    私钥-->
    <Key class="mt-4" :toolModel="toolModel" @keyCall="keyList" />
    <!--    Gas-->
    <Gas class="mt-4" :toolModel="toolModel" />
    <!--    Mint日志-->
    <Log class="mt-4" :toolModel="toolModel" />
    <!--    首页 info 和 Mint按钮-->
    <Info class="mt-4" />
    <!--Mint-->
    <Button type="auto" :toolModel="toolModel" />
  </div>
</template>
<style lang="scss">
.container-mint {
  @apply max-w-200 mx-auto p-4 md:pt-6 md:px-0;
}

.border-css {
  @apply p-4 border-1 border-global-highTitle border-opacity-10 rounded-kd6px;
}

.kd-input {
  .el-input__inner {
    border: 1px solid rgba(3, 54, 102, 0.04) !important;
    box-shadow: none;
    background: #fafbfc;
    height: 32px !important;
    //padding-left: 8px !important;
    border-radius: 4px !important;
    color: #111316 !important;
    @apply text-kd12px16px;
  }

  .input-info {
    @apply w-50 min-w-50;
  }
}

.button-mint {
  @apply bg-global-primary bg-opacity-6 rounded-kd4px;
  @apply h-8  px-2 md:px-3 text-kd14px18px   font-medium;
  @apply flex items-center text-global-primary flex-nowrap justify-center whitespace-nowrap cursor-pointer;
}
</style>
