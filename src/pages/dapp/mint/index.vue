<script setup lang="ts">
/**
 * @file Mint list
 */
import _ from "lodash";
import API from "src/api/";
import I18n from "src/utils/i18n/";
import * as track from "src/logic/track";
import { ref, onMounted, reactive } from "vue";
import { size, uuid } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { alias, createRef } from "src/utils/ssr/ref";
import { getTabList, TabTypes, getUiTabList } from "src/logic/dapp/nft";
import { transformNftList } from "src/logic/dapp";
import { stateAlias, useReactiveProvide, useWatch } from "src/utils/use/state";

import type { PropType } from "vue";
import type { DAppType } from "src/types/dapp/dapp";
import type { Result } from "src/types/dapp/detail";
import { ElInput } from "element-plus";

import DAppDiscoversHeader from "src/pages/dapp/discovers/header.vue";
import DAppNftEndList from "src/pages/dapp/nfts/endlist.vue";
import DAppNftUpcoming from "src/pages/dapp/nfts/upcoming.vue";

const props = defineProps({
  name: {
    type: String as PropType<DAppType>,
    required: true,
  },
});

const i18n = I18n();
const key = ref<string>(uuid());
const keyword = ref<string>("");
const listKey = ref<string>("");
const tabKey = ref<string>("");
const sort = reactive({
  sort_type: "",
  sort_field: "",
});

// 定义一个 provide 数据，给子组件（ui-tab）使用
const [query] = useReactiveProvide<object>(stateAlias.ui.tab, {});
// 公链
const Chains = createRef<string[]>(alias.dApp.chains, []);
// 分类
const Categories = createRef<string[]>(alias.dApp.categories, []);

const requestList = async function (param: object) {
  const api = new API();
  const activity_stage = safeGet<string>(query, "activity_stage") || TabTypes.upcoming;
  const option = {
    ...param,
    keyword: _.trim(keyword.value),
    chain: safeGet<string>(query, "chain"),
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

onMounted(function () {
  track.push(track.Origin.gio, track.event.dApp.nft);
  useWatch(query, () => {
    tabKey.value = uuid();
    listKey.value = uuid();
  });
});
const changeSort = function (val: any) {
  if (!sort.sort_type || sort.sort_field !== val) {
    sort.sort_type = "desc";
  } else if (sort.sort_type === "desc") {
    sort.sort_type = "asc";
  } else {
    sort.sort_type = "";
  }
  // 定义排序参数
  sort.sort_field = val;
  // 重新渲染列表
  listKey.value = uuid();
};
</script>

<template>
  <div class="pb-15 bg-global-topBg px-3 md:px-22.5">
    <div :key="key" class="max-w-315 mx-auto pt-8">
      <!-- 项目名称 -->
      <div class="w-full mb-6">
        <DAppDiscoversHeader :tips="i18n.home.nfts.desc" :title="i18n.home.nfts.title" />
      </div>
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="z-900 is-tab bg-global-topBg">
        <ui-tab :list="getTabList()" active-name="activity_stage" />
      </ui-sticky>

      <!-- 搜索条件 -->
      <div class="mt-5 select-wrap">
        <div class="hidden lg:block flex justify-between items-center">
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
                    <ui-tab :list="getUiTabList(Categories, 'category')" active-name="category" :split="2" />
                  </div>
                </div>
              </div>
              <!--公链-->
              <client-only v-if="size(Chains) > 0" class="chain-content select">
                <ui-tab-select :label="i18n.home.idoIgoProject.chain" :list="getUiTabList(Chains, 'chain')" active-name="chain" />
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
        </div>
        <!-- 移动端展示 -->
        <div class="block lg:hidden flex items-center">
          <!--公链-->
          <client-only v-if="size(Chains) > 0" class="chain-content w-1/2 select">
            <ui-tab-select :label="i18n.home.idoIgoProject.chain" :list="getUiTabList(Chains, 'chain')" active-name="chain" />
          </client-only>
          <IconFont v-if="Chains" size="24" class="text-global-highTitle text-opacity-10 mx-2 relative h-full" type="icon-gang" />
          <client-only class="w-1/2 input-style">
            <el-input v-model="keyword" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
              <template #prefix>
                <IconFont type="icon-sousuo-da" class="text-global-highTitle" size="16" @click="onSearch" />
              </template>
            </el-input>
          </client-only>
        </div>
      </div>

      <div :key="listKey" class="mt-4">
        <ui-pagination :limit="20" :request="requestList">
          <template #default="scope">
            <!--历史项目-->
            <div v-if="query.activity_stage === TabTypes.ended" class="showX">
              <DAppNftEndList class="min-w-307" :params="sort" :list="scope.list" @change-sort="changeSort" />
            </div>
            <!--进行中-->
            <DAppNftUpcoming v-else class="pb-1" :list="transformNftList(scope.list)" />
          </template>
        </ui-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
