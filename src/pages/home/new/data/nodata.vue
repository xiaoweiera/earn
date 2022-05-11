<script lang="ts" setup></script>
<template>
  <div class="border-1 rounded-kd6px bg top">
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-kd16px20px font-medium text-global-highTitle text-opacity-85">连接钱包</div>
      <div class="mt-1.5 text-kd13px18px text-global-highTitle text-opacity-85">自动监控资产变化，并给出投资建议</div>
      <div class="wallet-btn hand">
        <iconFont size="16" class="mr-0.5" type="icon-manage" />
        <div class="text-kd14px18px font-medium font-kdFang">链接钱包</div>
      </div>
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
