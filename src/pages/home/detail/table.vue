<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";
import { ElInput } from "element-plus";
import _ from "lodash";
import { Model } from "src/logic/home";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";
import { config as routerConfig } from "src/router/config";
import type { detail } from "src/types/home";
import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { PropType } from "vue";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import HomeFilter from "../filter.vue";
import HomeTableHeader from "../table/header.vue";
import HomeTableTd from "../table/td.vue";

const props = defineProps({
  info: {
    type: Object as PropType<detail>,
    default: () => {
      return {};
    },
  },
});
const i18n = I18n();
const route = useRoute();
const router = useRouter();
const id = getParam<string>("id");
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
watch(route, (n) => {
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
    path: routerConfig.homeDetail,
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
  resultNumber.value = res?.items?.length;
  data.items = data.items.concat(res.items);
  loading.value = false;
};
// more
const more = () => {
  params.page++;
  getData();
};
const isSearch = ref(false);
onMounted(() => {
  // 得到数据汇总
  onLoadReactive(data, () => api.getProjects(params));
  resultNumber.value = safeGet(data, "items.length") ? safeGet(data, "items.length") : 0;
});
// 排序
const sort = (item: any) => {
  const key = item.key;
  if (!item.sort) return;
  if (!params.sort_type || params.sort_field !== key) {
    params.sort_type = "desc";
  } else if (params.sort_type === "desc") {
    params.sort_type = "asc";
  } else {
    params.sort_type = "";
  }
  params.sort_field = key;
  getData(true);
};
const toProject = (url: string) => {
  if (url) {
    window.open(createHref(url));
  }
};
const getNameWidth = (item: any) => {
  // @ts-ignore
  if (item.key === "name" && props.info.show_type === "data") {
    return "min-w-30 max-w-30";
    // @ts-ignore
  } else if (item.key === "name" && props.info.show_type === "desc") {
    return "w-150";
  }
  return "";
};
// 是否有筛选
const isFilter = () => {
  // @ts-ignore
  if (props.info.filters.chain.show && props.info.filters.chain.options.length > 0) {
    return true;
    // @ts-ignore
  } else if (props.info.filters.category.show && props.info.filters.category.options.length > 0) {
    return true;
    // @ts-ignore
  } else if (props.info.filters?.search?.show && props.info.filters?.search?.options.length > 0) {
    return true;
  }
  return false;
};
</script>
<template>
  <div class="table-box md:mb-0 mb-4">
    <div class="flex xshidden justify-between items-baseline">
      <HomeFilter v-if="info.id && isFilter()" :key="key" :filters="info.filters" :info="info" class="mb-4 -mt-2" />
      <client-only>
        <div v-if="isSearch" class="relative flex items-center search">
          <IconFont
            class="absolute text-global-highTitle text-opacity-45 z-22 left-3"
            size="16"
            type="icon-sousuo-da1"
          />
          <el-input v-model="search" placeholder="Search" />
        </div>
      </client-only>
    </div>
    <div v-if="safeGet(data, 'items.length') || loading" class="showX">
      <table class="table-my min-w-243">
        <thead>
          <tr class="min-h-10">
            <td class="h-full border-tb">
              <div class="text-left w-5">#</div>
            </td>
            <template v-for="(item, index) in data.header" :key="index">
              <td v-if="item.key !== 'id'" :class="getNameWidth(item)" class="text-left border-tb">
                <HomeTableHeader :item="item" :params="params" name="Project Name" @click="sort(item)" />
              </td>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in data.items">
            <tr
              :class="info.show_type === 'desc' ? 'md:h-18' : 'md:h-13'"
              class="min-h-12.5 h-12.5 md:min-h19.5 hand"
              @click="toProject(item.url)"
            >
              <td class="number">
                <div class="text-left w-5">{{ index + 1 }}</div>
              </td>
              <template v-for="(itemTwo, index) in data.header" :key="index">
                <td v-if="itemTwo.key !== 'id'">
                  <HomeTableTd :data="item" :info="info" :type-name="itemTwo.key" />
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <ui-empty v-else-if="safeGet(data, 'items.length') === 0 && !loading" class="pb-3 pt-10" />
    <div v-if="safeGet(data, 'items.length') > 0 && resultNumber >= params.page_size" class="more" @click="more">
      {{ i18n.home.loadingMore }}
    </div>
    <UiLoading v-if="loading" class="fixed top-0 bottom-0 left-0 right-0" />
  </div>
</template>
<style lang="scss" scoped>
.search {
  ::v-deep(.el-input__inner) {
    border: 1px solid rgba(3, 54, 102, 0.1) !important;
    background: #fafbfc;
    height: 34px !important;
    padding-left: 35px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-50 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }
}

.border-tb {
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

.title {
  @apply text-kd18px24px font-medium font-kdFang text-global-highTitle;
}

.gang {
  border: 1px solid rgba(3, 54, 102, 0.06);
  @apply mt-5;
}

.thead-hr {
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

thead td,
.number {
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}

tbody td {
  @apply text-center text-kd14px18px text-global-highTitle;
}

.table-box {
  @apply w-full  bg-global-white rounded-kd16px;
}

.table-my {
  @apply w-full bg-opacity-0  rounded-kd6px;
}

.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}
</style>
