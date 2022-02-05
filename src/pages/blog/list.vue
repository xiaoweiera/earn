<script setup lang="ts">
/**
 * @file 博客列表
 * @author svon.me@gmail.com
 */
import BlogAd from "./ad.vue";
import BlogHot from "./hot.vue";
import BlogRow from "./row.vue";
import I18n from "src/utils/i18n";
import {onMounted, ref} from "vue";
import * as blog from "src/logic/blog";
import {toArray, Equals} from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import {BlogTab, BlogData} from "src/types/blog/";
import { createRef, getValue} from "src/utils/ssr/ref";


const activeName = ref<string>("group");
const groupId = createRef<string | number | undefined>(`query.${activeName.value}`, blog.tabAll.id);

const tabs = createRef<BlogTab[]>("API.blog.tabs", toArray(blog.tabAll));

const init = async function () {
  if (tabs.value.length <= 1) {
    const value = await blog.getTabs();
    if (value) {
      tabs.value = value;
    }
  }
  await blog.getList();
};

const getInitValue = function () {
  const queryGroup = getValue<string>(`query.${activeName.value}`, blog.tabAll.id as string);
  if (Equals(queryGroup, groupId.value as string)) {
    return getValue<BlogData[]>("API.blog.getList", []);
  }
  return [];
}

// 获取列表数据
const requestList = async function (data: object) {
  const page = safeGet<number>(data, "page");
  const size = safeGet<number>(data, "page_size");
  return blog.getList(groupId.value, page, size);
}
// 切换分组
const onChangeTab = function (data: object) {
  const value = safeGet<string>(data, activeName.value);
  if (value) {
    groupId.value = value;
  } else {
    groupId.value = blog.tabAll.id;
  }
}

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
          <ui-tab active-name="group" :list="blog.transformTabs(tabs)" @change="onChangeTab"></ui-tab>
        </div>

        <!-- 博客列表 -->
        <div class="mt-6" :key="groupId">
          <ui-pagination :init-value="getInitValue()" :request="requestList" next-more="加载更多">
            <template #default="scope">
              <div>
                <BlogRow v-for="item in scope.list" class="blog-item" :key="item.id" :data="item"/>
              </div>
            </template>
          </ui-pagination>
        </div>
      </div>
      <!-- 热门数据解读 -->
      <div class="md:w-65.5 ml-8 pt-8 hidden md:block">
        <div class="text-global-highTitle mb-3">
          <p class="text-18-24 mb-3 font-medium">{{ I18n.blog.popular }}</p>
        </div>
        <!-- 热门列表数据 -->
        <BlogHot/>
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

  .blog-item {
    @apply mt-8;
    &:first-child {
      @apply mt-0;
    }
  }
}
</style>
