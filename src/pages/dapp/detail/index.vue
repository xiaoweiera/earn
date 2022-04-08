<script lang="ts" setup>
/**
 * @file DApp 详情页
 * @author svon.me@gmail.com
 */

import { onMounted } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { TabName } from "src/types/dapp/data";
import { getTabList } from "src/logic/dapp/detail";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import { useReactiveProvide } from "src/utils/use/state";
import { asyncLoad } from "src/plugins/lazyload/";

const Twitter = asyncLoad(() => import("./content/twitter.vue"));
const IDO = asyncLoad(() => import("./content/ido.vue"));
const Reviews = asyncLoad(() => import("./reviews/index.vue"));
const Dashboard = asyncLoad(() => import("./dashboard.vue"));

// 项目信息
const project = createReactive<DAppProject>("query", {} as DAppProject);
// 项目数据
const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);
useReactiveProvide("detailState", detail);

onMounted(function () {
  const id = project.id;
  if (id) {
    onLoadReactive(detail, alias.dApp.detail, id);
  }
});

const onChangeTab = function (data: object) {
  const key = safeGet<TabName>(data, "tab");
  if (key) {
    project.tab = key;
  }
};

const getTwitterName = function (data: DAppData) {
  const name = data?.community?.twitter?.name;
  if (name) {
    return name;
  }
};
</script>

<template>
  <div class="pt-8 pb-16">
    <div class="max-w-300 mx-auto">
      <h3>项目信息</h3>
      <pre>{{ JSON.stringify(project, null, 2) }}</pre>
      <div>
        <ui-tab :def="TabName.dashboard" :list="getTabList(project)" active-name="tab" @change="onChangeTab">
          <template #default="{ data }">
            <span class="text-18-24 font-m">{{ data.label }}</span>
          </template>
        </ui-tab>
      </div>
      <!--内容-->
      <div class="mt-6">
        <template v-if="project.tab === TabName.dashboard">
          <Dashboard />
        </template>
        <template v-else-if="project.tab === TabName.twitter">
          <Twitter :name="getTwitterName(detail)" class="bg-white" />
        </template>
        <template v-else-if="project.tab === TabName.reviews">
          <Reviews :id="project.id" />
        </template>
        <template v-else>
          <IDO :data="detail" />
        </template>
      </div>
    </div>
  </div>
</template>
