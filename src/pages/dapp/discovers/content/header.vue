<script setup lang="ts">
import DappDiscoversContentRisk from './risk.vue'
defineProps({
  data: {
    type: Object,
  }
})
</script>

<template>
  <div v-if="data">
    <div class="w-full h-40 rounded-md overflow-hidden">
      <ui-image class="w-full h-full" fit="cover" :src="data.cover" :lazy="true"/>
    </div>
    <div class="w-full absolute top-4 left-0">
      <div class="flex justify-between px-4">
        <p class="flex"> 
          <DappDiscoversContentRisk class="bg-global-bgBlack" :value="data.risk"></DappDiscoversContentRisk>
          <span class="bg-global-bgBlack ml-2 px-2 py-1 text-kd12px14px text-global-white border border-global-white border-opacity-25 font-kdFang rounded-2xl" v-if="data.category">{{data.category}}</span>
        </p>
        <p class="bg-global-gemstone px-2 text-global-white border border-global-white border-opacity-25 rounded-2xl">
          <IconFont type="icon-star" size="12" class="is-star"/>
          <span class="ml-0.5 text-kd16px18px font-semibold text-number is-score">{{ data.overall_score }}</span>
        </p>
      </div>
    </div>
    <div class="is-cover"></div>
  </div>
</template>
<style lang="scss" scoped>
.is-star {
  ::v-deep(.bright) {
    @apply text-global-white;
  } 
}
.is-cover {
  @apply absolute bottom-0 left-0 w-full h-20;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
}
.is-score {
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.06);
}
</style>