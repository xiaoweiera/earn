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
  <div class="h-79 border border-global-highTitle border-opacity-6 box-content rounded-md overflow-hidden cursor-pointer">
    <div class="h-full" v-if="data.data_type === ProjectType.ad">
      <DappNftsAd :data="data"/>
    </div>
    <div class="w-full h-full" @click="getNextUrl(data)" v-else>
      <!-- 背景图 -->
      <DappNftsHeader class="w-full h-50" :data="data"></DappNftsHeader>
      <!-- footer -->
      <div>
        <DappNftsFooter :data="data"></DappNftsFooter>
      </div>
    </div>
  </div>
</template>
