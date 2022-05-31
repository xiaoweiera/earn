<script lang="ts" setup>
/**
 * @file 空投进度
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import { Progress } from "src/types/dapp/data";
import type { PropType } from "vue";
import { DAppProject, ProjectType } from "src/types/dapp/detail";

const i18n = I18n();

defineProps({
  value: {
    type: String as PropType<Progress>,
    default: "",
  },
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
});
const getProjectName = (data: DAppProject) => {
  if (data.type === ProjectType.ido || data.type === ProjectType.dapp) {
    return "IDO";
  } else if (data.type === ProjectType.mint || data.type === ProjectType.nft) {
    return "Mint";
  } else if (data.type === ProjectType.airdrop) {
    return "Airdrop";
  } else if (data.type === ProjectType.igo) {
    return "IGO";
  }
};
</script>

<template>
  <ui-label v-if="value && value === Progress.oncoming" class="progress" :value="`🔥 ${getProjectName(project)} ${i18n.dapp.detail.upcoming}`" />
  <ui-label v-else-if="value && value === Progress.ongoing" class="progress" :value="`${getProjectName(project)} ${i18n.dapp.detail.ongoing}`" />
  <ui-label v-else-if="value && value === Progress.finished" class="progress" :value="`${getProjectName(project)} ${i18n.dapp.detail.ended}`" />
</template>

<style lang="scss" scoped>
.progress {
  @apply bg-global-darkblue bg-opacity-100;
  ::v-deep(label) {
    @apply text-global-white text-opacity-100;
  }
}
</style>
