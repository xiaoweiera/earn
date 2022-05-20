<script setup lang="ts">
/**
 * @file icon
 * @auth svon.me@gmail.com
 */
import { computed } from "vue";
import { toArray, compact, getChainLogo } from "src/utils/";
import type { PropType } from "vue";

const props = defineProps({
  field: {
    required: true,
    type: [String, Array] as PropType<string | string[]>,
  },
  data: {
    required: true,
    type: Object,
  },
});

const src = computed<string | undefined>(function () {
  const [key]: string[] = toArray(props.field);
  if (key) {
    const [value] = compact<string>(toArray(props.data[key]));
    if (value) {
      return getChainLogo(value);
    }
  }
  return "";
});
</script>

<template>
  <IconFont v-if="src" :type="src" size="16" />
</template>
