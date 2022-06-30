<script setup lang="ts">
import Tag from "../../tool/ui/tag.vue";
import Card from "./card.vue";
import Chain from "../chain.vue";
import { Nft } from "src/pages/freemint/lib/nft.js";
import { onMounted, ref, reactive } from "vue";
// import { data } from "src/pages/freemint/lib/testData";
import API from "src/api/";
import safeGet from "@fengqiaogang/safe-get";
import { dateDiff } from "src/utils";

const tagList = [
  { name: "Free", value: "free" },
  { name: "All", value: "all" },
];
//本地分页
const pageInfo = reactive({
  page: 1,
  page_size: 10, //每页条数
});
const param = reactive({
  page: 1,
  page_size: 500,
});
const NFT = ref();
const loading = ref(true);
const key = ref(0); //刷新key
const tag = ref("all");
const isMore = ref(false); //是否有加载更多
const originList = ref<any>([]); //得到的原始数据源（分组过后的）
const freeList = ref<any>([]); // Free的数据列表
const list = ref<any>([]); //展示的数据
const updateTime = ref("");
const getInit = async () => {
  const api = new API();
  const data: any = await api.freeMint.blockList(param);
  updateTime.value = safeGet(data, "updated");
  originList.value = safeGet(data, "list");
  loading.value = false;
  getFreeList();
};
//得到Free的数据
const getFreeList = () => {
  const newList: any = [];
  originList.value.forEach((block: any) => {
    const newBlock = block.filter((item: any) => item.value === 0);
    // const newBlock = block.filter((item: any) => item.sumNumber > 1); //可以拿着这个去测试，出现次数大于1的
    if (newBlock.length > 0) {
      newList.push(newBlock);
    }
  });
  freeList.value = newList;
};
//改变tag
const changeTag = (value: string) => {
  tag.value = value;
  pageInfo.page = 1;
  list.value = [];
  list.value = getMoreData();
  key.value++;
};
//得到第一页或者下一页数据
const getMoreData = () => {
  let result;
  let data;
  if (tag.value === "all") {
    data = originList.value;
  } else {
    data = freeList.value;
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
  list.value = getMoreData();
});
</script>
<template>
  <div class="feed-page">
    <div class="state justify-between">
      <div class="state">
        <div class="text-kd16px22px font-medium text-global-highTitle">Live Feeds</div>
        <div class="text-kd14px18px font-medium text-global-highTitle text-opacity-65 ml-2">
          {{ dateDiff(updateTime?.slice(0, updateTime?.length - 3)) }}
        </div>
      </div>
      <div>
        <Chain />
      </div>
    </div>
    <!--    <div class="state justify-between h-14 border-css px-3 mt-4">-->
    <!--      <div class="state">-->
    <!--        <ui-image class="mr-1.5 w-6 h-6" oss src="/mint/jiqiren.png"/>-->
    <!--        <div class="text-kd14px18px font-medium text-global-black-title">Free Mint 播报机器人</div>-->
    <!--      </div>-->
    <!--      <div class="get">领取</div>-->
    <!--    </div>-->
    <div class="state justify-end mt-4 h-9.25">
      <!--      <div class="state">-->
      <!--        <div class="yuan-green"></div>-->
      <!--        <div class="green">Block：14937360</div>-->
      <!--      </div>-->
      <div class="state">
        <!--        <span class="text-kd12px16px text-global-black-title font-medium mr-1">地址过滤</span>-->
        <!--        <div class="relative mr-6">-->
        <!--          <ui-image class="w-6 h-6" oss src="/mint/filter.png"/>-->
        <!--          <div class="dian">{{ list.length }}</div>-->
        <!--        </div>-->
        <Tag :default="tag" :data="tagList" @change="changeTag" />
      </div>
    </div>

    <!--  list-->
    <div :key="key">
      <template v-for="(blockItem, i) in list" :key="i">
        <Card :class="i === 0 ? 'mt-0' : 'mt-3'" :data="blockItem" />
      </template>
    </div>
    <div v-if="isMore" class="more mt-5" @click="more">加载更多</div>
    <UiLoading v-if="loading" class="fixed left-0 right-0 top-0 bottom-0" />
  </div>
</template>
<style lang="scss">
.feed-page {
  @apply md:max-w-240 md:mx-auto p-4 md:pt-6 md:px-0;
  .border-css {
    @apply border-1 border-global-highTitle border-opacity-10 rounded-kd6px;
  }

  .more {
    @apply text-kd14px18px text-global-primary font-medium cursor-pointer;
    @apply h-8 px-8 flex items-center;
    @apply bg-global-primary bg-opacity-6 max-w-max rounded-kd4px mx-auto;
  }

  .state {
    @apply flex items-center;
  }

  .get {
    @apply px-3 h-8;
    @apply flex items-center rounded-kd4px max-w-max cursor-pointer;
    @apply text-global-white text-kd14px18px font-medium bg-global-primary;
  }

  .green {
    color: #008f28;
    @apply text-kd14px18px font-medium;
  }

  .yuan-green {
    background: rgba(9, 217, 142, 0.12);
    @apply w-5.5 h-5.5 mr-1.5 rounded-full relative flex justify-center items-center;
  }

  .yuan-green:before {
    content: "";
    position: absolute;
    background: rgba(9, 217, 142, 1);
    @apply w-3 h-3 rounded-full;
  }

  .yuan-green:after {
    content: "";
    position: absolute;
    border-left: 1px solid rgba(3, 54, 102, 0.1);
    @apply top-6 h-3.4;
  }

  .dian {
    @apply text-kd12px16px font-medium text-global-white bg-global-numRed;
    @apply w-5 h-5.25 flex items-center justify-center rounded-full;
    @apply absolute -top-2.5 -right-2.5;
  }
}
</style>
