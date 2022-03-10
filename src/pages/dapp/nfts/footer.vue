<script setup lang="ts">
import { toNumberFormat, valueFormat } from "src/utils/convert/to";
import { getLog } from "src/logic/dapp";
import I18n from "src/utils/i18n";
import DappNftsTime from "./time.vue";
const i18n = I18n();

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <div v-if="data">
    <div class="w-full h-39.5 px-4 pt-7 text-global-white">
      <!-- 项目名称 -->
      <div class="flex items-end max-h-9 h-9">
        <span
          class="max-w-full inline-flex items-end h-full text-kd16px16px text-global-white font-semibold font-kdBarlow"
          >{{ data.name }}</span
        >
        <IconFont v-if="data.chain" :type="getLog(data.chain)" size="16" class="h-full items-end ml-2" />
      </div>
      <!-- 价格总量 -->
      <div class="nft-price h-10 flex justify-between items-center border-b-1 border-global-white border-opacity-15">
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">{{
            i18n.home.nftProject.price
          }}</span>
          <span class="text-kd14px20px font-kdBarlow ml-1 font-medium">{{ toNumberFormat(data.mint_price) }}</span>
          <IconFont v-if="data.chain" :type="getLog(data.chain)" size="14" class="ml-2 text-global-white" />
        </p>
        <p class="h-4 border-l-1 border-global-white border-opacity-15" />
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">{{
            i18n.home.nftProject.supply
          }}</span>
          <span class="text-kd14px20px font-kdBarlow ml-1 font-medium">{{ valueFormat(data.issue_volume) }}</span>
        </p>
      </div>
      <!-- 时间 -->
      <div class="relative z-1">
        <DappNftsTime :value="data" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.small {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.nft-price {
  filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.24));
}
</style>
