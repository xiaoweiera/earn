<script lang="ts" setup>
/**
 * @file 图片处理
 * @author svon.me@gmail.com
 */

import { ElImage } from "element-plus";
import type { PropType } from "vue";
import { computed, ref } from "vue";

type Fit = "cover" | "contain" | "fill" | "none";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  fit: {
    type: String as PropType<Fit>,
    default: () => "cover",
  },
  alt: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  rounded: {
    type: Boolean,
    default: () => false,
  },
  // 预览列表
  preview: {
    default: null,
    type: Array as PropType<string[]>,
  },
});

const className = computed<string[]>(function () {
  const data: string[] = [];
  if (props.rounded) {
    data.push("rounded-1/2");
  }
  if (props.title) {
    data.push("help");
  }
  return data;
});

const error = ref<boolean>(false);
const auto = ref<string>("/images/common/logo.jpg");

const getFitValue = function (value: Fit): string {
  return value === "none" ? "scale-down" : value;
};

const index = computed<number>(function () {
  if (props.src && props.preview) {
    const value = props.preview.indexOf(props.src);
    if (value > 0) {
      return value;
    }
  }
  return 0;
});
</script>

<template>
  <client-only :class="className" :data-help="title" class="ui-image overflow-hidden">
    <template v-if="src && !error">
      <el-image :fit="getFitValue(fit)" :initial-index="index" :lazy="true" :preview-src-list="preview" :preview-teleported="true" :src="src" class="block w-full h-full" scroll-container="body" @error="error = true">
        <template #placeholder>
          <slot name="loading"></slot>
        </template>
      </el-image>
    </template>
    <template v-else>
      <el-image :fit="getFitValue(fit)" :lazy="true" :src="auto" class="block w-full h-full" />
    </template>
  </client-only>
</template>
<style lang="scss" scoped>
@import "src/styles/function";

.ui-image {
  @apply relative;
  @at-root .kd-ui-icon & {
    @apply overflow-hidden;
  }
  &.help {
    @apply cursor-pointer;
    &:after {
      content: attr(data-help);
      transition: all 0.5s;
      @apply invisible opacity-0;
      @apply block z-2 bg-white py-1 px-1.5;
      @apply absolute top-full left-1/2 transform translate-y-1 -translate-x-1/2;
      @apply text-global-darkblue text-opacity-60 whitespace-pre text-sm;
      @apply border border-solid border-gray-300 rounded-md;
    }

    &:hover {
      &:after {
        @apply visible opacity-100;
      }
    }
  }
}
</style>
