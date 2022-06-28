<script setup lang="ts">
import Chain from "../chain.vue";
import Tag from "src/pages/freemint/tool/ui/tag.vue";
import Table from "./table.vue";
import { Nft } from "src/pages/freemint/lib/nft.js";
import { ref, onMounted, reactive } from "vue";
import { orderBy } from "lodash";
import { dataToTimestamp } from "src/lib/tool";
import API from "src/api";
import safeGet from "@fengqiaogang/safe-get";
// import { data } from "src/pages/freemint/lib/testData";
import { dateDiff } from "src/utils";

const loading = ref(true); //是否请求完毕
const NFT = ref();
const filter = [
  { name: "Free", value: "free" },
  { name: "All", value: "all" },
];
const pageInfo = reactive({
  page: 1,
  page_size: 50, //每页条数
});
const params = reactive({
  sort_field: "owner",
  sort_type: "desc", // desc asc
});
const key = ref(0); //刷新key
const initTime = ref([]);
const tag = ref("all");
const isMore = ref(false); //是否有加载更多
const originList = ref<any>([]); //得到的原始数据源（分组过后的）
const freeList = ref<any>([]); // Free的原始数据列表
const originData = ref<any>([]); //all操作
const freeData = ref<any>([]); // free操作数据
const list = ref<any>([]); //展示的数据
const dataTime = ["5M", "10M"];
const updateTime = ref("");
const getInit = async () => {
  const api = new API();
  const data: any = await api.freeMint.blockList();
  updateTime.value = safeGet(data, "updated");
  originList.value = NFT.value.group_by_collection(safeGet(data, "list"));
  freeList.value = originList.value.filter((item: any) => item.value === 0);
  //默认5分钟
  if (initTime.value[0]) {
    originList.value = originList.value.filter((item: any) => {
      return Number(dataToTimestamp(item.time).toFixed(0)) > initTime.value[0] / 1000;
    });
    freeList.value = freeList.value.filter((item: any) => {
      return Number(dataToTimestamp(item.time).toFixed(0)) > initTime.value[0] / 1000;
    });
  }

  originData.value = originList.value;
  freeData.value = freeList.value;
  loading.value = false;
};
//得到第一页或者下一页数据
const getMoreData = () => {
  let result;
  let data;
  if (tag.value === "all") {
    data = originData.value;
  } else {
    data = freeData.value;
  }
  if (pageInfo.page === 1) {
    result = data.slice(0, pageInfo.page_size);
  } else {
    const amount = pageInfo.page_size * (pageInfo.page - 1);
    result = data.slice(amount, amount + pageInfo.page_size);
  }
  const listResult = list.value.concat(result);
  isMore.value = listResult.length === data.length ? false : true;
  return listResult;
};
//改变tag
const changeTag = (value: string) => {
  tag.value = value;
  reset();
  key.value++;
};
//加载更多
const more = () => {
  pageInfo.page++;
  list.value = getMoreData();
};
onMounted(async () => {
  // @ts-ignore
  NFT.value = new Nft(window["AlchemyWeb3"]);
  await getInit();
  // 初始化的值 默认全部
  // list.value = getMoreData();
  sort();
});
//排序前重组数据
const sortData = (origin: any, free: any) => {
  const sortField = params.sort_field === "level" ? "sumNumber" : params.sort_field;
  //@ts-ignore
  originData.value = orderBy(origin.value, sortField, params.sort_type);
  //@ts-ignore
  freeData.value = orderBy(free.value, sortField, params.sort_type);
};
//排序
const sort = () => {
  sortData(originData, freeData);
  reset();
};
const reset = () => {
  pageInfo.page = 1;
  list.value = [];
  list.value = getMoreData();
};
// let testTime = 0;
const changeTime = (data: any) => {
  if (!initTime.value.length) initTime.value = data;
  // todo
  if (data[0]) {
    sortData(originList, freeList);
    originData.value = originData.value.filter((item: any) => {
      return Number(dataToTimestamp(item.time).toFixed(0)) > data[0] / 1000;
    });
    freeData.value = freeData.value.filter((item: any) => {
      return Number(dataToTimestamp(item.time).toFixed(0)) > data[0] / 1000;
    });
  } else {
    originData.value = originList.value;
    freeData.value = freeList.value;
  }
  reset();
};
</script>
<template>
  <div class="top-page relative">
    <div class="md:flex items-center justify-between">
      <div class="state justify-between">
        <div class="state">
          <div class="text-kd16px22px font-medium text-global-highTitle">Top Mint list</div>
          <div class="text-kd14px18px font-medium text-global-highTitle text-opacity-65 ml-2">
            {{ dateDiff(updateTime?.slice(0, updateTime?.length - 3)) }}
          </div>
        </div>
        <Chain class="mdhidden" />
      </div>

      <div class="state justify-between md:mt-0 mt-4">
        <Tag class="mr-6" :default="tag" :data="filter" @change="changeTag" />
        <ui-date-day class="md:mr-6" :shortcuts="dataTime" @change="changeTime" />
        <Chain class="xshidden" />
      </div>
    </div>
    <div v-if="!loading">
      <!--    表格-->
      <Table v-if="list.length" :data="list" :params="params" @sort="sort" />
      <div v-else>
        <ui-empty />
      </div>
    </div>

    <div v-if="isMore" class="more mt-5" @click="more">加载更多</div>
    <UiLoading v-if="loading" class="fixed left-0 right-0 top-0 bottom-0" />
  </div>
</template>
<style lang="scss">
.top-page {
  @apply md:max-w-240 md:mx-auto p-4 md:pt-6 md:px-0;
  .more {
    @apply text-kd14px18px text-global-primary font-medium cursor-pointer;
    @apply h-8 px-8 flex items-center;
    @apply bg-global-primary bg-opacity-6 max-w-max rounded-kd4px mx-auto;
  }
}
</style>
