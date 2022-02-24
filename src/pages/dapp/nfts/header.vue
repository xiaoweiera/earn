<script setup lang="ts">
defineProps({
  data: {
    type: Object,
  }
})

</script>
<template>
  <div class="w-full h-full relative" v-if="data">
    <div class="w-full h-full rounded-md overflow-hidden" v-for="(item, index) in data.gallery" :key="index">
      <ui-image class="w-full h-full" fit="cover" :src="item" :lazy="true"/>
    </div>
    <div class="w-full absolute top-4 left-0">
      <div class="flex justify-between px-4">
        <p class="h-5.5 flex items-center bg-global-bgBlack px-2 border border-global-white border-opacity-25 rounded-2xl"> 
          <span class="text-kd12px14px text-global-white font-kdFang font-medium">{{ data.data_type }}</span>
        </p>
        <p class="h-5.5 bg-global-gemstone px-2 text-global-white border border-global-white border-opacity-25 rounded-2xl flex items-center">
          <IconFont type="icon-star" size="12" class="is-star"/>
          <span class="ml-0.5 text-kd16px18px text-number font-semibold">{{ data.overall_score }}</span>
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
  background: linear-gradient(180deg, rgba(110, 110, 110, 0) 0%, #212121 100%);
}
</style>