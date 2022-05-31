<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";
import { ElTable, ElTableColumn, ElInput, ElPopover } from "element-plus";
import HomeFilter from "src/pages/home/filter.vue";
import { rowClass, headerCellClass, cellClass, getTitleCnEn, getTitleDes } from "src/pages/home/topic/data";
import { config as routerConfig } from "src/router/config";
import { getParam } from "src/utils/router";
import { computed, reactive, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getValue } from "src/utils/root/data";
import type { topicDetail } from "src/types/home";
import Content from "src/pages/home/topic/content/index.vue";
import { getTopicDetail, Header } from "src/pages/home/topic/data";
import document from "src/plugins/browser/document";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";
import { Model } from "src/logic/home";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  isFilter: {
    type: Boolean,
    default: true,
  },
  isMore: {
    type: Boolean,
    default: true,
  },
  bgClass: {
    type: String,
    default: "",
  },
  limit: {
    type: Number,
    default: 30,
  },
  origin: {
    type: String,
    default: "",
  },
});
const height = document.body.clientWidth > 375 ? 60 : 50;
const route = useRoute();
const router = useRouter();
const key = ref<number>(0);
const headerList = ref<Header[]>([]);
const id: string = getValue<string>("query.id") as string;
const detail = createReactive<topicDetail>("API.home.getDetail", {} as any);

const isLoad = ref(false);
const params = reactive({
  id: id ? id : props.id,
  chain: getParam<string>("chain"),
  category: getParam<string>("category"),
  platform: getParam<string>("platform"),
  keyword: getParam<string>("search"),
  sort_field: "",
  sort_type: "", // desc asc
  page: 1,
  page_size: 20,
});
const isSearch = ref(false);
watch(route, () => {
  params.chain = getParam<string>("chain");
  params.category = getParam<string>("category");
  params.platform = getParam<string>("platform");
  key.value++;
});
// 搜索
const search = ref(getParam<string>("search"));
watch(search, (n: any) => {
  const value = getParam<object>();
  router.push({
    path: `${routerConfig.homeDetail}/${id}`,
    query: Object.assign({}, value, {
      search: n,
    }),
  });
});

// 排序
const sort = () => {
  if (!params.sort_type) {
    params.sort_field = "";
  }
  key.value++;
};
// row跳转
const toProject = (row: any) => {
  if (!row.id) return;
  let url = "";
  if (props.origin) {
    url = `/rank/${props.origin}/${row.id}`;
  } else if (detail.category === "NFT") {
    url = `/rank/nft/${row.id}`;
  } else {
    url = `/rank/dapp/${row.id}`;
  }
  window.open(createHref(url));
};
// 是否有筛选
const showFilter = computed(() => {
  if (safeGet(detail, "chain_filter_supported") || safeGet(detail, "platform_filter_supported") || safeGet(detail, "category_filter_supported") || safeGet(detail, "keyword_filter_supported")) {
    return true;
  }
  return false;
});

const initValue = function () {
  return [];
};
const requestList = async function (query: any) {
  if (query.page === 1) {
    isLoad.value = false;
  }
  const newParam = Object.assign(params, query);
  const { header, items } = await getTopicDetail(newParam);
  isLoad.value = true;
  // 如果 header 数据已存在，则直接返回列表
  if (headerList.value.length > 0) {
    return items;
  }
  headerList.value = header;
  return items;
};
onMounted(() => {
  onLoadReactive(detail, () => {
    const api = new Model();
    return api.getTopicDetail(params);
  });
});
</script>
<template>
  <div class="showX md:mb-0 mb-4" :class="`${bgClass}`">
    <div class="flex xshidden flex-wrap justify-between items-baseline">
      <HomeFilter v-if="safeGet(detail, 'id') && showFilter" :key="key" :info="detail" class="mb-4" />
      <client-only>
        <div v-if="isSearch" class="relative flex flex-wrap items-center search">
          <IconFont class="absolute text-global-highTitle text-opacity-45 z-22 left-3" size="16" type="icon-sousuo-da1" />
          <el-input v-model="search" placeholder="Search" />
        </div>
      </client-only>
    </div>
    <div :key="key">
      <ui-pagination :limit="limit" :isMore="isMore" :init-value="initValue()" :request="requestList">
        <template #default="{ list }">
          <div v-show="isLoad">
            <el-table :data="list" class="w-full" :row-style="rowClass(height)" :header-cell-style="headerCellClass" :cell-style="cellClass" @row-click="toProject">
              <el-table-column class-name="lie" fixed :width="50">
                <template #header>
                  <div class="header-name items-center flex h-full">#</div>
                </template>
                <template #default="scope">
                  <span class="text-kd14px16px text-number text-global-highTitle whitespace-nowrap">
                    <span>{{ scope.$index + 1 }}</span>
                    <!--隐藏一个链接，用作 seo-->
                    <v-router class="hidden">{{ scope.row.name }}</v-router>
                  </span>
                </template>
              </el-table-column>
              <template v-for="(header, index) in headerList" :key="index">
                <el-table-column :fixed="index === 0" :width="header.width ? header.width : 150">
                  <template #header>
                    <div class="relative h-full flex items-center" :class="{ 'justify-center': header.center }">
                      <ui-sort class="header-name fit" :active="header.active" :sort="header.sort" :sort-data="params" :key-name="header.sort_field" :field="header.title" :name="getTitleCnEn(header)" @change="sort" />
                      <el-popover :disabled="!getTitleDes(header)" placement="top" trigger="hover">
                        <div>{{ getTitleDes(header) }}</div>
                        <template #reference>
                          <div v-if="getTitleDes(header)" class="h-full flex items-center hand"><IconFont class="text-global-highTitle text-opacity-35 ml-1" type="icon-weizhi" size="16" /></div>
                        </template>
                      </el-popover>
                    </div>
                  </template>
                  <template #default="scope">
                    <div>
                      <Content :center="header.center" :width="header.width" :fields="header.fields" :type="header.type" :data="scope.row" />
                    </div>
                  </template>
                </el-table-column>
              </template>
            </el-table>
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fit {
  width: fit-content !important;
}
::v-deep(.el-popover.el-popper) {
  min-width: fit-content !important;
  width: fit-content !important;
  padding: 0px 0px 0px 0px !important;
  border-radius: 100px;
  word-break: break-word;
  max-width: 400px;
  transform: translate(100%, 100%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.search {
  ::v-deep(.el-input__inner) {
    border: none !important;
    background: #fafbfc;
    height: 34px !important;
    padding-left: 35px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-50 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }
}

::v-deep(.cell) {
  height: 100%;
}
::v-deep(.el-scrollbar) {
  --el-scrollbar-bg-color: rgba(0, 0, 0, 0.2) !important;
  --el-scrollbar-hover-bg-color: rgba(0, 0, 0, 0.2) !important;
}

.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}

.header-name {
  @apply text-kd12px16px font-medium text-global-highTitle;
}

.huiClass {
  ::v-deep(td) {
    background-color: rgba(248, 250, 250, 1) !important;
  }

  ::v-deep(tr) {
    background-color: rgba(248, 250, 250, 1) !important;
  }

  ::v-deep(th) {
    background-color: rgba(248, 250, 250, 1) !important;
  }
}
</style>
