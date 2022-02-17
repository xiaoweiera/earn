<script setup lang="ts">
import {ref} from 'vue'

</script>
<template>
  <div class="min-w-150 h-92 py-3 relative">
    <div class="bg"></div>
    <HomeTableModel class="relative z-11  "/>
  </div>
</template>
<style scoped lang="scss">
.bg{
  @apply w-138 mx-auto h-full absolute left-0 right-0   top-0 bg-global-white bg-opacity-45 rounded-kd16px;
}
.table-box{
  @apply w-full h-full bg-global-white rounded-kd16px;
}
</style>
