<script lang="ts" setup>
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
});
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-3">
      <div v-for="(value, index) in list" :key="index" class="rounded-md flex overflow-hidden">
        <el-image :lazy="true" :preview-src-list="list" :src="value" class="w-full flex" fit="contain" />
      </div>
    </div>
  </div>
</template>
