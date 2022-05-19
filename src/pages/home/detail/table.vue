<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";
import { ElTable, ElTableColumn } from "element-plus";
import _ from "lodash";
import { getWidth, Model } from "src/logic/home";
// import window from "src/plugins/browser/window";
// import { createHref } from "src/plugins/router/pack";
import { config as routerConfig } from "src/router/config";
import type { detail } from "src/types/home";
// import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { PropType } from "vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import HomeTableHeader from "../table/header.vue";
import HomeTableTd from "../table/td.vue";
import * as R from "ramda";
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
const resultNumber = ref(0);
const loading = ref(false);
const key = ref(0);
const api = new Model();
watch(route, () => {
  const query: any = getParam<string>();
  params.chain = query.chain;
  params.category = query.category;
  key.value++;
  getData(true);
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
const data: any = createReactive<detail>("API.home.getProjects", {} as any);
// 防抖
const getData = _.debounce(async (clear?: boolean) => {
  await debounceData(clear);
}, 300);
// 得到表格数据
const debounceData = async (clear?: boolean) => {
  loading.value = true;
  if (clear) {
    params.page = 1;
    data.items = [];
  }
  const res: any = await api.getProjects(params);
  resultNumber.value = safeGet(res, "items.length");
  data.items = data.items.concat(res.items);
  loading.value = false;
};
// more
// const more = () => {
//   params.page++;
//   getData();
// };
// const isSearch = ref(false);
let sortNumber = 0;
let highList: string[] = [];
// 排序
const sort = (item: any) => {
  highList = [];
  R.forEach((item: any) => {
    if (item.active) {
      highList.push(item.key);
    }
  }, data.header);
  const key = item.key;
  if (!item.sort) return;
  if (highList.includes(key) && sortNumber === 0) {
    params.sort_field = key;
    params.sort_type = "asc";
    sortNumber++;
  } else if (!params.sort_type || params.sort_field !== key) {
    params.sort_type = "desc";
    params.sort_field = key;
  } else if (params.sort_type === "desc") {
    params.sort_type = "asc";
    params.sort_field = key;
  } else {
    params.sort_field = "";
    params.sort_type = "";
    sortNumber = 0;
  }
  getData(true);
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
onMounted(() => {
  // 得到数据汇总
  onLoadReactive(data, () => api.getProjects(params));
  resultNumber.value = safeGet(data, "items.length") ? safeGet(data, "items.length") : 0;
});

const rowClass = () => {
  const styleJson = {
    height: "60px",
    border: "none",
  };
  return styleJson;
};
const headerCellClass = () => {
  const styleJson = {
    border: "none",
    borderTop: "1px solid rgba(3, 54, 102, 0.06) !important",
    borderBottom: "1px solid rgba(3, 54, 102, 0.06) !important",
    padding: "0",
    height: "40px",
  };
  return styleJson;
};
const cellClass = () => ({ border: "none" });
// const getW=(key:string)=>{
//     if (chainIcon.includes(name)) {
//       return "chainIcon";
//     } else if (iconHref.includes(name)) {
//       return "iconHref";
//     } else if (starNumber.includes(name)) {
//       return "starNumber";
//     } else if (txt.includes(name)) {
//       return "txt";
//     } else if (numberPrice.includes(name)) {
//       return "numberPrice";
//     } else if (dappNftMix.includes(name)) {
//       return "dappNftMix";
//     } else if (chainNumber.includes(name)) {
//       return "chainNumber";
//     } else if (numberUnit.includes(name)) {
//       return "numberUnit";
//     } else if (numbers.includes(name)) {
//       return "numbers";
//     } else if (numberChange.includes(name)) {
//       return "numberChange";
//     } else if (lever.includes(name)) {
//       return "lever";
//     } else if (timeType.includes(name)) {
//       return "timeType";
//     } else if (changePercent.includes(name)) {
//       return "changePercent";
//     } else {
//       return "";
//     }
// }
</script>
<template>
  <div class="table-box overflow-hidden md:mb-0 mb-4">
    <div v-if="safeGet(data, 'items.length') || loading" class="w-full">
      <el-table :row-style="rowClass" :header-cell-style="headerCellClass" :cell-style="cellClass" :data="data.items" style="width: 100%">
        <el-table-column class-name="lie" fixed :height="60" :width="30">
          <template #header>
            <div class="text-kd12px16px font-medium text-global-highTitle">#</div>
          </template>
          <template #default="scope">
            <div class="text-kd14px16px text-number text-global-highTitle whitespace-nowrap">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>
        <template v-for="(item, i) in data.header" :key="i">
          <el-table-column class-name="lie" :fixed="i === 0 ? true : false" :height="60" :width="getWidth(item.key, info.show_type)">
            <template #header>
              <HomeTableHeader :params="params" :item="item" @click="sort(item)" />
            </template>
            <template #default="scope">
              <HomeTableTd :type-name="item.key" :data="scope.row" />
            </template>
          </el-table-column>
        </template>
      </el-table>
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
.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}
</style>
