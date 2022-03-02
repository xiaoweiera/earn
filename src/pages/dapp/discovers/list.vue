<script setup lang="ts">
import { PropType } from "vue";
import DappDiscoversContentAd from './content/ad.vue'
import DappDiscoversContent from './content/index.vue'
import {ProjectItem, AdItem, ProjectType} from "src/types/dapp/ixo";

defineProps({
  data: {
    type: Object as PropType<ProjectItem | AdItem>,
  }
})
</script>
<template>
  <div  class="discover-item">
    <div>
      <!--遍历展示项目列表信息-->
      <div class="discover-list relative h-87.5 border border-global-highTitle border-opacity-6 rounded-md cursor-pointer">
        <DappDiscoversContentAd v-if="data.data_type === ProjectType.ad" :data="data"/>
        <DappDiscoversContent v-else :data="data"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.discover-item {
  &:hover {
    .discover-list {
      box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
