<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
import * as track from "src/logic/track";
import * as alias from "src/utils/root/alias";
import { onMounted, reactive, ref } from "vue";
import * as logic from "src/logic/dapp/";
import { TabTypes } from "src/types/dapp";
import { uuid } from "src/utils";
import { Model } from "src/logic/dapp";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import type { summaryModel } from "src/types/home";
// 引入 use state
import { stateAlias, useReactiveProvide, useWatch } from "src/utils/use/state";
import { getParam } from "src/utils/router";
import { useRoute } from "vue-router";
import DAppDiscoversList from "./discovers/list.vue";
import DAppDiscoversEndlist from "./discovers/endlist.vue";
import DAppDiscoversSearch from "./discovers/search.vue";
import DAppDiscoversHeader from "./discovers/header.vue";
import HomeAd from "src/pages/home/ad.vue";

const i18n = I18n();
const api = new Model();
const route = useRoute();
// 定义一个 provide 数据，给子组件（ui-tab）使用
const [query] = useReactiveProvide<Query>(stateAlias.ui.tab, {} as Query);
const igo = ref(getParam<boolean>("igo"));
const chain = ref(getParam<string>("chain"));
const category = ref(getParam<string>("group"));
const platform = ref(getParam<string>("platform"));
const type = ref(getParam<string>("type"));
const search = ref(getParam<string>("search"));

const list: any = createRef("API.dapp.list", {} as any);

const params = reactive({
  page: 1,
  page_size: 16,
  is_igo: igo.value ? igo : false,
  chain: chain.value || "All",
  category: category.value || "All",
  platform: platform.value || "All",
  status: type.value ? type.value : "upcoming",
  query: search.value ? search.value : "",
  sort_field: "",
  sort_type: "", // desc asc
  paginate: true,
});
const resultNumber = ref(params.page_size);
const loading = ref(false);

const getData = async (clear?: boolean) => {
  loading.value = true;
  if (clear) {
    params.page = 1;
    list.value = [];
  }
  const res: any = await api.getList(params);
  resultNumber.value = res?.length;
  list.value = list.value.concat(res);
  loading.value = false;
};

useWatch(route, () => {
  const querys: any = getParam<string>();
  key.value = uuid();
  params.chain = querys.chain || "All";
  params.category = querys.group || "All";
  params.platform = querys.platform || "All";
  params.status = querys.type ? querys.type : "upcoming";
  params.query = querys.search ? querys.search : "";
  getData(true);
  // todo 可以在此处更新某些数据
});

// 加载更多
const getMore = () => {
  params.page++;
  getData();
};

interface Query {
  group: string;
  platform: string;
  type: string;

  [key: string]: string;
}

const key = ref<string>(uuid());

// 获取类型
const summary = createRef<summaryModel>(alias.dApp.summary.list, {} as summaryModel);
onMounted(() => {
  // 上报数据
  if (getParam<boolean>("igo")) {
    track.push(track.Origin.gio, track.event.dApp.igo);
  } else {
    track.push(track.Origin.gio, track.event.dApp.ido);
  }

  // 得到数据汇总
  onLoadRef(list, () => api.getList(params));

  // 得到数据汇总
  onLoadRef(summary, () => {
    return api.home.getSummary();
  });
});

// 排序方法
const changeSort = (val: string) => {
  if (!params.sort_type || params.sort_field !== val) {
    params.sort_type = "desc";
  } else if (params.sort_type === "desc") {
    params.sort_type = "asc";
  } else {
    params.sort_type = "";
  }
  params.sort_field = val;
  getData(true);
};
const getName = function () {
  const igo = getParam<boolean>("igo");
  if (igo) {
    return i18n.home.IdoIgo.igotitle;
  } else {
    return i18n.home.IdoIgo.title;
  }
};
// 获取筛选条件
const getFilter = function (data: any) {
  const igo = getParam<boolean>("igo");
  const status = getParam<string>("type");
  if (igo) {
    if (status === TabTypes.ended) {
      return data.igo_ended;
    } else if (status === TabTypes.ongoing) {
      return data.igo_ongoing;
    } else {
      return data.igo_upcoming;
    }
  } else {
    if (status === TabTypes.ended) {
      return data.ido_ended;
    } else if (status === TabTypes.ongoing) {
      return data.ido_ongoing;
    } else {
      return data.ido_upcoming;
    }
  }
};

const itemTransform = function (list: object[]): object[] {
  if (list && igo.value) {
    return list.map(function (item): any {
      const url = safeGet<string>(item, "url");
      if (url) {
        return {
          ...item,
          url: {
            path: url,
            query: {
              igo: true,
            },
          },
        };
      }
      return item;
    });
  }
  return list;
};
</script>
<template>
  <div class="discover-warp px-3 md:px-22.5">
    <div class="content pt-8">
      <!-- 头部 -->
      <div class="header mb-6">
        <DAppDiscoversHeader :title="getName()" :tips="i18n.home.IdoIgo.desc" />
      </div>
      <!-- 广告 -->
      <div class="w-full">
        <HomeAd class="mb-6" :position="24" />
      </div>
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="is-tab bg-global-topBg">
        <ui-tab :key="key" :list="logic.tabs" active-name="type" />
      </ui-sticky>
      <!-- 搜索条件 -->

      <div v-if="summary">
        <DAppDiscoversSearch :data="getFilter(summary)" :keys="key" />
      </div>
      <!-- 列表内容 -->
      <div v-if="list.length > 0" class="py-8">
        <div v-if="query.type === TabTypes.ended" class="overflow-x-scroll showX">
          <div class="w-315">
            <DAppDiscoversEndlist :params="params" class="px-4" :list="itemTransform(list)" @change-sort="changeSort" />
          </div>
        </div>
        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DAppDiscoversList v-for="(item, index) in itemTransform(list)" :key="index" :status="params.status" :data="item" />
        </div>
      </div>
      <div v-else-if="!loading">
        <ui-empty class="pb-3" />
      </div>
    </div>
    <div v-if="list?.length > 0 && resultNumber >= params.page_size && resultNumber <= list?.length" class="more" @click="getMore">
      {{ i18n.home.loadingMore }}
    </div>
    <UiLoading v-if="loading" class="fixed top-0 bottom-0 left-0 right-0" />
  </div>
</template>

<style lang="scss" scoped>
.discover-warp {
  @apply pb-15 bg-global-topBg;

  .content {
    @apply max-w-320 mx-auto;
  }

  .is-tab {
    box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
  }

  .more {
    @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
    @apply text-kd14px18px font-medium font-kdFang text-global-primary;
    @apply bg-global-primary bg-opacity-6;
  }
}
</style>
