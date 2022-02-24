<script lang="ts" setup>
import {ref} from 'vue';
import {getParam} from "src/utils/router";
import {config as routerConfig} from "src/router/config";
import DappDiscoversContentType from './content/type.vue';
import DappDiscoversContentChain from './content/chain.vue';
import DappDiscoversContentField from './content/field.vue';

import { tabChain, tabPlat, tabCage } from "src/logic/dapp/";

defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const search = ref<string>("");


</script>
<template>
  <div class="mt-5" v-if="data">
    <!-- 项目类型、公链、搜索框 -->
    <div class="flex justify-between items-center">
      <div class="flex items-center flex-1">
        <!-- 项目类型 -->
        <div class="flex-1">
          <DappDiscoversContentType v-if="data.category" :list="tabCage(data.category)" name="group" title="项目类型"/>
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
    <DappDiscoversContentType v-if="data.platform" :list="tabPlat(data.platform)" class="mt-4" name="platform" title="platform"/>
  </div>
</template>
