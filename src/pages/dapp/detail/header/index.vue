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
  <div class="flex">
    <div class="flex-1">
      <info-view :data="data" :project="project" />
    </div>
    <div class="flex-1 w-1 ml-15">
      <data-view :data="data" :project="project" />
    </div>
  </div>
</template>
