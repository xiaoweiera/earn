<script setup lang="ts">


  import DappHomeHeader from './home/header.vue';
  import DappDiscoversContentType from './discovers/content/type.vue';
  import DappDiscoversContentChain from './discovers/content/chain.vue';
  import DappDiscoversContentField from './discovers/content/field.vue';
  import DappDiscoversEndlist from './discovers/endlist.vue';

  import {onMounted, reactive, ref} from "vue";
  import {Model, tabChain, tabPlat} from "~/logic/dapp";
  import {createRef, onLoadRef, onUpdateRef} from "~/utils/ssr/ref";
  import {AdNftItem, ProjectNftItem} from "~/types/dapp/nft";
  import * as alias from "~/utils/root/alias";
  import {Status, AdItem, ProjectItem} from "~/types/dapp/ixo";
  import { config } from "src/router/config";
  import {getParam} from "src/utils/router";
  import {useWatch} from "src/utils/use/state";
  import {uuid} from "src/utils";
  import {useRoute} from "vue-router";

  const props= defineProps({
    summary: {
      type: Object,
      default: () => {}
    }
  })

  const chain = ref(getParam<string>("bracket"));
  const category = ref(getParam<string>("category"));
  const platform = ref(getParam<string>("platform"));
  const type = ref(getParam<string>("type"));
  const search = ref(getParam<string>("search"));
  const params = reactive({
    chain: chain.value,
    category: category.value,
    platform: platform.value,
    status: 'ended',
    query: '',
    sort_field: '',
    sort_type: '',//desc asc
  })
  const urlType = true;

  const route = useRoute();
  const key = ref<string>(uuid());

  const model = new Model();
  //nft drops
  const getEndedList = async (flag:boolean) => {
    const res: any = await model.getEndedProjects(params);
    if (flag) {
      EndedList.value = []
    }
    EndedList.value = res;
  }
  // 创建列表对象并获取缓存数据
  const EndedList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.ended, []);
  // 创建更新列表钩子函数
  // const updateEndedList = onUpdateRef(EndedList, getEndedList);

  onMounted(function () {
    // 判断列表数据是否为空，如果为空则获取最新数据
    onLoadRef(EndedList, () => model.getEndedProjects(params));
  });
  useWatch(route, (n) => {
    const querys: any = getParam<string>()
    key.value = uuid();
    params.chain = querys.bracket;
    params.category = querys.category;
    params.platform = querys.platform;
    params.query = querys.search ? querys.search : '';
    getEndedList(true)
    // todo 可以在此处更新某些数据
  })
  //排序方法
  const changeSort=(sort:string)=>{
    params.sort_field = sort;
    getEndedList(true);
  }
</script>
<template>
  <div class="mt-5 p-4 bg-global-white rounded-md">
    <!-- header -->
    <div class="border-b-1 border-global-highTitle border-opacity-6 pb-4">
      <DappHomeHeader title="Ended IDO & IGO Projects" tips="Data supported by 14 public chain and 65 platforms" :status="Status.ended" :type="urlType"/>
    </div>
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center">
        <!-- 公链 -->
          <DappDiscoversContentType :key="key" v-if="summary.ixo" :list="tabChain(summary.ixo.chain, 'bracket', config.home)" active-name="bracket" name="bracket" title="公链"></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 类型 -->
        <DappDiscoversContentChain :key="key" v-if="summary.ixo" :href="config.home" :chainData="summary.ixo.chain" name="category" title="类型"></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentField :herf="config.home" title="项目名称"></DappDiscoversContentField>
      </div>
    </div>
    <!-- platform -->
    <div class="mt-4 border-b-1 border-global-highTitle border-opacity-6 pb-4">
       <DappDiscoversContentType :key="key" v-if="summary.ixo" :list="tabPlat(summary.ixo.platform, 'platform', config.home)" active-name="platform" name="platform" title="platform"></DappDiscoversContentType>
    </div>
    <div>
       <DappDiscoversEndlist :key="key" @changeSort="changeSort" :list="EndedList" :params="params"></DappDiscoversEndlist>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
