<script setup lang="ts">
/**
 * @file DApp 评论
 */
import { reactive } from "vue";
import { toInteger, toNumber, toFixed } from "src/utils";
import { createReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import { getInject } from "src/utils/use/state";
const dataProvide = getInject("detailState");
const i18n = I18n();

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
