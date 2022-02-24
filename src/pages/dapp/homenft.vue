<script setup lang="ts">

  import DappHomeHeader from './home/header.vue';
  import DappDiscoversContentType from './discovers/content/type.vue';
  import DappNftsList from './nfts/list.vue'
  import {onMounted, ref} from "vue";
  import {Model, tabChain} from "~/logic/dapp";
  import {createRef, onLoadRef, onUpdateRef} from "~/utils/ssr/ref";
  import {AdItem, ProjectItem} from "~/types/dapp/ixo";
  import * as alias from "~/utils/root/alias";
  import {AdNftItem, ProjectNftItem} from "~/types/dapp/nft";
  import { nftStatus } from "src/types/dapp/nft";

  defineProps({
    summary: {
      type: Object,
      default: () => {}
    }
  })

  const urlType = false;
  // 公链类型
  const chain = ref<string>("all");
  //nft drops
  const getUpcomingNftList = function () {
    const model = new Model();
    return model.getNftList(chain.value);
  }
  // 创建列表对象并获取缓存数据
  const UpcomingNftList = createRef<Array<ProjectNftItem | AdNftItem>>(alias.dApp.ixo.upcoming, []);
  // 创建更新列表钩子函数
  const updateUpcomingList = onUpdateRef(UpcomingNftList, getUpcomingNftList);

  onMounted(function () {
    // 判断列表数据是否为空，如果为空则获取最新数据
    onLoadRef(UpcomingNftList, getUpcomingNftList);
  });
</script>
<template>
  <div>
    <div class="overflow-x-scroll showX">
      <!-- header -->
      <div>
        <DappHomeHeader title="NFT Drops 🎯" tips="Never miss an interesting NFT drop on NFTGo!" :status="nftStatus.upcoming" :type="urlType"></DappHomeHeader>
      </div>
      <!-- 搜索 -->
      <div class="mt-4">
         <DappDiscoversContentType v-if="summary.nft" :list="tabChain(summary.nft.chain)" title="公链" name="chain"></DappDiscoversContentType>
      </div>
      <!-- nft项目 -->
      <div class="mt-4">
        <div class="w-315 grid grid-cols-5 gap-6">
          <DappNftsList v-for="( item, index ) in UpcomingNftList" :key="index" :data="item"></DappNftsList>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>