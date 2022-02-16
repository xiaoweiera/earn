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
import { getAll, tabAll, Model, transformTabs } from "src/logic/blog";
import {toArray, Equals} from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import {BlogTab, BlogData} from "src/types/blog/";
import {createRef, getValue, onLoadRef} from "src/utils/ssr/ref";
import UiBox from "~/components/ui/box/index.vue";

const i18n = I18n();

const activeName = ref<string>("group");
const tabs = createRef<BlogTab[]>("API.blog.tabs", toArray(getAll()));
const groupId = createRef<string | number | undefined>(`query.${activeName.value}`, tabAll);

const getInitValue = function () {
  const queryGroup = getValue<string>(`query.${activeName.value}`, tabAll);
  if (Equals(queryGroup, groupId.value as string)) {
    return getValue<BlogData[]>("API.blog.getList", []);
  }
  return [];
}

// 获取列表数据
const requestList = async function (data: object) {
  const api = new Model();
  const page = safeGet<number>(data, "page");
  const size = safeGet<number>(data, "page_size");
  return api.getList(groupId.value, page, size);
}
// 切换分组
const onChangeTab = function (data: object) {
  const value = safeGet<string>(data, activeName.value);
  if (value) {
    groupId.value = value;
  } else {
    groupId.value = tabAll;
  }
}

onMounted(function () {
  const api = new Model();
  // 如果 tabs 数据为空，则执行 blog.getTabs 将放回结果赋值给 tabs
  onLoadRef(tabs, api.getTabs);
});

</script>

<template>
  <div class="blog-content px-3 md:px-0">
    <div class="md:max-w-280 flex mx-auto pb-15">
      <ui-box class="pt-3 md:pt-7">
        <template #default>
          <div class="pt-1">
            <!--顶部数据-->
            <BlogAd/>

            <div class="px-0 py-3">
              <!-- 分类 -->
              <ui-tab active-name="group" :list="transformTabs(tabs)" @change="onChangeTab"></ui-tab>
            </div>

            <!-- 博客列表 -->
            <div class="mt-6" :key="groupId">
              <ui-pagination :init-value="getInitValue()" :request="requestList">
                <template #default="scope">
                  <div>
                    <BlogRow v-for="item in scope.list" class="blog-item" :key="item.id" :data="item"/>
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
            <BlogHot class="mt-3"/>
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
