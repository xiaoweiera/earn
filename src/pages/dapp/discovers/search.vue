<script lang="ts" setup>
import {PropType, ref} from 'vue';
import DappDiscoversContentType from './content/type.vue';
import DappDiscoversContentChain from './content/chain.vue';
import DappDiscoversContentField from './content/field.vue';

import {summaryItem} from "src/types/home";
import { tabCage, tabPlat } from "src/logic/dapp/";

defineProps({
  data: {
    required: true,
    type: Object as PropType<summaryItem>,
  }
});

const search = ref<string>("");
</script>
<template>
  <div class="mt-5" v-if="data">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center flex-1">
        <!-- 项目类型 -->
        <div class="flex-1">
           <DappDiscoversContentType :list="tabCage(data.category, 'group')" name="group" title="项目类型"/>
        </div>
        <div class="flex items-center">
          <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
          <!-- 公链 -->
          <DappDiscoversContentChain title="公链"/>
        </div>
      </div>
      <!-- 搜索框 -->
      <DappDiscoversContentField :query="search" title="项目名称"/>
    </div>
    <!-- platform -->
     <DappDiscoversContentType :list="tabPlat(data.platform, 'platform')" class="mt-4" name="platform" title="platform"/>
  </div>
</template>
