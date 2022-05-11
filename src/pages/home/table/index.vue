<script setup lang="ts">
import HomeTableModel from "./model.vue";

defineProps({
  topicIndex: {
    type: [String, Number],
    required: true,
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <div class="table-con">
    <div class="bg xshidden" />
    <div class="table-content">
      <template v-for="(item, index) in data" :key="item.id">
        <HomeTableModel v-if="index === topicIndex" class="h-full" :class="index === index ? 'block' : 'hidden'" :data="item" />
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.table-con {
  @apply w-full relative;
}
.table-content {
  @apply relative md:min-h-78  md:bg-global-white rounded-kd16px md:min-w-150;
}
.table-model {
  @apply h-full md:absolute top-0;
}
.bg {
  height: 97%;
  @apply w-138 mx-auto absolute left-0 right-0   top-0 bg-global-white bg-opacity-45 rounded-kd16px;
}

.table-box {
  @apply w-full h-full bg-global-white rounded-kd16px;
}

.yuan {
  @apply w-2 h-2 bg-global-white rounded-full;
}

.yuan-no {
  @apply w-2 h-2 bg-global-white bg-opacity-45 rounded-full;
}

.dian:not(:first-child) {
  @apply ml-6;
}

.active {
  transition: all 1s;
  opacity: 1;
  z-index: 2;
}

.active-no {
  transition: all 1s;
  opacity: 0;
  z-index: 1;
}

.table-default {
  @apply h-full z-11 absolute top-0;
}
</style>
