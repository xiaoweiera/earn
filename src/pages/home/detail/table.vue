<script lang="ts" setup>
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

import Content from "src/pages/home/topic/content/index.vue";
import { getList, Table } from "src/pages/home/topic/data";

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
const id: string = safeGet(route, "params.id");
const chain = ref(getParam<string>("chain"));
const category = ref(getParam<string>("category"));
const query = ref(getParam<string>("search"));
const params = reactive({
  id,
  page: 1,
  page_size: 30,
  chain: chain.value,
  category: category.value,
  query: query.value,
  sort_field: "",
  sort_type: "", // desc asc
});
const key = ref(0);
// const isSearch = ref(false);
// const api = new Model();
watch(route, () => {
  const query: any = getParam<string>();
  params.chain = query.chain;
  params.category = query.category;
  key.value++;
});
// 搜索
const search = ref(getParam<object>("search"));
watch(search, (n: any) => {
  const query: any = getParam<object>();
  params.query = n;
  router.push({
    path: `${routerConfig.homeDetail}/${safeGet(route, "params.id")}`,
    query: {
      ...query,
      // @ts-ignore
      search: n,
    },
  });
});
// const data: any = createReactive<detail>("API.home.getProjects", {} as any);

// 排序
const sort = () => key.value++;
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
const table = reactive<Table>({} as Table);
const update = onUpdateReactive(table, getList);
update();

let initStatus = true; //初始化
const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return table.items;
  }
  return [];
};
const requestList = function () {
  // const newParam = Object.assign(
  //     params,
  //     query,
  // );
  update();
  return table.items;
};
</script>
<template>
  <div class="table-box overflow-hidden md:mb-0 mb-4">
    <div v-if="safeGet(table, 'items.length') > 0" :key="key">
      <ui-pagination :limit="3" :init-value="initValue()" :request="requestList">
        <template #default="scope">
          <div>
            <el-table :data="scope.list" class="w-full" :row-style="rowClass" :header-cell-style="headerCellClass" :cell-style="cellClass">
              <el-table-column class-name="lie" fixed :height="60" :width="30">
                <template #header>
                  <div class="header-name items-center flex h-full">#</div>
                </template>
                <template #default="scope">
                  <div class="text-kd14px16px text-number text-global-highTitle whitespace-nowrap">{{ scope.$index + 1 }}</div>
                </template>
              </el-table-column>
              <template v-for="(header, index) in table.header" :key="index">
                <el-table-column :fixed="index === 0" :width="header.width ? header.width : 150">
                  <template #header>
                    <uiSort class="header-name" :active="header.active" :sort="header.sort" :sort-data="params" :key-name="header.sort_field" :name="header.title" @change="sort" />
                  </template>
                  <template #default="scope">
                    <!-- <div>test</div>-->
                    <Content :fields="header.fields" :center="header.center" :type="header.type" :data="scope.row" />
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
