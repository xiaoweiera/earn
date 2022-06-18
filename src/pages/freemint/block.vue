<script setup lang="ts">
import Card from "./tool/ui/card/index.vue";
import Key from "./tool/ui/key.vue";
import Log from "./tool/ui/log/index.vue";
import Node from "./tool/ui/node.vue";
import Button from "./tool/ui/button.vue";
import BaseInfo from "./tool/ui/baseinfo/index.vue";
import Keyword from "./tool/ui/keyword.vue";
</script>
<template>
  <div class="container-mint">
    <!--    卡片-->
    <Card />
    <!--    节点选择-->
    <Node class="mt-4" />
    <!--    私钥-->
    <Key class="mt-4" />
    <!--    基础信息-->
    <BaseInfo class="mt-4" />
    <!--    NFT 关键词搜索-->
    <Keyword class="mt-4" />
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
    <Button type="auto" />
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
  @apply h-8 px-3 text-kd14px18px font-medium;
  @apply flex items-center text-global-primary flex-nowrap justify-center whitespace-nowrap cursor-pointer;
}
</style>
