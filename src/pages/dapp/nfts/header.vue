<script setup lang="ts">
import { toFixed } from 'src/utils'
import DappNftsFooter from './footer.vue';
defineProps({
  data: {
    type: Object,
  }
})
</script>
<template>
  <div class="w-full h-full relative" v-if="data">
    <div class="w-full h-full" v-if="data.gallery.length > 0">
      <div class="w-full h-full rounded-md" v-for="(item, index) in data.gallery" :key="index">
        <ui-image class="w-full h-full" v-if="index === 0" fit="cover" :src="item" :lazy="true"/>
      </div>
    </div>
    <div class="is-flater w-full h-full" v-else>
      <ui-image class="w-full h-full" fit="cover" :src="data.logo" :lazy="true"/>
    </div>
    <div class="w-full absolute top-4 left-0 z-1">
      <div class="w-full flex justify-between px-4">
        <p class="h-5.5 flex items-center bg-global-bgBlack px-2 border border-global-white border-opacity-25 rounded-2xl" v-if="data.category">
          <span class="text-kd12px14px text-global-white font-kdFang font-medium">{{ data.category }}</span>
        </p>
        <p v-else></p>
        <p class="h-5.5 bg-global-gemstone px-2 text-global-white border border-global-white border-opacity-25 rounded-2xl flex items-center">
          <IconFont type="icon-star" size="12" class="is-star"/>
          <span class="ml-0.5 text-kd16px18px text-number font-semibold">{{ toFixed(data.overall_score, 1) }}</span>
        </p>
      </div>
    </div>
    <!-- footer -->
    <div class="nft-footer w-full absolute bottom-0 left-0">
      <DappNftsFooter :data="data"></DappNftsFooter>
    </div>
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
  background: linear-gradient(180deg, rgba(110, 110, 110, 0) 0%, #212121 100%);
}
.is-flater{
  @apply bg-global-hei;
  filter:blur(16px);
  -webkit-filter:blur(16px);
  -moz-filter:blur(16px);
  -ms-filter:blur(16px);
  -o-filter:blur(16px);
}
</style>