<script lang="ts">
import type { PropType } from "vue";
/**
 * @file 项目详情数据
 * @auth svon.me@gmail.com
 */
import { defineComponent } from "vue";
import { DAppProject, ProjectItem, ProjectType } from "src/types/dapp/detail";
import InfoView from "./info.vue";

import NFT from "./nft.vue";
import DApp from "./dapp.vue";
import IDO from "./ido.vue";
import Seed from "./seed.vue";
import Mint from "./mint.vue";
import AirDrop from "./airdrop.vue";

export default defineComponent({
  name: "DAppHeader",
  components: {
    InfoView,
    NFT,
    IDO,
    Seed,
    Mint,
    AirDrop,
    DApp,
  },
  props: {
    project: {
      required: true,
      type: Object as PropType<DAppProject>,
    },
    data: {
      required: true,
      type: Object as PropType<ProjectItem>,
    },
  },
  computed: {
    name: function () {
      // const data = this.data;
      const type: ProjectType = this.project.type;
      const rank = this.project.rank;
      if (type && (type === ProjectType.ido || type === ProjectType.igo || type === ProjectType.dapp)) {
        if (rank) {
          return "DApp";
        } else {
          return "IDO";
        }
      } else if (type && type === ProjectType.airdrop) {
        if (rank) {
          return "DApp";
        } else {
          return "AirDrop";
        }
      } else if (type && (type === ProjectType.mint || type === ProjectType.nft)) {
        if (rank) {
          return "NFT";
        } else {
          return "Mint";
        }
      } else {
        return "Seed";
      }
    },
  },
});
</script>

<template>
  <div class="dapp-header-warp">
    <div class="info-content">
      <info-view :data="data" :project="project" />
    </div>
    <div class="data-content">
      <component :is="name" :data="data" :project="project"></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
