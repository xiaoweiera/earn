<script setup lang="ts">
import _ from "lodash";
import API from "src/api/";
import I18n from "src/utils/i18n/";
import { ref, onMounted, reactive } from "vue";
import { size, uuid } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { alias, createRef } from "src/utils/ssr/ref";
import { getTabList, TabTypes, getUiTabList, getOptionList } from "src/logic/dapp/nft";
import { transformNftList } from "src/logic/dapp";
import { stateAlias, useReactiveProvide, useWatch } from "src/utils/use/state";

import type { PropType } from "vue";
import type { DAppType } from "src/types/dapp/dapp";
import type { Result } from "src/types/dapp/detail";
import { ElOption, ElSelect, ElInput } from "element-plus";

import DAppDiscoversHeader from "src/pages/dapp/discovers/header.vue";
import DAppNftEndList from "src/pages/dapp/nfts/endlist.vue";
import HomeAd from "src/pages/home/ad.vue";
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
// 平台
const Platforms = createRef<string[]>(alias.dApp.platforms, []);
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
      <!-- 广告 -->
      <div class="w-full">
        <HomeAd class="mb-6" :position="24" />
      </div>
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="z-900 is-tab bg-global-topBg">
        <ui-tab :list="getTabList(name)" active-name="activity_stage" />
      </ui-sticky>
      <!-- 搜索条件 -->
      <div class="mt-5">
        <div class="flex items-center">
          <div class="flex items-center flex-1 mr-2">
            <div class="flex items-center w-1/2">
              <span class="whitespace-nowrap">{{ i18n.home.topList.category }}</span>
              <div class="ml-2 flex-1 w-1">
                <ui-tab :list="getUiTabList(Categories, 'category')" active-name="category" :split="2" />
              </div>
            </div>
            <div class="flex items-center w-1/2">
              <div class="flex items-center">
                <div class="text-kd12px16px md:text-14-18 text-global-highTitle">{{ i18n.home.idoIgoProject.chain }}</div>
                <div class="flex items-center flex-1 w-full md:w-25 h-8 ml-2 md:ml-4">
                  <div class="w-full">
                    <client-only class="flex items-center justify-between">
                      <el-select :popper-append-to-body="false" class="projectMining flex-1 select" size="small" @change="change">
                        <el-option v-for="item in getOptionList(Chains, 'chain')" :key="item" :label="item.name" :value="item.value" />
                      </el-select>
                    </client-only>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 搜索框 -->
          <client-only class="w-50 input-style">
            <el-input v-model="keyword" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
              <template #prefix>
                <IconFont type="icon-sousuo-da" class="text-global-highTitle" size="16" @click="onSearch" />
              </template>
            </el-input>
          </client-only>
        </div>
      </div>
      <!--      <div v-if="summary">-->
      <!--        <DAppNftSearch :data="summary" />-->
      <!--      </div>-->

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
.is-tab {
  box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
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
</style>
