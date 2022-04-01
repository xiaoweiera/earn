<script lang="ts" setup>
import Operation from "src/pages/dapp/airdrop/content/hot/operation.vue";
import Potential from "src/pages/dapp/airdrop/content/hot/potential.vue";
import I18n from "src/utils/i18n";

const i18n = I18n();
</script>

<template>
  <div>
    <!-- 运营精选 -->
    <div class="j-operation-title">
      <h3 class="text-16-24 flex items-center">
        <IconFont class="text-global-gemstone" type="icon-jiangbei" size="20" />
        <span class="ml-1.5 text-global-highTitle text-opacity-85">{{ i18n.airdrop.tabs.hot }}</span>
      </h3>
    </div>
    <div class="mt-3">
      <Operation />
    </div>
    <!-- 优质空投 -->
    <div class="mt-10 j-potential-title">
      <h3 class="flex items-center text-16-24">
        <IconFont class="text-global-gemstone" type="icon-recommend" size="20" />
        <span class="ml-1.5 text-global-highTitle text-opacity-85">{{ i18n.airdrop.tabs.potential }}</span>
      </h3>
    </div>
    <div class="mt-3">
      <Potential />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
