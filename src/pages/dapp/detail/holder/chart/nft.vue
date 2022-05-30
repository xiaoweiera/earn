<script lang="ts" setup>
import HolderTab from "./tab.vue";
import { LegendDirection } from "src/types/echarts/type";
import { PropType, ref } from "vue";
import { uuid, toNumberCashFormat } from "src/utils";
import I18n from "src/utils/i18n";
import { holderDateList, getData } from "src/logic/dapp/detail";
import { ProjectItem } from "src/types/dapp/detail";
import { DAppProject } from "src/types/dapp/data";
import { getTitle } from "src/pages/home/topic/data";
import { getClassColor, getIcon } from "src/logic/dapp";

defineProps({
  data: {
    required: true,
    type: Object as PropType<ProjectItem>,
  },
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
});
const dataKey = ref<string>(uuid());
const i18n = I18n();

const range = ref("30d");

const tabChange = function (value: any) {
  if (range.value === value.id) return false;
  range.value = value.id;
  dataKey.value = uuid();
};
</script>

<template>
  <div>
    <!-- holder trends图表 -->
    <div class="w-full mt-7">
      <div class="w-full flex justify-between">
        <div class="text-kd16px22px text-global-highTitle font-kdFang font-semibold">
          {{ i18n.dapp.detail.holder.nftTrend }}
        </div>
        <div>
          <HolderTab :data="holderDateList()" @change="tabChange" />
        </div>
      </div>
      <!-- 渲染图表 -->
      <div :key="dataKey" class="w-full h-114.5 mt-2.5">
        <ui-echart-dapp :id="project.id" :legend="LegendDirection.custom" custom-class="h-100" :start="getData(range)" unit="HOUR" :fields="['volumeWithWhales', 'volumeWithBlueChipHolder']">
          <!--展示自定义图列-->
          <template #legend="scope">
            <div class="mr-7 cursor-pointer" :style="scope.style">
              <div class="legend-item">
                <p class="flex items-center">
                  <IconFont type="icon-round" size="8" />
                  <span class="text-kd12px18px text-global-highTitle text-opacity-65 ml-1">{{ getTitle(scope.value) }}</span>
                  <!--                  <IconFont v-if="scope.data.index !== 0" class="text-global-highTitle text-opacity-25 ml-1.5" type="icon-info" size="14" />-->
                </p>
                <p class="pl-4 mt-0.5 text-kd14px18px text-global-highTitle font-medium font-kdFang">{{ toNumberCashFormat(scope.data.last) }}</p>
                <p class="pl-4 mt-0.5 flex items-center text-kd12px18px font-medium font-kdInter" :class="scope.data.index === 0 ? getClassColor(data.volumeWithWhales_24h) : getClassColor(data.volumeWithBlueChipHolder_24h)">
                  <IconFont :type="scope.data.index === 0 ? getIcon(data.volumeWithWhales_24h) : getIcon(data.volumeWithBlueChipHolder_24h)" size="6" />
                  <span>{{ scope.data.index === 0 ? toNumberCashFormat(data.volumeWithWhales_24h) : toNumberCashFormat(data.volumeWithBlueChipHolder_24h) }}</span>
                </p>
              </div>
            </div>
          </template>
        </ui-echart-dapp>
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
