<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";
defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="inline-flex items-center">
    <span class="mr-1 text-12-16 font-medium text-global-highTitle">{{ safeGet(user, "nickname") }}</span>
    <IconFont v-if="safeGet(user, 'is_official')" class="text-global-darkblue mr-1" type="icon-V1" size="16" />
    <IconFont v-if="safeGet(user, 'is_evaluator') && !safeGet(user, 'is_official')" class="text-global-darkblue mr-1" type="icon-a-daV" size="16" />
  </div>
</template>
