<script setup lang="ts">

  import I18n from "src/utils/i18n";
  import DappHomeHeader from './home/header.vue';
  import DappDiscoversContentType from './discovers/content/type.vue';
  import DappNftsList from './nfts/list.vue'
  import DappDiscoversContentChain from './discovers/content/chain.vue';
  import {onMounted, reactive, ref, watch} from "vue";
  import {Model, tabChain} from "src/logic/dapp";
  import {createRef, onLoadRef, onUpdateRef} from "src/utils/ssr/ref";
  import * as alias from "src/utils/root/alias";
  import {AdNftItem, ProjectNftItem} from "src/types/dapp/nft";
  import { nftStatus } from "src/types/dapp/nft";
  import {getParam} from "src/utils/router";
  import {useRoute} from "vue-router";
  import { config } from "src/router/config";
  import {uuid} from "src/utils";

  defineProps({
    summary: {
      type: Object,
      default: () => {}
    }
  })
  const i18n = I18n();
  const route = useRoute();
  const chain = ref(getParam<string>("group"));
  const keys = ref<string>(uuid());
  const params = reactive({
    page: 1,
    page_size: 15,
    chain: chain.value,
    category: '',
    status: 'upcoming',
    query: '',
    sort_field: '',
    sort_type: '',//desc asc
    paginate: false,
  })
  const urlType = false;

  // 创建列表对象并获取缓存数据
  const UpcomingNftList = createRef<Array<ProjectNftItem | AdNftItem>>(alias.nft.upcoming, [] as any);
  //nft drops
  const getUpcomingNftList =async function (flag:boolean) {
    const model = new Model();
    if(flag){
      UpcomingNftList.value = [];
    }
    UpcomingNftList.value =await model.getNftList(params) as any
  }

  // 创建更新列表钩子函数
  const updateUpcomingList = onUpdateRef(UpcomingNftList, getUpcomingNftList);

  onMounted(function () {
    // 判断列表数据是否为空，如果为空则获取最新数据
    onLoadRef(UpcomingNftList, getUpcomingNftList);
  });
  watch(route, () => {
    const querys: any = getParam<string>();
    keys.value = uuid();
    params.chain = querys.group;
    getUpcomingNftList(true);
    // todo 可以在此处更新某些数据
  })
</script>
<template>
  <div>
    <div>
      <!-- header -->
      <div>
        <DappHomeHeader title="NFT Drops 🎯" :tips="i18n.home.idoIgoProject.never" :status="nftStatus.upcoming" :type="urlType"/>
      </div>
      <!-- 搜索 -->
      <div class="mt-4 hidden md:block">
          <DappDiscoversContentType v-if="summary.nft" :list="tabChain(summary.nft.chain, 'group', config.home)" :split="6" active-name="group" :title="i18n.home.idoIgoProject.chain" name="group"/>
      </div>
      <div class="mt-4 block md:hidden">
        <DappDiscoversContentChain :key="keys" class="w-full" v-if="summary.nft" :chainData="summary.nft.chain" :href="config.home" name="group" :title="i18n.home.idoIgoProject.chain"/>
      </div>
      <!-- nft项目 -->
      <div class="mt-4 nft-item showX" v-if="UpcomingNftList.length > 0">
        <div class="coming-item">
          <div v-for="( item, index ) in UpcomingNftList" class="lg:ml-0" :class="{'ml-6' : index > 0}">
            <DappNftsList :key="index" :data="item"/>
          </div>
        </div>
      </div>
      <div v-else>
        <ui-empty class="pb-3"/>
        <p class="text-center text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">{{ i18n.address.noData }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .nft-item {
    .coming-item {
      @apply flex items-center flex-nowrap;
    }
  }
  @screen lg {
    .nft-item {
      @apply overflow-auto;
      .coming-item {
        @apply grid grid-cols-5 gap-6;
      }
    }
  }
</style>
