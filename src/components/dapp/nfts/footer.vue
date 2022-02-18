<script setup lang="ts">

</script>
<template>
  <div>
    <div class="h-29 px-4 bg-global-textBlack text-global-white">
      <!-- 项目名称 -->
      <div>
        <span class="text-kd20px20px text-global-white font-semibold font-kdBarlow">Legion Network</span>
        <IconFont type="icon-star" size="16" class="ml-2"/>
      </div>
      <!-- 价格总量 -->
      <div class="h-11 flex justify-between items-center border-b-1 border-global-white border-opacity-15">
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">价格：</span>
          <span class="text-kd16px20px font-kdBarlow font-medium">0.05</span>
          <IconFont type="icon-star" size="12" class="ml-2"/>
        </p>
        <p class="h-4 border-l-1 border-global-white border-opacity-15"></p>
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">总量：</span>
          <span class="text-kd16px20px font-kdBarlow font-medium">10000</span>
        </p>
      </div>
      <!-- 时间 -->
      <div>
        <DappNftsTime></DappNftsTime>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>