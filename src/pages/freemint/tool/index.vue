<script setup lang="ts">
import Card from "./card/index.vue";
import Address from "./address.vue";
import Gas from "./gas.vue";
import Key from "./key.vue";
import Log from "./log/index.vue";
import Node from "./node.vue";
import Button from "./button.vue";
import Baseinfo from "./baseinfo/index.vue";
import Keyword from "./keyword.vue";
</script>
<template>
  <div class="container-mint">
    <!--    NFT 关键词搜索-->
    <Keyword />
    <!--    基础信息-->
    <Baseinfo />
    <!--    卡片-->
    <Card />
    <!--    节点选择-->
    <Node class="mt-4" />
    <!--    hash 或者 合约地址-->
    <Address class="mt-4" />
    <!--    私钥-->
    <Key class="mt-4" />
    <!--    gas-->
    <Gas class="mt-4" />
    <!--    Mint日志-->
    <Log class="mt-4" />
    <!--    首页 info 和 Mint按钮-->
    <div class="flex items-center mt-4 mint-infos justify-center">
      <div class="flex items-center mr-12 des">
        <span>本次已 Mint：</span>
        <span class="number mr-1">1</span>
        <span class="mr-2">个合约</span>
        <span class="number mr-1">2</span>
        <span>个NFT</span>
      </div>
      <div class="flex items-center des">
        <span class="number mr-1">0.007</span>
        <span>ETH≈$4.21</span>
      </div>
    </div>
    <!--Mint-->
    <Button type="ok" />
  </div>
</template>
<style lang="scss">
.container-mint {
  @apply max-w-200 mx-auto pt-6;
}

.mint-infos {
  .des {
    @apply text-kd12px16px text-global-black-desc;
  }

  .number {
    @apply text-kd14px18px font-medium text-global-primary;
  }
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
    padding-left: 8px !important;
    border-radius: 4px !important;
    color: #111316 !important;
    @apply text-kd12px16px;
  }
  .input-info {
    @apply w-50 min-w-50;
  }
}
</style>
