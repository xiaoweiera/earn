<script setup lang="ts">
/**
 * @file 搜索结果
 * @auth svon.me@gmail.com
 */
import { PropType } from "vue";

defineProps({
  list: {
    type: Array as PropType<object[]>,
    default: () => [],
  },
});
</script>

<template>
  <div class="py-3 border-t border-global-highTitle border-opacity-6">
    <div class="px-3">
      <h5 class="text-14-18 font-m text-global-highTitle text-opacity-45">热门搜索 🔥</h5>
    </div>
    <ul>
      <li v-for="(data, index) in list" :key="index">
        <v-router class="px-3 block">
          <div class="flex items-center p-2 result-content rounded-lg">
            <IconFont :type="data.icon" size="24" class="mr-1.5" />
            <span class="block flex-1">
              <span class="text-14-18 font-m">{{ data.name }}</span>
            </span>
          </div>
        </v-router>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
li {
  &:hover,
  &.active {
    .result-content {
      @apply bg-global-highTitle bg-opacity-4;
    }
  }
}
</style>
