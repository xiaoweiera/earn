<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { toNumberCashFormat } from "src/utils/convert/to";
import { getNumberColor } from "src/lib/tool";
import { address } from "src/logic/common/wallet";
import Chart from "./chart.vue";
import Tip from "./tip.vue";
import I18n from "src/utils/i18n";
const i18n = I18n();
import { Model } from "src/logic/home";
const param = {
  address: address.value ? address.value : "0x6cf9aa65ebad7028536e353393630e2340ca6049",
  chain: "all",
};
const data: any = ref({});
const getData = async () => {
  const api = new Model();
  data.value = await api.getHistory(param);
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div v-if="data" class="p-4 min-h-54.5 flex flex-col bg-global-white rounded-kd6px font-kdFang">
    <div class="flex flex-1 justify-between">
      <div class="flex-1">
        <div class="text-kd14px18px font-medium text-global-highTitle text-opacity-85">{{ i18n.home.new.fund }}</div>
        <div class="mt-2 flex items-center">
          <span class="mr-1 text-kd14px18px font-medium text-global-highTitle text-opacity-65">≈</span>
          <span class="text-kd26px26px text-global-highTitle text-opacity-85 text-number whitespace-pre-wrap">{{ toNumberCashFormat(data.fund, "$") }}</span>
        </div>
        <IconFont v-if="data['earning_rate'] >= 0" class="mr-1" size="12" type="icon-zheng" />
        <IconFont v-else class="mr-1" size="10" type="icon-fu" />
        <span v-if="data['earning_rate']" class="mr-1 text-kd16px18px text-number" :class="getNumberColor(data['earning_rate'])">{{ toNumberCashFormat(data.earning_rate) }}%</span>
      </div>
      <Chart class="w-54 md:w-86.75" />
    </div>
    <div class="mt-2 h-11.5 pt-2 flex items-center justify-between fen">
      <div class="he">
        <div class="name">{{ i18n.address.money.deposit }}</div>
        <div class="flex items-center mt-0.5">
          <span class="yue mr-0.5">≈</span>
          <span class="zhi text-number">{{ toNumberCashFormat(data["stacked_usd_value"], "$") }}</span>
        </div>
      </div>
      <div class="gang"></div>
      <div class="he">
        <div class="name">{{ i18n.address.money.liabilities }}</div>
        <div class="flex items-center mt-0.5">
          <span class="yue mr-0.5">≈</span>
          <span class="zhi text-number">{{ toNumberCashFormat(data["debt_usd_value"], "$") }}</span>
        </div>
      </div>
      <div class="gang"></div>
      <div class="he">
        <div class="flex items-center">
          <div class="name mr-1">{{ i18n.address.money.earnings }}</div>
          <Tip :data="data" />
        </div>
        <div class="flex items-center mt-0.5">
          <span class="yue mr-0.5">≈</span>
          <span class="zhi text-number">{{ toNumberCashFormat(data["earn_usd_value"], "$") }}</span>
        </div>
      </div>
      <div class="gang"></div>
      <div class="he">
        <div class="flex items-center">
          <div class="name mr-1">APY</div>
          <Tip :data="data" />
        </div>
        <div class="flex items-center mt-0.5">
          <span class="yue mr-0.5">≈</span>
          <span class="zhi text-number">{{ toNumberCashFormat(data["apy"], "%") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.fen {
  border-top: 1px solid rgba(3, 54, 102, 0.06);
}
.gang {
  border-left: 1px solid rgba(3, 54, 102, 0.06);
  @apply h-9.5 m-1;
}
.he {
  @apply w-17.4 md:w-24 px-1 md:px-2;
}
.name {
  @apply text-kd12px18px text-global-highTitle text-opacity-65;
}
.yue {
  @apply text-kd14px18px text-global-highTitle text-opacity-25 font-medium;
}
.zhi {
  @apply text-kd14px16px text-global-highTitle text-opacity-85;
}
</style>
