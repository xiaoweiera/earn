<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: () => '',
  },
  tips: {
    type: String,
    default: () => ''
  }
})

</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <p class="text-kd32px32px text-global-highTitle font-semibold font-Barlow">{{title}}</p>
      <p class="text-kd14px18px text-global-highTitle text-opacity-45 font-kdFang ml-4">{{tips}}</p>
    </div>
    <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
      <span class="text-kd14px18px text-global-darkblue font-kdFang">View More</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>