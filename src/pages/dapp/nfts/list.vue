<script setup lang="ts">
import DappNftsHeader from './header.vue';
import DappNftsFooter from './footer.vue';
import DappNftsAd from './ad.vue'

import {getParam} from "src/utils/router";
import safeGet from "@fengqiaogang/safe-get";
 import { config } from "src/router/config";
import { ProjectType } from "src/types/dapp/ixo";
import { getNextUrl } from 'src/logic/dapp';
defineProps({
  data: {
    type: Object,
  }
})
const detailUrl = function (data: object) {
  const category=getParam<string>('category', '') as string
  const id = safeGet<number>(data, 'id');
  if (id) {
    return `${config.dapp}/rank/${id}?category=${category}`;
  }
  return safeGet<string>(data, 'website');
};
</script>
<template>
  <div class="nft-item h-79 border border-global-highTitle border-opacity-6 box-content rounded-md overflow-hidden cursor-pointer">
    <div class="nft-row h-full" v-if="data.data_type === ProjectType.ad">
      <DappNftsAd :data="data"/>
    </div>
    <div class="nft-row w-full h-full relative" v-else>
      <v-router  target="_blank" :href="data.url">
        <!-- 背景图 -->
        <DappNftsHeader class="w-full h-full overflow-hidden" :data="data"/>
        <!-- footer -->
        <div class="nft-footer w-full absolute bottom-0 left-0">
          <DappNftsFooter :data="data"></DappNftsFooter>
        </div>
      </v-router>
    </div>
  </div>
</template>
<style lang="scss">
.nft-item {
  &:hover {
    .nft-row {
      box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
    }
  }
}
.nft-footer {
  background: linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.931356) 60.7%);
}
</style>
