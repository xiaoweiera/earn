<script setup lang="ts">
/**
 * @file 趋势效果
 * @auth svon.me@gmail.com
 */

import { reactive } from "vue";
import _ from "lodash";
import safeGet from "@fengqiaogang/safe-get";
import safeSet from "@fengqiaogang/safe-set";
import { Position, triggerType, LegendDirection } from "src/types/echarts/type";
import type { PropType } from "vue";
import type { Callback } from "src/types/common";
import type { EchartData, SeriesType } from "src/types/echarts/type";

const props = defineProps({
  // 设置固定的图表类型
  // 为空时取数据中的 type 值
  type: {
    type: String as PropType<SeriesType>,
    default: "",
  },
  data: {
    required: true,
    type: Object as PropType<EchartData>,
  },
  custom: {
    type: Function as PropType<Callback>,
    default: null,
  },
});

const grid = reactive<object>({
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
});

const setHidden = function (data: object, key: string) {
  const xAxis = safeGet<object[] | object>(data, key);
  if (_.isArray(xAxis)) {
    for (const item of xAxis) {
      safeSet(item, "show", false);
    }
  } else {
    safeSet(xAxis, "show", false);
  }
};

const onCustom = function (data: object): object {
  setHidden(data, "xAxis");
  setHidden(data, "yAxis");
  safeSet(data, "graphic", null);
  safeSet(data, "tooltip.show", false);
  if (props.custom) {
    return props.custom(data);
  }
  return data;
};
</script>

<template>
  <div>
    <ui-echart bg-color="rgba(255, 255, 255, 0)" :area="true" :custom="onCustom" class="h-full" :legend="LegendDirection.custom" :grid="grid" :show-loading="false">
      <!--提示框-->
      <ui-echart-tooltip :trigger="triggerType.none" />
      <!--x轴数据-->
      <ui-echart-xaxis :value="data.xAxis" />
      <!--Y轴数据-->
      <ui-echart-yaxis :index="0" :unit="data.yAxis.left" />
      <ui-echart-yaxis :index="1" :unit="data.yAxis.right" :position="Position.right" />
      <!--图表数据-->
      <template v-for="(legend, index) in data.legends" :key="index">
        <ui-echart-legend :index="index" :position="legend.kline ? Position.right : Position.left" :value="legend.name" :type="type ? type : legend.type" :color="legend.color" />
        <ui-echart-series :index="index" :value="data.series[index]" />
      </template>
    </ui-echart>
  </div>
</template>
