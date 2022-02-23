<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: () => '',
  }
})

</script>
<template>
  <div class="flex justify-between">
    <div>
      <p class="text-24px28px text-global-highTitle font-semibold font-Barlow">{{ title }}</p>
    </div>
    <div class="flex items-center">
      <span class="text-14px18px text-global-darkblue font-kdFang">More</span>
      <IconFont class="text-global-darkblue ml-0.5" size="12" type="icon-rightNo"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>