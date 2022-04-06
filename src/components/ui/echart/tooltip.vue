<script lang="ts" setup>
/**
 * @file 提示框
 * @author svon.me@gmail.com
 */

import type { PropType } from "vue";
import { onBeforeMount } from "vue";
import type { Callback } from "src/types/common/";
import { setInject } from "src/utils/use/state";
import { triggerType, EchartsOptionName } from "src/types/echarts/type";

const props = defineProps({
  trigger: {
    type: String,
    default: () => triggerType.axis,
    validator(value: triggerType): boolean {
      const trigger = [triggerType.item, triggerType.axis, triggerType.none];
      return trigger.includes(value);
    },
  },
  formatter: {
    type: Function as PropType<Callback>,
    default: null,
  },
});

const set = setInject(EchartsOptionName.tooltip);

onBeforeMount(function () {
  if (set) {
    if (triggerType.none === props.trigger) {
      return set({
        show: false,
      });
    }
    return set({
      trigger: props.trigger,
      formatter: props.formatter,
    });
  }
});
</script>

<template>
  <span class="hidden"></span>
</template>
