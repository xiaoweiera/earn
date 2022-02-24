<script setup lang="ts">


  import DappHomeHeader from './home/header.vue';
  import DappDiscoversContentType from './discovers/content/type.vue';
  import DappDiscoversContentChain from './discovers/content/chain.vue';
  import DappDiscoversContentField from './discovers/content/field.vue';
  import DappDiscoversEndlist from './discovers/endlist.vue';

  import {onMounted, ref} from "vue";
  import {Model, tabChain, tabPlat} from "~/logic/dapp";
  import {createRef, onLoadRef, onUpdateRef} from "~/utils/ssr/ref";
  import {AdNftItem, ProjectNftItem} from "~/types/dapp/nft";
  import * as alias from "~/utils/root/alias";
  import {Status, AdItem, ProjectItem} from "~/types/dapp/ixo";

  const props= defineProps({
    summary: {
      type: Object,
      default: () => {}
    }
  })
  const urlType = true;
  // 公链类型
  const chain = ref<string>("all");
  //nft drops
  const getEndedList = function () {
    const model = new Model();
    return model.getEndedProjects(chain.value);
  }
  // 创建列表对象并获取缓存数据
  const EndedList = createRef<Array<ProjectItem | AdItem>>(alias.dApp.ixo.ended, []);
  // 创建更新列表钩子函数
  const updateEndedList = onUpdateRef(EndedList, getEndedList);

  onMounted(function () {
    // 判断列表数据是否为空，如果为空则获取最新数据
    onLoadRef(EndedList, getEndedList);
  });
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
        <!-- 项目类型 -->
         <DappDiscoversContentType v-if="summary.ixo" :list="tabChain(summary.ixo.chain)" name="chain" title="项目类型"></DappDiscoversContentType>
        <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4"></span>
        <!-- 公链 -->
        <DappDiscoversContentChain title="公链"></DappDiscoversContentChain>
      </div>
      <!-- 搜索框 -->
      <div>
        <DappDiscoversContentField title="项目名称"></DappDiscoversContentField>
      </div>
    </div>
    <!-- platform -->
    <div class="mt-4 border-b-1 border-global-highTitle border-opacity-6 pb-4">
      <DappDiscoversContentType v-if="summary.ixo" :list="tabPlat(summary.ixo.platform)" name="platform" title="platfrom"></DappDiscoversContentType>
    </div>
    <div>
       <DappDiscoversEndlist :list="EndedList"></DappDiscoversEndlist>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
