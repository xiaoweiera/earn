<script lang="ts" setup>
/**
 * @file 项目详情数据
 * @auth svon.me@gmail.com
 */
import type { PropType } from "vue";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import InfoView from "./info.vue";
import DataView from "./data.vue";

defineProps({
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
  data: {
    required: true,
    type: Object as PropType<DAppData>,
  },
});
</script>

<template>
  <div class="dapp-header-warp">
    <div class="info-content">
      <info-view :data="data" :project="project" />
    </div>
    <div class="data-content">
      <data-view :data="data" :project="project" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dapp-header-warp {
  .data-content {
    @apply mt-6 pt-3;
    @apply border-t border-solid border-global-highTitle border-opacity-6;
  }
  @screen md {
    @apply flex;
    .info-content,
    .data-content {
      @apply flex-1;
    }
    .data-content {
      @apply w-1 ml-15 mt-0 pt-0 border-0;
    }
  }
}
</style>
