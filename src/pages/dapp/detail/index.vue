<script setup lang="ts">
/**
 * @file DApp 详情页
 */
import { onMounted, reactive } from "vue";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import Reviews from "src/pages/dapp/detail/reviews/index.vue";
import { useRefProvide } from "src/utils/use/state";
// 项目信息
const project = createReactive<DAppProject>("query", {} as DAppProject);
// 项目数据
const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);
useRefProvide("detailState", detail);
const isDisShow = reactive({ value: false });
onMounted(function () {
  const id = project.id;
  if (id) {
    onLoadReactive(detail, alias.dApp.detail, id);
    useRefProvide("detailState", detail);
  }
});
</script>

<template>
  <div>
    <Reviews />
  </div>
</template>
