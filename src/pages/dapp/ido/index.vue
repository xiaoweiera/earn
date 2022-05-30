<script setup lang="ts">
/**
 * @file IDO / IGO list
 */
import _ from "lodash";
import API from "src/api/";
import { BlogData } from "src/types/blog";
import I18n from "src/utils/i18n/";
import * as track from "src/logic/track";
import { getValue } from "src/utils/root/data";
import { ref, onMounted, reactive } from "vue";
import { size, uuid, AnyEquals } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { alias, createRef } from "src/utils/ssr/ref";
import { getUiTabList, getTabList, TabTypes } from "src/logic/dapp/dapp";
import { stateAlias, useReactiveProvide, useWatch } from "src/utils/use/state";
import { DAppType } from "src/types/dapp/dapp";

import DAppDiscoversItem from "../discovers/list.vue";
import DAppDiscoversEndList from "../discovers/endlist.vue";
import DAppDiscoversHeader from "../discovers/header.vue";

import type { PropType } from "vue";
import type { Result } from "src/types/dapp/detail";

import { ElInput } from "element-plus";

const props = defineProps({
  name: {
    type: String as PropType<DAppType>,
    required: true,
  },
});

const i18n = I18n();
const keyword = ref<string>("");
const listKey = ref<string>("");
const tabKey = ref<string>("");
const sort = reactive({
  sort_field: "",
  sort_type: "", // desc asc
});
// 定义一个 provide 数据，给子组件（ui-tab）使用
const [query] = useReactiveProvide<object>(stateAlias.ui.tab, {});
const status = ref("");
// 公链
const Chains = createRef<string[]>(alias.dApp.chains, []);
// 平台
const Platforms = createRef<string[]>(alias.dApp.platforms, []);
// 分类
const Categories = createRef<string[]>(alias.dApp.categories, []);

let initValue = true;
const getInitValue = (): object[] => {
  if (initValue) {
    initValue = false;
    return getValue<BlogData[]>(alias.dApp.list, []);
  }
  return [];
};

const onGetList = async function (param: object) {
  const api = new API();
  const activity_stage = safeGet<string>(query, "activity_stage") || TabTypes.upcoming;
  status.value = activity_stage;
  const option = {
    ...sort,
    ...param,
    keyword: _.trim(keyword.value),
    chain: safeGet<string>(query, "chain"),
    platform: safeGet<string>(query, "platform"),
    category: safeGet<string>(query, "category"),
    // 活动类型
    activity_type: _.toUpper(props.name),
    // 活动状态
    activity_stage: _.toUpper(activity_stage),
  };

  const data = await api.dApp.getList<Result>(option);
  const extra = data.extra;
  if (size(Chains.value) < 1) {
    Chains.value = extra.available_chains;
  }
  if (size(Platforms.value) < 1) {
    Platforms.value = extra.available_platforms;
  }
  if (size(Categories.value) < 1) {
    Categories.value = extra.available_categories;
  }
  return data.items;
};

// 搜索框的内容不用缓存到 url
const onSearch = _.debounce(async () => {
  // 刷新列表
  listKey.value = uuid();
}, 300);

// 排序方法
const changeSort = (val: string) => {
  if (!sort.sort_type || sort.sort_field !== val) {
    sort.sort_type = "desc";
  } else if (sort.sort_type === "desc") {
    sort.sort_type = "asc";
  } else {
    sort.sort_type = "";
  }
  sort.sort_field = val;
  listKey.value = uuid();
};

onMounted(function () {
  // 上报数据
  if (AnyEquals(props.name, DAppType.igo)) {
    track.push(track.Origin.gio, track.event.dApp.igo);
  } else {
    track.push(track.Origin.gio, track.event.dApp.ido);
  }
  useWatch(query, () => {
    tabKey.value = uuid();
    listKey.value = uuid();
  });
});
</script>

