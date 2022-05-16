<script setup lang="ts">
/**
 * @file 图表
 * @auth svon.me@gmail.com
 */

import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import { ref, reactive } from "vue";
import { makeSvg } from "src/logic/ui/echart/svg";
import type { PropType } from "vue";
import type { Callback } from "src/types/common";
import type { EchartData, SeriesType } from "src/types/echarts/type";
import { Position, LegendDirection, EchartsOptionName } from "src/types/echarts/type";

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<EchartData>,
  },
  custom: {
    type: Function as PropType<Callback>,
    default: null,
  },
  legend: {
    type: String as PropType<LegendDirection>,
    default: () => LegendDirection.bottom,
  },
  // 自定义 class
  customClass: {
    type: String,
    default: "",
  },
});

import { useRefProvide } from "src/utils/use/state";

const [legendCallback] = useRefProvide<Callback>(EchartsOptionName.legendEvent);

const legends = ref<object[]>([]);
const selected = reactive<object>({});

const onCustom = function (option: object): object {
  const data = safeGet<object>(option, "legend");
  legends.value = safeGet<object[]>(data, "data");
  _.each(safeGet<object>(data, "selected"), function (value: boolean, name: string) {
    // @ts-ignore
    selected[name] = !value;
  });
  if (props.custom) {
    return props.custom(option);
  }
  return option;
};

const makeIcon = function (data: object) {
  const type = safeGet<SeriesType>(data, "value.type");
  return makeSvg(type);
};

const onChangeLegend = function (data: object): void {
  const onChange = legendCallback.value;
  if (onChange && _.isFunction(onChange)) {
    const name = safeGet<string>(data, "name");
    onChange(name);
  }
};

const getClassName = function () {
  const array: string[] = [];
  if (props.customClass) {
    array.push(props.customClass);
  }
  if (props.legend !== LegendDirection.custom) {
    array.push("h-full");
  }
  return array;
};
</script>

<template>
  <div>
    <div v-if="legend === LegendDirection.custom" class="flex flex-wrap">
      <template v-for="(item, index) in legends" :key="index">
        <div :class="{ disabled: selected[item.name] }" @click="onChangeLegend(item)">
          <slot name="legend" :icon="makeIcon(item)" :style="item.itemStyle" :value="item.name" :disabled="!selected[item.name]" :data="item.value"></slot>
        </div>
      </template>
    </div>
    <ui-echart :class="getClassName()" :custom="onCustom" :legend="legend">
      <!--提示框-->
      <ui-echart-tooltip />
      <!--x轴数据-->
      <ui-echart-xaxis :value="data.xAxis" />
      <!--Y轴数据-->
      <ui-echart-yaxis :index="0" :unit="data.yAxis.left" />
      <ui-echart-yaxis :index="1" :unit="data.yAxis.right" :position="Position.right" />
      <!--图表数据-->
      <template v-for="(item, index) in data.legends" :key="index">
        <ui-echart-legend :index="index" :position="item.kline ? Position.right : Position.left" :value="item.name" :type="item.type" :color="item.color" />
        <ui-echart-series :index="index" :value="data.series[index]" />
      </template>
    </ui-echart>
  </div>
</template>
