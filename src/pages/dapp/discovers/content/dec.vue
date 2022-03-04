<script setup lang="ts">
defineProps({
  data: {
    type: Object,
  }
})
</script>
<template>
  <div>
    <div  class="h-8 mt-3">
      <span class="small h-full text-kd12px16px text-global-highTitle text-opacity-65 mt-3 font-kdFang">{{data.description}}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.small {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>