<script setup lang="ts">
/**
 * @file DApp 评论
 */
import { reactive } from "vue";
import { alias, createReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import safeGet from "@fengqiaogang/safe-get";
import { useReactiveProvide } from "src/utils/use/state";
// 项目数据
const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);
useReactiveProvide("detailState", detail);

// 项目信息
const project = createReactive<DAppProject>("query", {} as DAppProject);
// 项目数据
const isDisShow = reactive({ value: false });
</script>

<template>
  <div class="flex w-full h-full">
    <Comment :projectId="safeGet(project, 'id')" :isShow="isDisShow" :discuss="true" />
  </div>
</template>
