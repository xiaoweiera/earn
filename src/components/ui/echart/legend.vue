<script lang="ts" setup>
/**
 * @file 图例
 * @author svon.me@gmail.com
 */

import type { PropType } from "vue";
import { isNumber, toInteger } from "src/utils/";
import { onBeforeMount } from "vue";

import { setInject, getRefInject } from "src/utils/use/state";
import { colors, layout } from "src/types/echarts/colors";
import { EchartsOptionName, Position, SeriesType, LegendData } from "src/types/echarts/type";
import safeSet from "@fengqiaogang/safe-set";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  // 图列对应的图形类型
  type: {
    type: String as PropType<SeriesType>,
    // 默认为线图
    default: () => SeriesType.line,
  },
  show: {
    type: Boolean,
    default: () => true,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  color: {
    type: String,
    default: "",
  },
  // 数据下标
  index: {
    type: Number,
    required: true,
  },
  // 展示位置
  position: {
    type: String as PropType<Position>,
    default: () => Position.left,
    validator(value: string): boolean {
      return value === Position.left || value === Position.right;
    },
  },
});

const legendList = getRefInject<object[]>(EchartsOptionName.legend);
const set = setInject(EchartsOptionName.legend);

const getData = function (index: number): LegendData {
  const data: LegendData = {
    index,
    name: props.value,
    type: props.type,
    show: props.show,
    disabled: props.disabled,
    position: props.position,
  };
  if (props.color) {
    safeSet(data, "itemStyle.color", props.color);
  } else {
    if (props.position === Position.right) {
      // 设置为价格颜色
      safeSet(data, "itemStyle.color", layout.rightColor);
    } else {
      // 给左侧数据，设置默认颜色
      safeSet(data, "itemStyle.color", colors[index]);
    }
  }

  return data;
};

const sync = function () {
  // @ts-ignore
  if (set && legendList && isNumber(props.index)) {
    const arr = legendList.value;
    arr[props.index] = getData(toInteger(props.index));
    set(arr);
  }
};

onBeforeMount(sync);
</script>
<template>
  <span class="hidden"></span>
</template>
