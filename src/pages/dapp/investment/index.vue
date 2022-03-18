<script setup lang="ts">
import DAppInvestProject from "src/pages/dapp/investment/project.vue"
import DAppInvestAd from "src/pages/dapp/investment/ad.vue"
import DAppInvestFunds from "src/pages/dapp/investment/funds.vue"
</script>

<template>
  <div>
    <!-- 项目 -->
    <div>
      <DAppInvestProject/>
    </div>
    <!-- 广告位 -->
    <div>
      <DAppInvestAd/>
    </div>
    <!-- 机构 -->
    <div>
      <DAppInvestFunds/>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>