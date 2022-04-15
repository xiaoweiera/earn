<script lang="ts">
/**
 * @file 项目详情数据
 * @auth svon.me@gmail.com
 */
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import { Activity } from "src/types/dapp/data";
import { ProjectType } from "src/types/dapp/data";

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
      type: Object as PropType<DAppData>,
    },
  },
  computed: {
    name: function () {
      const activity = this.data.preferred_activity;
      if (activity && activity !== Activity.none) {
        if (activity === Activity.ido) {
          return "IDO";
        }
        if (activity === Activity.airdrop) {
          return "AirDrop";
        }
        if (activity === Activity.mint) {
          return "Mint";
        }
        if (activity === Activity.invest) {
          return "Seed";
        }
      }
      const type: ProjectType = this.project.type;
      if (type && type === ProjectType.nft) {
        return "NFT";
      }
      return "DApp";
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
