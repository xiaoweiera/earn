<script lang="ts" setup>
/**
 * @file 图片处理
 * @author svon.me@gmail.com
 */

import { ElImage } from "element-plus";
import type { PropType } from "vue";
import { computed, ref } from "vue";
import { getEnv } from "src/config";
import { isLink } from "src/utils/";
import { bgColorItem } from "src/types/ui/label";
import { upperFirst } from "src/utils";
import { MD5 } from "src/plugins/encryption/md5";
import safeGet from "@fengqiaogang/safe-get";

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
  lazy: {
    type: Boolean,
    default: () => true,
  },
  // 是否属于 OSS 图片资源
  oss: {
    type: Boolean,
    default: () => false,
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

const getImageLink = function (src?: string, oss?: boolean) {
  if (src) {
    if (oss && !isLink(src)) {
      const env = getEnv();
      return `${env.VITE_oss}${src}`;
    }
    return src;
  }
  // 返回默认图
  return "/images/common/logo.jpg";
};

const getFitValue = function (value: Fit) {
  return value === "none" ? null : value;
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
const getBgColor = function (title: string) {
  const value: string = MD5(title).slice(-1);
  const color = safeGet<string>(bgColorItem, value) || bgColorItem.a;
  return `--bg-color: ${color};`;
};

const getName = function (name: string) {
  return upperFirst(name.slice(0, 2));
};
</script>

<template>
  <client-only :class="className" class="ui-image overflow-hidden">
    <template v-if="src && !error">
      <el-image :fit="getFitValue(fit)" :initial-index="index" :lazy="false" :preview-src-list="preview" :preview-teleported="true" :src="getImageLink(src, oss)" class="block w-full h-full" scroll-container="body" @error="error = true">
        <template #placeholder>
          <slot name="loading"></slot>
        </template>
      </el-image>
    </template>
    <template v-else>
      <span v-if="title" :style="getBgColor(title)" class="back-color">
        {{ getName(title) }}
      </span>
      <el-image v-else :fit="getFitValue(fit)" :lazy="false" :src="getImageLink()" class="block w-full h-full" />
    </template>
  </client-only>
</template>
<style lang="scss" scoped>
@import "src/styles/function";
.back-color {
  @apply flex items-center justify-center w-full h-full text-white tracking-wider font-semibold;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%), var(--bg-color);
}

.ui-image {
  @apply relative;
  @at-root .kd-ui-icon & {
    @apply overflow-hidden;
  }
  /*
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
   */
}
</style>
