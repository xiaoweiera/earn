<script setup lang="ts">
/**
 * @file 图片处理
 * @author svon.me@gmail.com
 */

import type { PropType } from "vue";
import { computed, onMounted, ref } from "vue";

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
});

const error = ref<boolean>(false);

const value = computed<string>(() => {
  if (props.src) {
    return `background-image: url(${props.src})`;
  }
  return "";
});

onMounted(() => {
  if (props.src) {
    const image = new Image();
    image.src = props.src;
    image.onerror = () => {
      error.value = true;
    };
  } else {
    error.value = true;
  }
});
</script>

<template>
  <div class="ui-image" :class="{ error: error, rounded, help: !!title }" :data-help="title">
    <span class="block overflow-hidden w-full h-full">
      <img v-if="src && fit === 'none'" class="max-h-full max-w-full" :src="src" :alt="alt" />
      <i :class="fit" :style="value" />
    </span>
  </div>
</template>
<style scoped lang="scss">
@import "src/styles/function";

.ui-image {
  @apply relative;
  i {
    @apply block w-full h-full bg-center bg-no-repeat;
  }

  img {
    @apply w-full inline-block;
    & ~ i {
      @apply hidden;
    }
  }

  &:not(.error) i {
    &.cover {
      @apply bg-cover;
    }
    &.contain {
      @apply bg-contain;
    }
    &.fill {
      background-size: 100% 100%;
    }
  }

  &.error {
    img {
      @apply opacity-0 invisible;
    }
    i {
      @apply block;
      @apply bg-contain;
      @apply absolute left-0 top-0 right-0 bottom-0;
      background-image: static("/images/common/logo.jpg") !important;
    }
  }
  &.rounded {
    & > span {
      @apply rounded-1/2;
    }
    i,
    img {
      @apply rounded-1/2;
    }
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
