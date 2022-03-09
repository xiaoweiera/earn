<script setup lang="ts">
/**
 * @file 博客列表
 * @author svon.me@gmail.com
 */

import { onMounted } from "vue";
import I18n from "src/utils/i18n";
import { toArray } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import type { BlogData, BlogTab } from "src/types/blog/";
import { getValue } from "src/utils/root/data";
import { alias, createRef, onLoadRef } from "src/utils/ssr/ref";
import { Model, activeName, getAll, tabAll, transformTabs } from "src/logic/blog";
import BlogRow from "./row.vue";
import BlogHot from "./hot.vue";
import BlogAd from "./ad.vue";

const i18n = I18n();

let initValue = true;

const tabs = createRef<BlogTab[]>(alias.blog.tabs, toArray(getAll()));
const groupId = createRef<string | number | undefined>(`query.${activeName}`, tabAll);

const getInitValue = function() {
  if (initValue) {
    initValue = false;
    return getValue<BlogData[]>(alias.blog.list, []);
  }
};

// 获取列表数据
const requestList = function(data: object) {
  const api = new Model();
  const page = safeGet<number>(data, "page");
  const size = safeGet<number>(data, "page_size");
  return api.getList(groupId.value, page, size);
};
// 切换分组
const onChangeTab = function(data: object) {
  const value = safeGet<string>(data, activeName);
  if (value) {
    groupId.value = value;
  } else {
    groupId.value = tabAll;
  }
};

onMounted(() => {
  const api = new Model();
  // 如果 tabs 数据为空，则执行 blog.getTabs 将放回结果赋值给 tabs
  onLoadRef(tabs, () => {
    return api.getTabs();
  });
});
</script>
<template>
  <div class="blog-content px-3 md:px-0">
    <div class="md:max-w-280 flex mx-auto pb-15">
      <ui-box class="pt-3 md:pt-7">
        <template #default>
          <div class="pt-1">
            <!--顶部数据-->
            <BlogAd />
            <div class="py-3">
              <!-- 分类 -->
              <div class="hidden md:block">
                <ui-tab active-name="group" :list="transformTabs(tabs)" @change="onChangeTab" />
              </div>
              <div class="block md:hidden">
                <ui-tab active-name="group" :split="3" :list="transformTabs(tabs)" @change="onChangeTab" />
              </div>
            </div>
            <!-- 博客列表 -->
            <div :key="groupId" class="px-4 lg:px-0 mt-6">
              <ui-pagination :init-value="getInitValue()" :request="requestList">
                <template #default="scope">
                  <div>
                    <BlogRow v-for="item in scope.list" :key="item.id" class="blog-item" :data="item" />
                  </div>
                </template>
              </ui-pagination>
            </div>
          </div>
        </template>
        <!-- 热门数据解读 -->
        <template #right>
          <div class="pl-8 pt-1">
            <div class="text-global-highTitle">
              <p class="text-18-24 mb-3 font-medium">{{ i18n.blog.popular }}</p>
            </div>
            <!-- 热门列表数据 -->
            <BlogHot class="mt-3" />
          </div>
        </template>
      </ui-box>
    </div>
  </div>
</template>
<style scoped lang="scss">
.blog-content {
  background-color: #FAFBFC;

  .blog-item {
    @apply mt-8;
    &:first-child {
      @apply mt-0;
    }
  }
}

.ui-box {
  --ui-box-right: 292px;
}
</style>
