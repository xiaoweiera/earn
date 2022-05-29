<script setup lang="ts">
import Introduction from "src/pages/dapp/detail/dashboard/introduction.vue";
import News from "src/pages/dapp/detail/dashboard/news.vue";
import Token from "src/pages/dapp/detail/token/index.vue";
import Information from "src/pages/dapp/detail/content/chain/index.vue";
import Statistics from "src/pages/dapp/detail/holder/chart/floor.vue";
import HolderChart from "src/pages/dapp/detail/holder/chart/trends.vue";
import { DAppProject, ProjectType } from "src/types/dapp/data";
import { PropType } from "vue";
import { ProjectItem } from "src/types/dapp/detail";

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
    <div>
      <Token :data="project" />
    </div>
    <Statistics v-if="project.type === ProjectType.nft || project.type === ProjectType.mint" :project="project" :data="data" />
    <HolderChart v-if="project.type === ProjectType.nft || project.type === ProjectType.mint" :project="project" :data="data" />
    <Information :project="project" />
    <Introduction />
    <News />
  </div>
</template>
