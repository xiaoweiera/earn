<script lang="ts" setup>
/**
 * @file 空投进度
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import { Progress } from "src/types/dapp/data";
import type { PropType } from "vue";

const i18n = I18n();

defineProps({
  value: {
    type: String as PropType<Progress>,
    default: "",
  },
});
</script>

<template>
  <ui-label v-if="value && value === Progress.oncoming" :value="`🔥 IDO ${i18n.dapp.detail.upcoming}`" />
  <ui-label v-else-if="value && value === Progress.ongoing" :value="`IDO ${i18n.dapp.detail.ongoing}`" />
  <ui-label v-else-if="value && value === Progress.finished" :value="`IDO ${i18n.dapp.detail.ended}`" />
</template>
