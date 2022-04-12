<script lang="ts" setup>
/**
 * @file 项目关联数据
 * @auth svon.me@gmail.com
 */

import { ProjectType } from "src/types/dapp/data";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import type { PropType } from "vue";
import NFT from "./nft.vue";
import IDO from "./dapp.vue";

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
  <div>
    <!--NFT 类型数据-->
    <NFT v-if="project.type === ProjectType.nft" :data="data" :project="project" />
    <!--其余类型数据-->
    <IDO v-else :data="data" :project="project" />
  </div>
</template>
