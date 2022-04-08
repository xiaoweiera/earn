<script lang="ts" setup>
import I18n from "src/utils/i18n";
import { onMounted, reactive, ref } from "vue";
import { Model } from "src/logic/dapp/detail";
import type { DataQuery } from "src/types/dapp/data";
import { toNumberCashFormat } from "src/utils";

const props = defineProps({
  id: {
    type: Number,
    default() {
      return 0;
    },
  },
});
const i18n = I18n();
const chartData: any = ref({});

const onCustom = function (data: object) {
  return data;
};
const params = reactive({
  id: props.id,
  range: "30d",
});
const tab = [
  { id: "30d", name: "30D" },
  { id: "all", name: "All" },
];
const getData = async () => {
  const api = new Model();
  const data: any = await api.getUserData(params);
  chartData.value = data;
};
const tabClick = function (value: any) {
  if (params.range === value.id) return false;
  params.range = value.id;
  getData();
};
onMounted(function () {
  getData();
});
</script>

<template>
  <div v-if="chartData" class="p-10">
    <div class="w-full flex flex-row justify-between">
      <p class="text-global-highTitle text-kd16px24px">
        <span>{{ i18n.dapp.rank.table.user }}</span>
        <span class="m-x-2">&</span>
        <span>{{ i18n.dapp.project.balance }}</span>
      </p>
      <p class="inline-flex items-center p-1 rounded-md bg-global-highTitle bg-opacity-4 cursor-pointer">
        <span v-for="item in tab" :key="item.id" :class="params.range === item.id ? 'active' : ''" class="change-tab" @click="tabClick(item)">{{ item.name }}</span>
      </p>
    </div>
    <div v-if="chartData.current" class="h-9 flex">
      <div class="flex flex-col justify-between">
        <p class="flex items-center">
          <span class="inline-block w-2 h-2 bg-global-darkblue rounded mr-1.5"></span>
          <span class="text-kd12px16px text-global-highTitle text-opacity-65">{{ i18n.dapp.rank.table.user }}</span>
        </p>
        <p class="text-kd18px18px text-global-highTitle">{{ toNumberCashFormat(chartData.current.users) }}</p>
      </div>
      <div class="ml-7 mr-8 flex items-center">
        <span class="inline-block h-2/3 w-0.25 bg-global-highTitle bg-opacity-10"></span>
      </div>
      <div class="flex flex-col justify-between">
        <p class="flex items-center">
          <span class="inline-block w-2 h-2 bg-global-money rounded mr-1.5"></span>
          <span class="text-kd12px16px text-global-highTitle text-opacity-65">{{ i18n.dapp.project.balance }}</span>
        </p>
        <p class="text-kd18px18px text-global-highTitle">{{ toNumberCashFormat(chartData.current.balance, chartData.right, "$") }}</p>
      </div>
    </div>
    <div v-if="chartData.legends" class="w-full h-48 mx-auto md:mt-2">
      <ui-echart-content :custom="onCustom" :data="chartData" class="h-full" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.change-tab {
  @apply min-w-8 inline-flex items-center justify-center text-kd12px16px font-kdFang text-global-highTitle text-opacity-65;
}
.active {
  background: #fefefe;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  @apply rounded py-0.5 px-1 text-global-darkblue font-medium;
}
</style>
