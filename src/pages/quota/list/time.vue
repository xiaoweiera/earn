<script setup lang="ts">
/**
 * @file 创建时间
 * @auth svon.me@gmail.com
 */
import { computed } from "vue";
import type { Data } from "src/types/quota/";
import { dateDiff } from "src/utils/";
import type { PropType } from "vue";

defineProps({
  data: {
    required: true,
    type: Object as PropType<Data>,
  },
  // 是否是列表
  isList: {
    type: Boolean,
    default: () => true,
  },
});

// 分享文案
const shareText = computed<string>(function () {
  // if (props.data && props.data.chart) {
  //   return props.data.chart.name + "\n" + props.data.chart.desc;
  // }
  return "";
});
</script>

<template>
  <client-only class="at-time flex items-center justify-between">
    <p class="text-12-16 text-global-highTitle text-opacity-65 whitespace-nowrap">
      <span>{{ dateDiff(data.published_at) }}</span>
    </p>
    <div>
      <!--分享-->
      <ui-share v-if="!isList" :value="shareText" />
    </div>
  </client-only>
</template>
