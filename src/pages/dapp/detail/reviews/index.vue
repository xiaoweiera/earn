<script lang="ts" setup>
/**
 * @file DApp 评论
 */
import { reactive } from "vue";

defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});

// 项目数据
const isDisShow = reactive({ value: false });
</script>

<template>
  <div class="flex w-full h-full">
    <Comment :discuss="true" :is-show="isDisShow" :project-id="id" />
  </div>
</template>
