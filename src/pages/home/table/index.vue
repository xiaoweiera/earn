<script setup lang="ts">
import HomeTableModel from './model.vue'

const props = defineProps({
  topicIndex: [String, Number],
  data: Object
})
</script>
<template>
  <div class="min-w-150 min-h-86 py-3  relative">
    <div class="bg"></div>
    <div class="relative  min-h-86 bg-global-white rounded-kd16px">
      <template v-for="(item,index) in data">
        <HomeTableModel class="h-full z-11 absolute top-0" :class="topicIndex===index?'active':'active-no'" :data="item"/>
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bg {
  @apply w-138 mx-auto h-full absolute left-0 right-0   top-0 bg-global-white bg-opacity-45 rounded-kd16px;
}
.table-box {
  @apply w-full h-full bg-global-white rounded-kd16px;
}

.active {
  transition: all 1.2s;
  opacity: 1;
}

.active-no {
  transition: all 1.2s;
  opacity: 0;
}

.table-default {
  @apply h-full z-11 absolute top-0;
}
</style>
