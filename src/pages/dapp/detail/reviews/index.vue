<script setup lang="ts">
/**
 * @file DApp 评论
 */
import { onMounted, reactive } from "vue";
import { toInteger, toNumber, toFixed } from "src/utils";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import I18n from "src/utils/i18n";
const i18n = I18n();
// 项目信息
const project = createReactive<DAppProject>("query", {} as DAppProject);
// 项目数据
const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);
const isDisShow = reactive({ value: false });
onMounted(function () {
  const id = project.id;
  if (id) {
    onLoadReactive(detail, alias.dApp.detail, id);
  }
});
</script>

<template>
  <div class="w-full h-full">
    <!--      <h3>项目信息</h3>-->
    <!--      <pre>{{ JSON.
      stringify(project, null, 2) }}</pre>-->
    <!--      <template v-if="project.id">-->
    <!--        <h3>项目数据</h3>-->
    <!--        <pre>{{ JSON.stringify(detail, null, 2) }}</pre>-->
    <!--      </template>-->
    <!-- 详情评分 -->
    <div class="md:mt-0 mt-5 md:ml-6">
      <div v-if="detail.id" class="md:w-min-75 w-full h-full rounded-xl bg-global-topBg p-x-4 pt-4">
        <p class="text-global-highTitle text-kd16px24px">{{ i18n.dapp.project.score }}</p>
        <div class="md:mt-8">
          <p class="py-2 text-global-highTitle text-opacity-65 text-14-18 text-center">{{ i18n.part(i18n.airdrop.content.score, toInteger(detail.clout), { count: toInteger(detail.clout) }) }}</p>
          <p class="mt-1 text-36 text-global-highTitle text-opacity-85 font-m text-center">{{ toFixed(detail.overall_score, 1) }}</p>
          <UiStar :id="detail.id" class="mt-3" :value="toNumber(detail.my_score)"></UiStar>
        </div>
      </div>
    </div>
    <Comment :projectId="detail.id" :isShow="isDisShow" :discuss="false" />
  </div>
</template>
