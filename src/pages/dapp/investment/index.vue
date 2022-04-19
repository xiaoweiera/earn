<script setup lang="ts">
import DAppInvestProject from "src/pages/dapp/investment/project.vue";
import DAppInvestAd from "src/pages/dapp/investment/ad.vue";
import DAppInvestFunds from "src/pages/dapp/investment/funds.vue";
import { onMounted } from "vue";
import * as track from "src/logic/track";

onMounted(() => {
  // 上报数据
  track.push(track.Origin.gio, track.event.dApp.invest);
});
</script>

<template>
  <div class="pt-8 pb-16 max-w-315 mx-auto px-3 md:px-0">
    <!-- 项目 -->
    <div class="j-project-title">
      <DAppInvestProject />
    </div>
    <!-- 广告位 -->
    <div class="mt-10 md:mt-12">
      <DAppInvestAd />
    </div>
    <!-- 机构 -->
    <div class="mt-8 md:mt-12">
      <DAppInvestFunds class="j-funds-title" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
