<script setup lang="ts">
import type { PropType } from "vue";
import type { ProjectItem } from "src/types/dapp/detail";
// import { ProjectType } from "src/types/dapp/ixo";
// import DappDiscoversContentAd from "./content/ad.vue";
import DappDiscoversContent from "./content/index.vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  data: {
    required: true,
    type: Object as PropType<ProjectItem>,
  },
  status: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div class="discover-item">
    <div class="discover-list relative h-87.5 border border-global-highTitle border-opacity-6 rounded-md cursor-pointer">
      <DappDiscoversContent :status="status" :data="data" :name="name" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.discover-item {
  &:hover {
    .discover-list {
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
