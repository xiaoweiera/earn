<script setup lang="ts">
import { toNumberCashFormat } from "src/utils/convert/to";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
const i18n = I18n();

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const getNumber = (value: any) => {
  if (value > 0) {
    return `+${toNumberCashFormat(value)}`;
  } else if (value === 0) {
    return 0;
  } else if (value < 0) {
    return `-${toNumberCashFormat(value)}`;
  }
  return "";
};
const getColor = (value: any) => {
  if (value > 0) {
    return "green-value";
  } else if (value < 0) {
    return "red-value";
  }
  return "default-color";
};
</script>
<template>
  <div class="kd-container">
    <div class="kd-title">
      <p class="title font-kdSemiBold">{{ i18n.home.title }}</p>
      <p class="des i8n-font-inter">{{ i18n.home.twoTitle }}</p>
    </div>
    <div class="kd-content">
      <div class="info-item">
        <div>
          <ui-popover class="break-words" placement="bottom" width="auto" trigger="hover">
            <template #reference>
              <div class="flex justify-end cursor-pointer flex items-center max-w-fit">
                <div class="item-name name-scale mr-1">{{ i18n.home.platData.avgAth }}</div>
                <IconFont size="12" class="kd-info" type="icon-infoNo" />
              </div>
            </template>
            <template #content>
              <div class="kd-info-content shadow">
                <div class="text-kd16px22px font-medium text-highTitle">{{ i18n.home.platData.desc.title }}</div>
                <div class="kd-info-amount">{{ i18n.home.platData.desc.content }}</div>
              </div>
            </template>
          </ui-popover>
        </div>
        <div class="info-des number-value text-number kd-info-number" :class="getColor(data.avg_ath)">{{ toNumberCashFormat(data.avg_ath, "x") }}</div>
      </div>
      <div class="info-item">
        <div class="item-name name-scale w-full text-left">{{ i18n.home.platData.nft }}</div>
        <div class="info-des">
          <span class="number-value text-number text-global-white whitespace-nowrap">{{ toNumberCashFormat(safeGet(data, "nft.total")) }}</span>
          <span class="time time-scale font-kdFang text-global-white">24H</span>
          <span class="number-rate text-number" :class="getColor(safeGet(data, 'nft.increase_24h'))">{{ getNumber(safeGet(data, "nft.increase_24h")) }}</span>
        </div>
      </div>
      <div class="info-item">
        <div class="item-name name-scale">{{ i18n.home.platData.ido }}</div>
        <div class="info-des">
          <span class="number-value text-number text-global-white whitespace-nowrap">{{ toNumberCashFormat(safeGet(data, "ixo.total")) }}</span>
          <span class="time time-scale font-kdFang text-global-white">24H</span>
          <span class="number-rate text-number" :class="getColor(safeGet(data, 'ixo.increase_24h'))">{{ getNumber(safeGet(data, "ixo.increase_24h")) }}</span>
        </div>
      </div>
      <div class="info-item">
        <div class="item-name name-scale">{{ i18n.home.platData.air }}</div>
        <div class="info-des">
          <span class="number-value text-number text-global-white whitespace-nowrap">{{ toNumberCashFormat(safeGet(data, "airdrop.total")) }}</span>
          <span class="time time-scale font-kdFang text-global-white">24H</span>
          <span class="number-rate text-number" :class="getColor(safeGet(data, 'airdrop.increase_24h'))">{{ getNumber(safeGet(data, "airdrop.increase_24h")) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.kd-info-amount {
  @apply mt-1 md:mt-1.5 text-kd12px16px md:text-kd14px22px text-global-highTitle text-opacity-45;
}
.kd-info-content {
  @apply font-kdFang p-2 md:p-4  w-65 md:w-105 absolute top-2 z-100 bg-global-white rounded-kd4px;
}
.kd-info-number {
  @apply min-h-5 md:pr-1;
}
.kd-container {
  @apply w-full md:flex justify-between items-center md:flex-wrap;
}
.kd-title {
  @apply md:flex-1 md:min-w-105;
}
.kd-content {
  @apply flex items-center md:w-140 w-full justify-between md:justify-end flex-wrap md:flex-nowrap md:mt-0 mt-6;
}
.kd-info {
  @apply text-global-white text-opacity-65 relative right-1 md:ml-1;
}
.green-value {
  color: #00ff29;
}
.shadow {
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
}
.red-value {
  color: red;
}
.default-color {
  @apply text-global-white;
}
.title {
  @apply text-kd32px32px md:text-kd40px40px font-semibold text-global-white;
}
.des {
  @apply mt-3 text-kd13px18px  md:text-kd14px18px text-global-white text-opacity-85;
}

.info-item {
  //@apply md:w-40.75 md:min-h-11 min-h-10.5 w-max;
  @apply md:pl-9 md:min-h-11 min-h-10.5 w-max;
  .info-des {
    @apply mt-1 md:mt-2 flex justify-begin ml-2 md:ml-0 md:justify-end items-center;
  }
  .number-value {
    @apply text-kd12px16px md:text-kd20px20px font-bold;
  }
  .time {
    @apply px-1 py-0.5 md:mx-1.5 text-kd12px16px font-medium;
    @apply bg-global-white bg-opacity-25 rounded-kd4px;
  }
  .number-rate {
    @apply text-kd12px16px md:text-kd16px18px font-bold;
  }
}
.item-name {
  @apply whitespace-nowrap text-right text-kd10px16px md:text-kd12px16px font-medium font-kdFang text-global-white text-opacity-65;
}
@media screen and (max-width: 768px) {
  .name-scale {
    transform: scale(0.83);
  }
  .time-scale {
    transform: scale(0.66);
  }
}
@media screen and (min-width: 768px) {
  .name-scale {
    transform: scale(1);
  }
  .time-scale {
    transform: scale(1);
  }
}
</style>
