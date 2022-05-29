<script lang="ts" setup>
import HolderTrends from "src/pages/dapp/detail/holder/chart/trends.vue";
import HolderRatio from "src/pages/dapp/detail/holder/chart/ratio.vue";
import HolderNft from "src/pages/dapp/detail/holder/chart/nft.vue";
import HolderNftRatio from "src/pages/dapp/detail/holder/chart/nftRatio.vue";
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
    <HolderTrends :project="project" :data="data" />
    <HolderRatio :project="project" :data="data" />
    <HolderNft class="mt-7" :project="project" :data="data" />
    <HolderNftRatio :project="project" :data="data" />
  </div>
</template>

<style lang="scss" scoped></style>
