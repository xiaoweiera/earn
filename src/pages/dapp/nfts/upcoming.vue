<script setup lang="ts">
import DAppNftList from "./list.vue";

defineProps({
  list: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div v-for="data in list" :key="data.date">
    <h3 class="py-4 text-kd18px24px text-global-bgBlack font-kdFang">{{ data.title }}</h3>
    <div class="coming-item showX">
      <div v-for="(item, index) in data.list" :key="item.id">
        <DAppNftList :key="item.id" :data="item" class="md:ml-0" :class="{ 'ml-6': index > 0 }" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.coming-item {
  @apply flex items-center flex-nowrap;
}
@screen md {
  .coming-item {
    @apply grid grid-cols-3 gap-6;
  }
}
@screen lg {
  .coming-item {
    @apply grid grid-cols-4 gap-6;
  }
}
@screen xl {
  .coming-item {
    @apply grid grid-cols-5 gap-6;
  }
}
</style>
