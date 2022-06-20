<script setup lang="ts"></script>
<template>
  <div class="md:flex items-center mt-4 mint-infos justify-center">
    <div class="flex items-center mr-12 des">
      <span>本次已 Mint：</span>
      <span class="number mr-1">1</span>
      <span class="mr-2">个合约</span>
      <span class="number mr-1">2</span>
      <span>个NFT</span>
    </div>
    <div class="flex items-center des mt-4 md:mt-0">
      <span class="number mr-1">0.007</span>
      <span>ETH≈$4.21</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.mint-infos {
  .des {
    @apply text-kd12px16px text-global-black-desc;
  }
  .number {
    @apply text-kd14px18px font-medium text-global-primary;
  }
}
</style>
