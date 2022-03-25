<script lang="ts" setup>
/**
 * @file 埋点
 * @auth svon.me@gmail.com
 */
import * as track from "src/logic/track";
import { Origin } from "src/types/track/";
import type { PropType } from "vue";

const props = defineProps({
  // 事件名称
  name: {
    type: String,
    required: true,
  },
  // 事件数据
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  origin: {
    required: true,
    type: [String, Array] as PropType<Origin | Origin[]>,
  },
});

const onClick = function () {
  return track.push(props.origin, props.name, props.data);
};
</script>

<template>
  <div @click.capture="onClick">
    <slot></slot>
  </div>
</template>
