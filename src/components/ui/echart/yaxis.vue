<script lang="ts" setup>
/**
 * @file 竖轴数据
 * @author svon.me@gmail.com
 */

import type { PropType } from "vue";
import { onBeforeMount } from "vue";
import { isNumber } from "src/utils/";
import type { Callback } from "src/types/common/";
import safeSet from "@fengqiaogang/safe-set";
import { layout } from "src/types/echarts/colors";
import { setInject, getRefInject } from "src/utils/use/state";
import { EchartsOptionName, Position } from "src/types/echarts/type";

const props = defineProps({
  type: {
    type: String,
    default: () => "value",
  },
  formatter: {
    type: Function as PropType<Callback>,
    default: null,
  },
  // 数据下标
  index: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: null,
  },
  max: {
    type: Number,
    default: null,
  },
  // 单位
  unit: {
    type: String,
    default: "",
  },
  // 根据 position 设置默认值
  color: {
    type: String,
    default: "",
  },
  // 展示位置
  position: {
    type: String,
    default: () => Position.left,
    validator(value: string): boolean {
      return value === Position.left || value === Position.right;
    },
  },
});

const yAxis = getRefInject<object[]>(EchartsOptionName.yAxis);
const set = setInject(EchartsOptionName.yAxis);

onBeforeMount(function () {
  const option = {
    type: props.type,
    position: props.position,
    axisLabel: {
      // formatter: function(value: string | number, option: object = {}) {
      //   const data: any = {
      //     value: `${value}`,
      //     unit: props.unit
      //   };
      //   const res = valueFormatter(data);
      //   if (props.formatter) {
      //     return props.formatter({
      //       ...option,
      //       value: res
      //     });
      //   }
      //   return res;
      // }
    },
  };
  if (isNumber(props.min)) {
    safeSet(option, "min", props.min);
  }
  if (isNumber(props.max)) {
    safeSet(option, "max", props.max);
  }

  const colorKey = "axisLabel.textStyle.color";
  if (props.color) {
    safeSet(option, colorKey, props.color);
  } else if (props.position === Position.left) {
    safeSet(option, colorKey, layout.leftColor);
  } else if (props.position === Position.right) {
    safeSet(option, colorKey, layout.rightColor);
  }
  if (yAxis && set && isNumber(props.index)) {
    const arr = yAxis.value;
    arr[props.index] = option;
    set(arr);
  }
});
</script>

<template>
  <p>yAxis</p>
</template>
