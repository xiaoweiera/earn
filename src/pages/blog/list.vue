<script setup lang="ts">
import {onMounted} from "vue";
import BlogAd from "./ad.vue";
import {toArray} from "src/utils";
import * as blog from "src/logic/blog";
import {BlogTab} from "src/types/blog/";
import {createRef} from "src/utils/ssr/ref";

const tabs = createRef<BlogTab[]>("API.blog.tabs", toArray(blog.tabAll));

const init = async function () {
  if (tabs.value.length <= 1) {
    const value = await blog.getTabs();
    if (value) {
      tabs.value = value;
    }
  }
};

onMounted(init);

</script>

<template>
  <div class="blog-content px-3 md:px-0">
    <div class="md:max-w-280 flex mx-auto pb-15">
      <div class="pt-4 md:pt-8 w-full md:w-75/100">
        <!--顶部数据-->
        <BlogAd/>

        <div class="px-0 py-3">
          <!-- 分类 -->
          <ui-tab :list="tabs"></ui-tab>
        </div>

        <!-- 博客列表 -->
        <div class="mt-6">

        </div>
      </div>
      <!-- 热门数据解读 -->
      <div class="md:w-65.5 ml-8 pt-8 hidden md:block">
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog-content {
  background-color: #FAFBFC;
  .blog-type {
    @apply mx-4;
    @apply text-center;
    @apply text-global-highTitle text-opacity-45;
    &:first-child {
      @apply ml-0;
    }
    &:last-child {
      @apply mr-0;
    }

    &.active {
      @apply relative;
      @apply text-global-darkblue;
      &:after {
        content: "";
        @apply h-0.5;
        @apply absolute left-0 top-full right-0;
        @apply bg-global-darkblue;
        @apply transform translate-y-2;
      }
    }
  }
}
</style>
