<script setup lang="ts">
import DappDiscoversHeader from './discovers/header.vue';
import DappNftsSearch from './nfts/search.vue';
import DappNftsEndlist from './nfts/endlist.vue';
import DappNftsList from './nfts/list.vue';

import {onMounted, reactive, ref, watch} from "vue"
import DBList from "@fengqiaogang/dblist";
import * as R from "ramda";
import safeGet from "@fengqiaogang/safe-get";
 import * as logic from "src/types/dapp/";
import {toLower, uuid} from "src/utils";
import { includes } from 'ramda';
import { useRoute } from 'vue-router'
import {Model, sortVal, sortTime, getTodayTime} from "src/logic/dapp";
import {createReactive, createRef, onLoadReactive, onLoadRef} from "src/utils/ssr/ref";
import {summaryModel} from "src/types/home";
import {Model as Homemodel} from "src/logic/home";
import * as alias from "src/utils/root/alias";
import {useWatch} from "~/utils/use/state";
import {getParam} from "~/utils/router";
import {ProjectItem} from "src/types/dapp/";
import { getDateMDY } from "src/utils";


//路由
const $router = useRoute();
const api = new Model();

const chain = ref(getParam<string>("chain"));
const category = ref(getParam<string>("group"));
const type = ref(getParam<string>("type"));
const search = ref(getParam<string>("search"));


// 获取nft列表
const listItem = createRef("API.dapp.nftList", {} as any);
const list = ref([]);

const listVal = ref([]);
listVal.value = sortTime(listItem.value);
const newList = ref<logic.DataMap[]>([]);
const newCount = ref<number>(0);
const db = new DBList([], 'id', 'pid');
const cacheDb = new DBList([], 'id', 'pid');
const dapp = function (data:any) {
  db.insert(data)
  // 从对象中获取所有的键
  // @ts-ignore
  const keys: string[] = [...db.data.keys()];
  // 过滤正确的分组数据
  const ids: string[] = [];
  R.forEach(function (value: string) {
    if (/^[\d]+$/.test(value)) {
      ids.push(value);
    }
  }, keys);
  //
  const array: logic.DataMap[] = [];
  R.forEach(function (pid: string) {
    const value: logic.ProjectItem[] = db.select({ pid });
    array.push({
      date: pid,
      list: value
    });
  }, sortVal(ids, void 0, true));
  // 更新数据
  return array;
}
list.value = dapp(listVal.value);
const params = reactive({
  page: 1,
  page_size: 50,
  chain: chain.value,
  category: category.value,
  status: type.value ? type.value : 'upcoming',
  query: search.value ? search.value : '',
  sort_field: '',
  sort_type: '',//desc asc
  paginate: true,
})
const resultNumber = ref(params.page_size);
const loading = ref(false);


const getData = async (clear?: boolean) => {
  loading.value = true
  const res: any = await api.getNftList(params);
  if (clear) {
    params.page = 1
    list.value = [];
  }
  resultNumber.value = res?.length;
  if(params.status != 'history'){
    list.value = dapp(list.value.concat(res))
  }else {
    list.value = list.value.concat(res)
  }
  loading.value = false
}
//获取类型
const summary = createReactive<summaryModel>(alias.dApp.summary.list, {} as summaryModel);
const key = ref<string>(uuid());

onMounted(function () {
  // 得到数据汇总
  onLoadReactive(summary, () => api.getSummary());
  onLoadRef(listItem, () => api.getNftList(params));
});

useWatch($router, (n) => {
  const querys: any = getParam<string>()
  key.value = uuid();
  params.chain = querys.chain;
  params.category = querys.group;
  params.status = querys.type ? querys.type : 'upcoming';
  params.query = querys.search ? querys.search : '';
  getData(true)
  // todo 可以在此处更新某些数据
})

// 加载更多
const getMore = () => {
  params.page++
  getData()
}
//排序方法
const changeSort=(sort:string)=>{
  params.sort_field = sort;
  getData(true);
}
</script>
<template>
  <div class="pb-15 bg-global-topBg px-3 md:px-22.5">
    <div class="max-w-315 mx-auto pt-8">
      <!-- 项目名称 -->
      <div>
        <DappDiscoversHeader title="The world’s best NFT store" tips="All in One-Stop: Web3.0, DeFi, Gaming, NFTs,  Airdorps."></DappDiscoversHeader>
      </div>
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="is-tab bg-global-topBg mt-8">
        <div>
          <ui-tab :key="key" :list="logic.nftTabs" active-name="type"></ui-tab>
        </div>
      </ui-sticky>
      <!-- 搜索条件 -->
      <div>
        <DappNftsSearch :data="summary.nft"></DappNftsSearch>
      </div>
      <!-- 列表数据 -->
      <div class="w-full py-8 overflow-x-scroll showX">
        <div class="w-315" v-if="$router.query.type === logic.NftTabTypes.history">
          <DappNftsEndlist @changeSort="changeSort" :params="params" :list="list"></DappNftsEndlist>
        </div>
        <div v-else>
          <div v-for="(item, index) in list" :key="index">
            <span class="text-kd18px24px text-global-bgBlack font-kdFang">{{ getTodayTime(item.date)}}</span>
            <div class="w-315 grid grid-cols-5 gap-6 my-4">
              <DappNftsList v-for="( item, index ) in item.list" :key="index" :data="item"></DappNftsList>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list?.length>0 && resultNumber>=params.page_size" @click="getMore" class="more">加载更多</div>
    <UiLoading v-if="loading" class="fixed top-0 bottom-0 left-0 right-0"/>
  </div>
</template>
<style lang="scss" scoped>
.is-tab {
  box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
}
.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}
</style>