<template>
  <div class="max-w-315 mx-auto py-6 px-3 md:px-22.5">
    <!-- 头部 -->
    <div class="header mb-6">
      <template v-if="name === DAppType.ido">
        <DAppDiscoversHeader :title="i18n.home.IdoIgo.title" :tips="i18n.home.IdoIgo.desc" />
      </template>
      <template v-else>
        <DAppDiscoversHeader :title="i18n.home.IdoIgo.igotitle" :tips="i18n.home.IdoIgo.desc" />
      </template>
    </div>

    <!-- 分类 -->
    <ui-sticky active-class="table-box-title" class="z-900 is-tab bg-white">
      <div :key="tabKey">
        <ui-tab :list="getTabList(name)" active-name="activity_stage" />
      </div>
    </ui-sticky>

    <div :key="tabKey" class="pt-5 select-wrap">
      <div class="flex items-center justify-between">
        <!--分类-->
        <div class="flex items-center flex-1">
          <div v-if="size(Categories) > 0" class="category-content pr-2">
            <!-- pc 端样式-->
            <div class="items-center hidden lg:flex">
              <div class="w-22 text-14-18 text-global-highTitle mr-4">
                <span class="whitespace-nowrap">{{ i18n.home.topList.category }}</span>
              </div>
              <div class="flex chain-tab">
                <ui-tab :list="getUiTabList(Categories, 'category', 'category')" active-name="category" :split="1" />
              </div>
            </div>
            <!--移动端样式-->
            <client-only class="block lg:hidden select">
              <ui-tab-select :label="i18n.home.topList.category" :list="getUiTabList(Categories, 'category', 'category')" active-name="category" />
            </client-only>
          </div>
          <!--公链-->
          <client-only v-if="size(Chains) > 0" class="chain-content select">
            <ui-tab-select :label="i18n.home.idoIgoProject.chain" :list="getUiTabList(Chains, 'chain', 'chain')" active-name="chain" />
          </client-only>
        </div>
        <!-- 搜索框 -->
        <client-only class="ml-4 w-50 hidden lg:block input-style">
          <el-input v-model="keyword" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo-da" class="text-global-highTitle" size="16" @click="onSearch" />
            </template>
          </el-input>
        </client-only>
      </div>
      <!--平台-->
      <div class="mt-4 flex items-center">
        <div class="flex items-center flex-1 lg:w-full pr-2 lg:mr-0">
          <!--pc端样式-->
          <div class="hidden lg:flex items-center w-full">
            <div class="w-22 text-14-18 text-global-highTitle mr-2">
              <span class="whitespace-nowrap">{{ i18n.home.topList.plat }}</span>
            </div>
            <div v-if="size(Platforms) > 0" class="ml-2 flex-1 w-1 chain-tab">
              <ui-tab :list="getUiTabList(Platforms, 'platform', 'tge_platform')" active-name="platform" :split="4" />
            </div>
          </div>
          <client-only class="block lg:hidden w-full select">
            <ui-tab-select :label="i18n.home.topList.plat" :list="getUiTabList(Platforms, 'platform', 'tge_platform')" active-name="platform" />
          </client-only>
        </div>

        <!-- 移动端展示搜索框 -->
        <client-only class="block lg:hidden w-1/2 input-style">
          <el-input v-model="keyword" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo-da" class="text-global-highTitle" size="16" @click="onSearch" />
            </template>
          </el-input>
        </client-only>
      </div>
    </div>
    <div :key="listKey" class="py-8">
      <ui-pagination :limit="20" :request="onGetList" :init-value="getInitValue()">
        <template #default="scope">
          <div v-if="query.activity_stage === TabTypes.ended" class="overflow-x-scroll showX">
            <div class="w-315">
              <DAppDiscoversEndList :params="sort" :list="scope.list" :name="name" @change-sort="changeSort" />
            </div>
          </div>
          <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <DAppDiscoversItem v-for="(data, index) in scope.list" :key="index" :status="status" :data="data" :name="name" />
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrap {
  .chain-content,
  .category-content {
    @apply w-1/2;
  }

  @screen lg {
    .chain-content {
      @apply w-35;
    }
  }
}

.is-tab {
  box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
}

.input-style {
  ::v-deep(.el-input__inner) {
    padding-left: 31px !important;
    @apply border-1 border-global-highTitle border-opacity-4 bg-global-white rounded-md;
  }

  ::v-deep(input::-webkit-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle font-medium;
  }

  ::v-deep(input::-ms-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle font-medium;
  }
}

@screen md {
  .input-style {
    ::v-deep(.el-input__inner) {
      padding-left: 31px !important;
      @apply border-1 border-global-highTitle border-opacity-4 bg-global-topBg rounded-md;
    }

    ::v-deep(input::-webkit-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle font-medium;
    }

    ::v-deep(input::-ms-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle font-medium;
    }
  }
}
.select {
  ::v-deep(.el-input__inner) {
    @apply border-1 border-global-highTitle border-opacity-4 bg-global-white h-8 rounded-md;
    @apply text-kd14px18px w-full text-left text-global-highTitle flex items-center;
  }

  ::v-deep(.el-select-dropdown__item) {
    @apply text-kd14px18px w-full text-left text-global-highTitle;
  }

  @screen lg {
    ::v-deep(.el-input__inner) {
      @apply border-1 border-global-highTitle border-opacity-4 text-kd14px18px w-25 h-8 pl-3 bg-global-topBg text-left text-global-highTitle flex items-center;
    }

    ::v-deep(.el-select-dropdown__item) {
      @apply text-kd14px18px w-25 text-left text-global-highTitle;
    }
  }
}

%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}

.chain-tab {
  @apply flex items-center;
  ::v-deep(.tab-wrap) {
    @apply items-center flex;
    .tab-item {
      @apply flex px-3 py-2   rounded-md;
      &:after {
        @apply h-0;
      }

      &:not(a) {
        &:not([href]) {
          @apply cursor-pointer ml-4;
          @extend %first-ml0;
        }
      }

      &:not(:first-child) {
        @apply ml-4;
      }
    }

    span {
      @apply text-kd14px18px font-medium font-kdFang;
    }

    .active {
      @apply flex max-h-8 bg-global-darkblue bg-opacity-6 rounded-md;
    }
  }
}
</style>
