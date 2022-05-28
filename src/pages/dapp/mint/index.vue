<script setup lang="ts">
/**
 * @file Mint list
 */
import _ from "lodash";
import API from "src/api/";
import I18n from "src/utils/i18n/";
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
      <div class="mt-5">
        <div class="flex items-center">
          <div class="flex items-center flex-1 mr-2">
            <div class="flex items-center w-1/2">
              <span class="whitespace-nowrap">{{ i18n.home.topList.category }}</span>
              <div class="ml-2 flex-1 w-1">
                <ui-tab :list="getUiTabList(Categories, 'category')" active-name="category" :split="2" />
              </div>
            </div>

            <!--公链-->
            <client-only v-if="size(Chains) > 0" class="chain-content w-35">
              <ui-tab-select :label="i18n.home.idoIgoProject.chain" :list="getUiTabList(Chains, 'chain')" active-name="chain" />
            </client-only>
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
