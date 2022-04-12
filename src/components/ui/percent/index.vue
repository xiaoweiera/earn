<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UiPercent",
});
</script>
<script lang="ts" setup>
/**
 * @file 变化率
 * @auth svon.me@gmail.com
 */

import { isNumber, toNumber } from "src/utils/";

defineProps({
  // 变化率
  value: {
    type: Number,
    default: 0,
  },
  // 单位
  unit: {
    type: String,
    default: "%",
  },
  text: {
    type: String,
    default: "(24H)",
  },
});
</script>

<template>
  <div class="ui-percent text-12-18 font-m">
    <div v-if="isNumber(value) && value < 0" class="inline-block flex items-center text-global-numRed">
      <IconFont class="transform rotate-180" size="12" type="icon-triangle" />
      <slot>
        <span>{{ toNumber(value) }}</span>
      </slot>
      <slot name="unit">
        <span>{{ unit }}</span>
      </slot>
      <slot name="text">
        <span v-if="text" class="ml-1">{{ text }}</span>
      </slot>
    </div>
    <div v-else class="inline-block flex items-center text-global-numGreen">
      <IconFont size="12" type="icon-triangle" />
      <slot>
        <span>+{{ toNumber(value) }}</span>
      </slot>
      <slot name="unit">
        <span>{{ unit }}</span>
      </slot>
      <slot name="text">
        <span v-if="text" class="ml-1">{{ text }}</span>
      </slot>
    </div>
  </div>
</template>
