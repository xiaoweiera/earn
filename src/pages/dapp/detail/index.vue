<script setup lang="ts">
/**
 * @file DApp 详情页
 */
import { onMounted } from "vue";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import NFT from "src/pages/dapp/detail/airdrop.vue";
// 项目信息
const project = createReactive<DAppProject>("query", {} as DAppProject);
// 项目数据
const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);

onMounted(function () {
  const id = project.id;
  if (id) {
    onLoadReactive(detail, alias.dApp.detail, id);
  }
});
</script>

<template>
  <div class="pt-8 pb-16">
    <div class="max-w-300 mx-auto">
      <NFT :data="detail" />
      <!--      <h3>项目信息</h3>-->
      <!--      <pre>{{ JSON.stringify(project, null, 2) }}</pre>-->
      <!--      <template v-if="project.id">-->
      <!--        <h3>项目数据</h3>-->
      <!--        <pre>{{ JSON.stringify(detail, null, 2) }}</pre>-->
      <!--      </template>-->
    </div>
  </div>
</template>
