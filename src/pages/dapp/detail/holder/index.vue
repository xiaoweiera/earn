<script lang="ts" setup>
import HolderHeader from "src/pages/dapp/detail/holder/header.vue";
import HolderChart from "src/pages/dapp/detail/holder/chart/index.vue";
import { PropType } from "vue";
import { ProjectItem } from "src/types/dapp/detail";
import { DAppProject } from "src/types/dapp/data";

defineProps({
  data: {
    required: true,
    type: Object as PropType<ProjectItem>,
  },
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
});
</script>

<template>
  <div>
    <HolderHeader :project="project" :data="data" />
    <HolderChart :project="project" :data="data" />
  </div>
</template>

<style lang="scss" scoped></style>
