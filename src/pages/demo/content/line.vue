<script lang="ts">
/**
 * @file 折线图
 * @auth svon.me@gmail.com
 */

import _ from "lodash";
import { defineComponent } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { SeriesType } from "src/types/echarts/type";
import { echartTransform } from "src/logic/ui/echart/decorate";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
    data: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      type: SeriesType.line,
    };
  },
  methods: {
    chartData(name: string, data: object) {
      let result = safeGet<number[][]>(data, name);
      if (!result) {
        result = [];
        for (let i = 0; i < 30; i++) {
          result.push([_.random(10, 200), Date.now()]);
        }
      }
      const series: number[] = [];
      const xAxis: number[] = [];
      _.forEach(result, function (item: number[]) {
        const [value, time] = item;
        series.push(value);
        xAxis.push(time);
      });
      const opt = {
        xAxis,
        legends: [{ id: 0, name: "", unit: "" }],
        series: [series],
      };
      return echartTransform(opt as any);
    },
  },
});
</script>

<template>
  <div>
    <client-only class="w-full h-10">
      <ui-echart-small :type="type" :data="chartData(name, data)" class="h-full" />
    </client-only>
  </div>
</template>
