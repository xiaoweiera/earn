<script lang="ts" setup>
import VRouter from "src/components/v/router.vue";
import { isBoolean, uuid } from "src/utils/";
import safeGet from "@fengqiaogang/safe-get";
import { ElTable, ElTableColumn } from "element-plus";
// import { Model} from "src/logic/home";
// import window from "src/plugins/browser/window";
// import { createHref } from "src/plugins/router/pack";
import { rowClass, headerCellClass, cellClass } from "src/pages/home/topic/data";
import { config as routerConfig } from "src/router/config";
import type { detail } from "src/types/home";
// import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router";
import { onUpdateReactive } from "src/utils/ssr/ref";
import type { PropType } from "vue";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getValue } from "src/utils/root/data";

import Content from "src/pages/home/topic/content/index.vue";
import { getList, Table, Header } from "src/pages/home/topic/data";

defineProps({
  info: {
    type: Object as PropType<detail>,
    default: () => {
      return {};
    },
  },
});
// const i18n = I18n();
const route = useRoute();
const router = useRouter();
const key = ref<string>(uuid());
const headerList = ref<Header[]>([]);
const id: string = getValue<string>("query.id") as string;
const chain = ref(getValue<string>("chain"));
const category = ref(getValue<string>("category"));
const query = ref(getValue<string>("search"));
const sortField = ref(getValue<string>("sort_field"));
const sortType = ref(getValue<string>("sort_type"));
const params = function () {
  return {
    id,
    page: 1,
    page_size: 30,
    chain: chain.value,
    category: category.value,
    query: query.value,
    sort_field: sortField.value,
    sort_type: sortType.value, // desc asc
  };
};
// const isSearch = ref(false);
// const api = new Model();
watch(route, () => {
  chain.value = getParam<string>("chain");
  category.value = getParam<string>("category");
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
const sort = (data: object) => {
  // 修改排序字段与类型
  sortField.value = safeGet<string>(data, "field");
  sortType.value = safeGet<string>(data, "type");
  key.value = uuid(params());
};
// const toProject = (url: string) => {
//   if (url) {
//     window.open(createHref(url));
//   }
// };
// const getNameWidth = (item: any) => {
//   // @ts-ignore
//   if (item.key === "name" && safeGet(props.info, "show_type") === "data") {
//     return "min-w-30 max-w-30";
//     // @ts-ignore
//   } else if (item.key === "name" && safeGet(props.info, "show_type") === "desc") {
//     return "w-150";
//   }
//   return "";
// };
// 是否有筛选
// const isFilter = () => {
//   // @ts-ignore
//   if (safeGet(props.info, "filters.chain.show") && safeGet(props.info, "filters.chain.options.length") > 0) {
//     return true;
//     // @ts-ignore
//   } else if (safeGet(props.info, "filters.category.show") && safeGet(props.info, "filters.category.options.length") > 0) {
//     return true;
//     // @ts-ignore
//   } else if (safeGet(props.info, "filters.search.show") && safeGet(props.info, "filters.search.options.length") > 0) {
//     return true;
//   }
//   return false;
// };

// let initStatus = true; //初始化
const initValue = function () {
  // if (initStatus) {
  //   initStatus = false;
  //   return table.items;
  // }
  return [];
};
const requestList = async function () {
  const { header, items } = await getList();
  // 如果 header 数据已存在，则直接返回列表
  if (headerList.value.length > 0) {
    return items;
  }
  headerList.value = header;
  return items;
};
</script>
<template>
  <div class="table-box overflow-hidden md:mb-0 mb-4">
    <div :key="key">
      <ui-pagination :limit="3" :init-value="initValue()" :request="requestList">
        <template #default="{ list }">
          <el-table :data="list" class="w-full" :row-style="rowClass" :header-cell-style="headerCellClass" :cell-style="cellClass">
            <el-table-column class-name="lie" fixed :height="60" :width="30">
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
                  <ui-sort class="header-name" :active="header.active" :sort="header.sort" :sort-data="params()" :key-name="header.sort_field" :name="header.title" @change="sort" />
                </template>
                <template #default="scope">
                  <div :class="{ 'text-center': isBoolean(header.center) }">
                    <Content :fields="header.fields" :type="header.type" :data="scope.row" />
                  </div>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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

.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}

.header-name {
  @apply text-kd12px16px font-medium text-global-highTitle;
}
</style>
