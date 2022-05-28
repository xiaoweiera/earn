<script setup lang="ts">
/**
 * @file dapp 相关图表
 * @auth svon.me@gmail.com
 */

import API from "src/api";
import { LegendDirection } from "src/types/echarts/type";
import { onMounted, reactive, watch } from "vue";
import { onUpdateReactive } from "src/utils/ssr/ref";
import { TimeUnit, ProjectType } from "src/types/echarts/data";

import type { Callback } from "src/types/common";
import type { PropType } from "vue";
import type { EchartData } from "src/types/echarts/type";

const props = defineProps({
  // 项目 id
  id: {
    required: true,
    type: [String, Number] as PropType<string | number>,
  },
  /**
   * 开始时间
   * @param 2020-01-01 或者 时间戳
   */
  start: {
    required: true,
    type: [String, Number] as PropType<string | number>,
  },
  // 结束时间
  end: {
    type: [String, Number] as PropType<string | number>,
    default() {
      // 默认当前时间
      return Date.now();
    },
  },
  // 时间颗粒度
  unit: {
    type: String as PropType<TimeUnit>,
    default() {
      // 默认小时
      return TimeUnit.hour;
    },
  },
  // 查询的字段
  fields: {
    required: true,
    type: [String, Array] as PropType<string | string[]>,
  },
  // 项目类型
  type: {
    required: false,
    type: String as PropType<ProjectType>,
    default: "",
  },
  // 项目公链
  chains: {
    required: false,
    type: [String, Array] as PropType<string | string[]>,
    default: () => [],
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

const chart = reactive<EchartData>({} as EchartData);

const onUpdateChartData = onUpdateReactive(chart, async function () {
  const api = new API();
  const query = {
    id: props.id,
    timeUnit: props.unit,
    start: props.start,
    end: props.end,
    fields: props.fields,
  };
  // 第一个参数：查询参数
  // 第二个参数: 项目类型 [dapp / nft] 【可为空】
  // 第三个参数: 公链 【可为空】
  return api.chart.dapp(query, props.type, props.chains);
});
onMounted(() => {
  onUpdateChartData();
  // 监听 props 数据变化
  watch(
    props,
    () =>
      function () {
        // 重新渲染视图
        onUpdateChartData();
      },
  );
});
</script>

<template>
  <div>
    <div v-if="chart.key" class="" :class="{ 'h-full': !customClass }">
      <ui-echart-content :class="{ 'h-full': !customClass }" :custom-class="customClass" :legend="legend" :custom="custom" :data="chart">
        <template #legend="scope">
          <slot name="legend" :icon="scope.icon" :style="scope.style" :value="scope.value" :disabled="scope.disabled" :data="scope.data"></slot>
        </template>
      </ui-echart-content>
    </div>
  </div>
</template>
