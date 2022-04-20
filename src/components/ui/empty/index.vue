<script setup lang="ts">
import { getEnv } from "src/config";
import I18n from "src/utils/i18n";
defineProps({
  desc: {
    type: String,
    default: "",
  },
});
const i18n = I18n();
const env = getEnv();
</script>

<template>
  <div class="py-18">
    <div class="w-60 h-60 mx-auto">
      <ui-image class="h-full" fit="contain" :src="`${env.VITE_oss}/common/noData.png`" />
      <div class="text-kd14px16px text-global-highTitle text-opacity-45 font-kdFang mt-2 text-center">{{ i18n.common.noData }}</div>
    </div>
  </div>
</template>
