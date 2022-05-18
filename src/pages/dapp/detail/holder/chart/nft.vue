<script lang="ts" setup>
import HolderTab from "./tab.vue";
import { LegendDirection } from "src/types/echarts/type";
import { onMounted, reactive, ref } from "vue";
import { uuid } from "src/utils";
import I18n from "src/utils/i18n";
import { Model, holderDateList } from "src/logic/dapp/detail";

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
const chartData: any = ref({});

const onCustom = function (data: object) {
  return data;
};
const params = reactive({
  id: props.data.id,
  range: "30d",
});
const getData = async () => {
  const api = new Model();
  const data: any = await api.getUserData(params);
  chartData.value = data;
  dataKey.value = uuid();
};

const tabChange = function (value: HolderTab) {
  params.range = value.id;
  getData();
};
onMounted(function () {
  getData();
});
</script>

<template>
  <div>
    <!-- holder trends图表 -->
    <div class="w-full mt-7">
      <div class="w-full flex justify-between">
        <div class="text-kd16px22px text-global-highTitle font-kdFang font-medium">
          {{ i18n.dapp.detail.holder.nftTrend }}
        </div>
        <div>
          <HolderTab :data="holderDateList()" @change="tabChange" />
        </div>
      </div>
      <!-- 渲染图表 -->
      <div v-if="chartData.legends" :key="dataKey" class="w-full h-114.5 mt-2.5">
        <ui-echart-content custom-class="h-100" :legend="LegendDirection.custom" :data="chartData">
          <!--展示自定义图列-->
          <template #legend="scope">
            <div class="mr-7 cursor-pointer" :style="scope.style">
              <div class="legend-item">
                <p class="flex items-center">
                  <IconFont type="icon-round" size="8" />
                  <span class="text-kd12px18px text-global-highTitle text-opacity-65 ml-1">{{ scope.value }}</span>
                  <IconFont v-if="scope.data.index !== 0" class="text-global-highTitle text-opacity-25 ml-1.5" type="icon-info" size="14" />
                </p>
                <p class="pl-4 mt-0.5 text-kd14px18px text-global-highTitle font-medium font-kdFang">728,849</p>
                <p class="pl-4 mt-0.5 flex items-center text-kd12px18px text-global-numGreen font-medium font-kdInter">
                  <IconFont type="icon-zheng" size="6" />
                  <span>+24</span>
                </p>
              </div>
            </div>
          </template>
        </ui-echart-content>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.legend-item {
  @at-root .disabled & {
    @apply opacity-40;
  }
}
</style>
