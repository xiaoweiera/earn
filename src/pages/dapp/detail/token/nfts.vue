<script setup lang="ts">
import I18n from "src/utils/i18n";
import { PropType } from "vue";
import { Currency } from "src/types/dapp/data";
import { toNumberCashFormat } from "src/utils/";

defineProps({
  list: {
    required: true,
    default: () => [],
    type: Array as unknown as PropType<Currency>,
  },
});
const i18n = I18n();
const priceUnit = "ETH";
</script>
<template>
  <div class="w-full h-full">
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.owners }}</span>
      <span>{{ toNumberCashFormat(list.owners, i18n.dapp.project.person) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.balance }}</span>
      <span>{{ toNumberCashFormat(list.assets) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.avgPrice }}</span>
      <span>{{ toNumberCashFormat(list.avg_price, priceUnit) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.avgFloorPrice }}</span>
      <span>{{ toNumberCashFormat(list.floor_price, priceUnit) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.highestYield }}</span>
      <span>{{ toNumberCashFormat(list.highest_yield, priceUnit) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.hoursUp }}</span>
      <span :class="list.price_change_percent_24h > 0 ? 'text-global-numGreen' : ''">{{ list.price_change_percent_24h > 0 ? toNumberCashFormat(list.price_change_percent_24h, "%", "+") : toNumberCashFormat(list.price_change_percent_24h, "%", "") }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.hoursSale }}</span>
      <span>{{ toNumberCashFormat(list.sold_24h) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.hoursTrading }}</span>
      <span>{{ toNumberCashFormat(list.volume_24h, priceUnit) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.totalVolume }}</span>
      <span>{{ toNumberCashFormat(list.total_volume, priceUnit) }}</span>
    </div>
    <div class="list">
      <span class="left-opacity">{{ i18n.dapp.project.marketCap }}</span>
      <span>{{ toNumberCashFormat(list.marketcap) }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.left-opacity {
  opacity: 0.65;
}
.list {
  @apply h-10 flex flex-row justify-between items-center text-kd13px18px text-global-highTitle border-b-1 border-global-highTitle border-opacity-4;
}
</style>
