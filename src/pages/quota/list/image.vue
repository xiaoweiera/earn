<script setup lang="ts">
/**
 * @file 图片集合
 * @auth svon.me@gmail.com
 */

import { ElImage } from "element-plus";
import type { PropType } from "vue";

defineProps({
  // 图片列表
  list: {
    type: Array as PropType<string[]>,
    required: true,
  },
  // 是否支持大图预览
  preview: {
    type: Boolean,
    default: () => true,
  },
});
</script>

<template>
  <div :class="{ preview: preview }" class="image-wrap">
    <div v-for="(value, index) in list" :key="index" class="rounded-md image-item flex">
      <el-image v-if="preview" :lazy="true" :preview-src-list="list" :src="value" class="w-full flex" fit="contain" />
      <el-image v-else :lazy="true" :src="value" class="w-full flex" fit="contain" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image-item {
  @apply overflow-hidden mb-3;
  &:only-child {
    @apply mb-0;
  }
}

.image-wrap {
  &.preview {
    @screen md {
      @apply flex flex-wrap;
      .image-item {
        @apply mr-3 flex-1;
        &:first-child {
          @apply w-full mr-0 flex-auto;
        }
        &:last-child {
          @apply mr-0;
        }
      }
    }

    @screen lg {
      @apply flex-nowrap;
      .image-item {
        &:first-child {
          @apply mr-3 flex-1 w-px;
        }
      }
    }
  }
}
</style>
