<script lang="ts" setup>
import {PropType, ref} from 'vue';
import DappDiscoversContentType from './content/type.vue';
import DappDiscoversContentChain from './content/chain.vue';
import DappDiscoversContentField from './content/field.vue';

import {summaryItem} from "src/types/home";
import { tabCage, tabPlat, tabChain } from "src/logic/dapp/";

import { config } from "src/router/config";
import {uuid} from "src/utils";

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<summaryItem>,
  },
  keys:Number
});
const keyID = ref<string>(uuid());
</script>
<template>
  <div class="mt-5" v-if="data">
    <div class="hidden md:block">
      <!-- 项目类型、公链、搜索框 -->
      <div class="flex justify-between items-center">
        <div class="flex items-center flex-1">
          <!-- 项目类型 -->
          <div class="hidden md:block">
            <DappDiscoversContentType :key="keys" :list="tabCage(data.category, 'group', config.dappList)" name="group" :split="2" title="项目类型"/>
          </div>
          <div class="flex items-center">
            <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
            <!-- 公链 -->
            <DappDiscoversContentChain :key="keys" :chainData="data.chain" :href="config.dappList" name="chain" title="公链"/>
          </div>
        </div>
        <!-- 搜索框 -->
        <DappDiscoversContentField :herf="config.dappList" title="项目名称"/>
      </div>
      <!-- platform -->
      <DappDiscoversContentType :key="keys" :list="tabPlat(data.platform, 'platform', config.dappList)" class="mt-4" name="platform" :split="5" title="platform"/>
    </div>
    <div class="block md:hidden">
      <div>
        <div class="flex items-center">
          <DappDiscoversContentChain class="w-1/2" :key="keyID" :chainData="data.chain" :href="config.dappList" name="chain" title="公链"/>
          <IconFont v-if="data.chain && data.category" class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5  h-full" type="icon-gang"/>
          <DappDiscoversContentChain class="w-1/2" :key="keyID" :chainData="data.category" :href="config.dappList" name="group" title="类型"/>
        </div>
        <div class="flex items-center mt-4">
          <DappDiscoversContentChain class="w-1/2" :key="keyID" :chainData="data.platform" :href="config.dappList" name="platform" title="platform"/>
          <IconFont v-if="data.chain && data.category" class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5  h-full" type="icon-gang"/>
          <DappDiscoversContentField class="w-1/2 bg-global-white md:bg-global-topBg" :herf="config.dappList" title="项目名称"/>
        </div>
      </div>
    </div>
  </div>
</template>
