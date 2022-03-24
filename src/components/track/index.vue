<script lang="ts" setup>
/**
 * @file 埋点
 * @auth svon.me@gmail.com
 */
import { Gio } from "src/plugins/track/gio";
import { Origin } from "src/types/track/";
import { getLang } from "src/utils/root/data";
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
    type: String as PropType<Origin>,
  },
});

const onClick = function () {
  if (props.origin === Origin.gio) {
    const gio = new Gio();
    const data = Object.assign({ language: getLang() }, props.data ? props.data : {});
    gio.track(props.name, data);
  }
};
</script>

<template>
  <div @click.capture="onClick">
    <slot></slot>
  </div>
</template>
