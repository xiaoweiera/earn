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
  <div class="ui-image overflow-hidden" :class="{ error: error, rounded }">
    <img v-if="src && fit === 'none'" class="" :src="src" />
    <i :class="fit" :style="value" />
  </div>
</template>
<style scoped lang="scss">
@import 'src/styles/function';

%contain {
  background-size: contain;
}

.ui-image {
  i {
    @apply block w-full h-full;
    background-position: center;
    background-repeat: no-repeat;
  }

  img {
    @apply w-full inline-block;
    & ~ i {
      @apply hidden;
    }
  }

  &:not(.error) i {
    &.cover {
      background-size: cover;
    }
    &.contain {
      @extend %contain;
    }
    &.fill {
      background-size: 100% 100%;
    }
  }

  &.error {
    @apply relative;
    img {
      @apply opacity-0 invisible;
    }
    i {
      @apply block;
      @extend %contain;
      @apply absolute left-0 top-0 right-0 bottom-0;
      background-image: static('/assets/kingdata.png') !important;
    }
  }
  &.rounded {
    border-radius: 50%;
    i,
    img {
      border-radius: 50%;
    }
  }
}
</style>
