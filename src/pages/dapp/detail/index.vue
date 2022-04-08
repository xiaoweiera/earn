<script lang="ts" setup>
import safeGet from "@fengqiaogang/safe-get";

/**
 * @file DApp 详情页
 */
import { onMounted } from "vue";
import { TabName } from "src/types/dapp/data";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { DAppProject, DAppData } from "src/types/dapp/data";
import { asyncLoad } from "src/plugins/lazyload/";

const Twitter = asyncLoad(() => import("./content/twitter.vue"));

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

const tabs = function () {
  const url = project.rank ? `/rank/${project.type}/${project.id}` : `/${project.type}/${project.id}`;
  return [
    {
      tab: TabName.dashboard,
      href: `${url}/${TabName.dashboard}`,
    },
    {
      tab: TabName.project,
      href: `${url}/${TabName.project}`,
    },
    {
      tab: TabName.twitter,
      href: `${url}/${TabName.twitter}`,
    },
    {
      tab: TabName.ido,
      href: `${url}/${TabName.ido}`,
    },
  ];
};

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
        <ui-tab :def="TabName.dashboard" :list="tabs" active-name="tab" @change="onChangeTab">
          <template #default="{ data }">
            <span class="text-18-24 font-m">{{ data.tab }}</span>
          </template>
        </ui-tab>
      </div>
      <!--内容-->
      <div>
        <template v-if="project.tab === TabName.twitter">
          <div class="mt-6">
            <Twitter v-if="getTwitterName()" :name="getTwitterName(detail)" class="bg-white" />
            <ui-empty v-else></ui-empty>
          </div>
        </template>
        <template v-else>
          <p>tab == {{ project.tab }}</p>
        </template>
      </div>
      <template v-if="project.id">
        <h3>项目数据</h3>
        <pre>{{ JSON.stringify(detail, null, 2) }}</pre>
      </template>
    </div>
  </div>
</template>
