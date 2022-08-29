<script setup lang="ts">
import { computed } from "vue";
import { toNumberCashFormat } from "src/utils/convert/to";
import safeGet from "@fengqiaogang/safe-get";

const props = defineProps({
  field: {
    required: true,
    type: String,
  },
  data: {
    required: true,
    type: Object,
  },
});

const value = computed<string>(function () {
  const text = props.field ? safeGet<string>(props.data, props.field) : 0;
  return toNumberCashFormat(text);
});
</script>

<template>
  <span class="text-global-highTitle text-14-16">{{ value }}</span>
</template>
