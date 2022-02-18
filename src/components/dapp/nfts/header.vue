<script setup lang="ts">


</script>
<template>
  <div class="w-full h-full relative">
    <div class="w-full h-full rounded-md overflow-hidden">
      <ui-image class="w-full h-full" fit="cover" src="https://jsdata-web.kingdata.xyz/media/uploads/2022/2/4f6f01aa7ae1717f9fec97a78f5af7d0.png" :lazy="true"/>
    </div>
    <div class="w-full absolute top-4 left-0">
      <div class="flex justify-between px-4">
        <p class="h-5.5 flex items-center bg-global-bgBlack px-2 border border-global-white border-opacity-25 rounded-2xl"> 
          <span class="text-kd12px14px text-global-white font-kdFang font-medium">类型</span>
        </p>
        <p class="h-5.5 bg-global-gemstone px-2 text-global-white border border-global-white border-opacity-25 rounded-2xl flex items-center">
          <IconFont type="icon-star" size="12" class="is-star"/>
          <span class="ml-0.5 text-kd16px18px text-number font-semibold">9.8</span>
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