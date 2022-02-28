<script lang="ts" setup>
import {PropType, ref} from 'vue';
import DappDiscoversContentType from './content/type.vue';
import DappDiscoversContentChain from './content/chain.vue';
import DappDiscoversContentField from './content/field.vue';

import {summaryItem} from "src/types/home";
import { tabCage, tabPlat, tabChain } from "src/logic/dapp/";

import { config } from "src/router/config";

const props = defineProps({
  data: {
    required: true,
    type: Object as PropType<summaryItem>,
  },
  keys:Number
});
</script>
<template>
  <div class="mt-5" v-if="data">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center flex-1">
        <!-- 项目类型 -->
        <div class="flex-1">
           <DappDiscoversContentType :key="keys" :list="tabCage(data.category, 'group', config.dappList)" name="group" :split="3" title="项目类型"/>
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
</template>
