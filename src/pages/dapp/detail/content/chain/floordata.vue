<script lang="ts" setup>
import I18n from "src/utils/i18n";
import { reactive, ref } from "vue";
import { Model, dateList, getData } from "src/logic/dapp/detail";
import { uuid, toNumberCashFormat } from "src/utils";
import { LegendDirection } from "src/types/echarts/type";

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const dataKey = ref<string>(uuid());
const i18n = I18n();

const range = ref("30d");
const tabClick = function (value: any) {
  if (range.value === value.id) return false;
  range.value = value.id;
  dataKey.value = uuid();
};
</script>

<template>
  <div>
    <div class="w-full flex flex-row justify-between">
      <p class="text-global-highTitle text-kd16px24px">
        <span>{{ i18n.dapp.project.floorPrice }}</span>
      </p>
      <p class="inline-flex items-center p-1 rounded-md bg-global-highTitle bg-opacity-4 cursor-pointer">
        <span v-for="item in dateList()" :key="item.id" :class="range === item.id ? 'active' : ''" class="change-tab" @click="tabClick(item)">{{ item.name }}</span>
      </p>
    </div>
    <!--    <div v-if="chartData.current" class="h-9 flex">-->
    <!--      <div class="flex flex-col justify-between">-->
    <!--        <p class="flex items-center">-->
    <!--          <span class="inline-block w-2 h-2 bg-global-darkblue rounded mr-1.5"></span>-->
    <!--          <span class="text-kd12px16px text-global-highTitle text-opacity-65">{{ i18n.dapp.project.floorPrice }}</span>-->
    <!--        </p>-->
    <!--        <p class="text-kd18px18px text-global-highTitle">{{ toNumberCashFormat(chartData.current.floor_price, chartData.legends[0].unit) }}</p>-->
    <!--      </div>-->
    <!--    </div>-->
    <div :key="dataKey" class="w-full h-114.5 mx-auto md:mt-2">
      <ui-echart-dapp :id="data.id" :legend="LegendDirection.custom" custom-class="h-100" :start="getData(range)" unit="DAY" :fields="['price']">
        <template #legend="scope">
          <div class="mr-7 cursor-pointer" :style="scope.style">
            <div class="legend-item">
              <p class="flex items-center">
                <IconFont type="icon-round" size="8" />
                <span class="text-kd12px18px text-global-highTitle text-opacity-65 ml-1">{{ scope.value }}</span>
              </p>
              <p class="pl-4 mt-0.5 text-kd14px18px text-global-highTitle font-medium font-kdFang">{{ toNumberCashFormat(scope.data.last) }}</p>
            </div>
          </div>
        </template>
      </ui-echart-dapp>
    </div>
    <!--    <div v-if="chartData.legends" :key="dataKey" class="w-full h-48 mx-auto md:mt-2">-->
    <!--      <ui-echart-content :custom="onCustom" :data="chartData" class="h-full" />-->
    <!--    </div>-->
    <div class="w-full h-0.25 bg-global-highTitle bg-opacity-6 my-6"></div>
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
.legend-item {
  @at-root .disabled & {
    @apply opacity-40;
  }
}
</style>
