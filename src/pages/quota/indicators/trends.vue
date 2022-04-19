<script lang="ts" setup>
import { computed, toRaw } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import * as quota from "src/types/quota/index";
import _ from "lodash";
import { toNumberCash, toNumberCashFormat } from "src/utils";

const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
});

const onCustom = function (data: object) {
  return data;
};

const chartData = computed(function () {
  const data = safeGet<quota.TrendData>(props.value, "trends.data");
  const name: Array<any> = [];
  const list: Array<any> = [];
  _.forEach(toRaw(data), function (item: number[]) {
    const [time, value] = item;
    name.push(time);
    list.push(value);
  });
  return { name, list };
});
</script>

<template>
  <div>
    <div class="w-full h-full">
      <ui-echart-content :custom="onCustom" :data="chartData.list" class="h-full" />
    </div>
    <div class="absolute left-4 bottom-4 z-1">
      <b class="block text-20 text-global-darkblue mb-2">{{ toNumberCash(value.last) }}</b>
      <span v-if="value.change > 0" class="flex items-center text-global-numGreen text-14-16">
        <span>{{ toNumberCashFormat(value.change, "%", "+") }}</span>
        <IconFont type="icon-up" />
      </span>
      <span v-else class="flex items-center text-global-numRed text-14-16">
        <span>{{ toNumberCashFormat(value.change, "%") }}</span>
        <IconFont type="icon-down" />
      </span>
    </div>
  </div>
</template>
