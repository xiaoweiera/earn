<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <v-router :href="data.url" target="_blank">
    <div class="relative w-full h-full bg-white rounded-md overflow-hidden">
      <div class="h-full">
        <!-- 电脑上展示 -->
        <ui-image class="w-full h-full rounded-md" fit="cover" :src="data.image" :lazy="true" />
        <!-- 移动端展示 -->
        <!-- <img class="block md:hidden w-full"> -->
      </div>
      <div class="absolute top-3 left-3">
        <span
          class="bg-global-hei bg-opacity-45 border border-global-white border-opacity-6 rounded-md px-1.5 py-0.5 text-kd10px12px text-global-white"
          >AD</span
        >
      </div>
    </div>
  </v-router>
</template>
