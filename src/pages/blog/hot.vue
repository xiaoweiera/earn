<script setup lang="ts">
/**
 * @file 博客热门数据
 * @author svon.me@gmail.com
 */

import { onMounted } from "vue";
import { getAll, makeDetailLink } from "src/logic/blog";
import type { BlogData } from "src/types/blog";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { dateYMDFormat, toArray } from "src/utils";

const apiName = "API.blog.getHotList";
const hots = createRef<BlogData[]>(apiName, toArray(getAll()));

onMounted(() => {
  onLoadRef<BlogData[]>(hots, apiName);
});

</script>

<template>
  <div>
    <v-router v-for="data in hots" :key="data.id" :href="makeDetailLink(data.id)" target="_blank" class="hot-item">
      <p class="blog-date text-global-highTitle text-opacity-65 text-12-16">{{ dateYMDFormat(data.release_date) }}</p>
      <div class="blog-content mt-1">
        <div class="w-58.5 h-29.5 relative">
          <div class="w-full h-full">
            <ui-image class="w-full md:h-full" fit="cover" :src="data.cover" :lazy="true" />
          </div>
        </div>
        <div class="pt-1.5">
          <h3 class="title font-medium text-14-18 text-global-highTitle font-m max-w-full line-clamp-2">
            <span>{{ data.name }}</span>
          </h3>
          <div v-if="data.desc" class="mt-1.5 text-global-highTitle text-opacity-65 text-14-18 line-clamp-3" v-text="data.desc" />
        </div>
      </div>
    </v-router>
  </div>
</template>

<style scoped lang="scss">
%dot_line {
  @apply relative md:pl-6;
  &:before {
    content: "";
    @apply absolute;
  }
}
.hot-item {
  @apply mt-1 block;
  &:first-child {
    @apply mt-0;
  }
  .blog-content {
    @apply pb-5;
    @extend %dot_line;
    @apply relative md:pl-6;
    &:before {
      @apply top-0 bottom-0 left-1.5;
      @apply bg-global-highTitle bg-opacity-10 w-px;
      @apply transform -translate-x-1/2;
    }
  }

  .blog-date {
    @extend %dot_line;
    &:before {
      @apply left-0 top-1/2;
      @apply w-3 h-3 rounded-1/2;
      @apply border-global-money border-2 border-solid;
      @apply transform -translate-y-1/2;
      background: rgba(248, 137, 35, 0.12);
    }
  }
  &:only-child {
    .blog-date,
    .blog-content {
      @apply md:pl-0;
      &:before {
        content: none;
      }
    }
    .blog-content {
      @apply pb-0;
    }
  }
}
</style>
