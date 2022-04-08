<script lang="ts" setup>
/**
 * @file series 图表数据
 * @author svon.me@gmail.com
 */
import { isNumber, toInteger } from "src/utils/";
import { onBeforeMount, toRaw } from "vue";
import { setInject, getRefInject } from "src/utils/use/state";
import { EchartsOptionName } from "src/types/echarts/type";

const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
  area: {
    type: Boolean,
    default: () => false,
  },
  // 数据下标
  index: {
    type: Number,
    required: true,
  },
});

const list = getRefInject<object[]>(EchartsOptionName.series);
const set = setInject(EchartsOptionName.series);

const getData = function (index: number) {
  return {
    index,
    data: toRaw(props.value),
  };
};

const sync = function () {
  if (list && set && isNumber(props.index)) {
    const arr = list.value;
    arr[props.index] = getData(toInteger(props.index));
    set(arr);
  }
};
onBeforeMount(sync);
</script>

<template>
  <span class="hidden"></span>
</template>
