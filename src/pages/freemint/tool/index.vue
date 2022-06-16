<script setup lang="ts">
import Card from "./card/index.vue";
import Address from "./address.vue";
import Gas from "./gas.vue";
import Key from "./key.vue";
import Log from "./log/index.vue";
import Node from "./node.vue";
import Button from "./button.vue";
</script>
<template>
  <div class="container-mint">
    <Card />
    <Node class="mt-4" />
    <Address class="mt-4" />
    <Key class="mt-4" />
    <Gas class="mt-4" />
    <Log class="mt-4" />
    <!--info-->
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
</style>
