<script setup lang="ts">
import { ElInput } from "element-plus";
import I18n from "src/utils/i18n";
import { ref } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { config } from "src/router/config";
import _ from "lodash";
import { getParam } from "src/utils/router";
import { createHref } from "src/plugins/router/pack";
import window from "src/plugins/browser/window";
import { useRouter } from "vue-router";
import { Model } from "src/logic/dapp/invest";
import { alias } from "src/utils/ssr/ref";
import { getValue } from "src/utils/root/data";
import { BlogData } from "src/types/blog";

import DAppDiscoversContentChain from "src/pages/dapp/discovers/content/chain.vue";
import DAppInvestProjectsItem from "src/pages/dapp/investment/projects/item.vue";

const i18n = I18n();
const search = ref<string>("");
const $router = useRouter();
let initValue = true;

const getInitValue = function () {
  if (initValue) {
    initValue = false;
    return getValue<BlogData[]>(alias.invest.list.projects, []);
  }
};
const chain = ref(getParam<boolean>("chain"));

// 获取 nft 列表
const requestList = function (data: object) {
  const model = new Model();
  const query = {
    ...data,
    status: "ended",
  };
  return model.getProjectsList(query);
};

const onSearch = _.debounce(async () => {
  const query = { ...getParam<object>(), query: search.value || "" };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
}, 300);
</script>

<template>
  <div>
    <!-- 项目 -->
    <div>
      <!-- pc端头部-->
      <div class="hidden md:block">
        <div class="flex justify-between items-center">
          <!-- 标题  -->
          <h3 class="text-kd40px40px text-global-highTitle font-kdSemiBold">
            <span>PROJECTS 💼</span>
          </h3>
          <div class="flex justify-between">
            <!-- select -->
            <div>
              <DAppDiscoversContentChain :chain-data="safeGet()" :href="config.invest" title="投资轮次" name="category" />
            </div>
            <!-- search -->
            <div>
              <client-only class="w-50 ml-3 input-style">
                <ElInput v-model="search" :placeholder="i18n.common.placeholder.search" class="w-full" @change="onSearch">
                  <template #prefix>
                    <IconFont size="16" type="icon-sousuo" @click="onSearch" />
                  </template>
                </ElInput>
              </client-only>
            </div>
          </div>
        </div>
        <p class="mt-2 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">KingData is a crypto platform for tracking private and public fundraising. We include latest information on seed, private, strategic, and IDO/IEO rounds.</p>
      </div>
      <!-- 手机端头部 -->
      <div class="block md:hidden">
        <!-- 标题  -->
        <h3 class="text-kd32px32px text-global-highTitle font-kdSemiBold">
          <span>PROJECTS 💼</span>
        </h3>
        <p class="mt-3 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">KingData is a crypto platform for tracking private and public fundraising. We include latest information on seed, private, strategic, and IDO/IEO rounds.</p>
        <div class="mt-4 flex justify-between">
          <!-- select -->
          <div>
            <DAppDiscoversContentChain :chain-data="safeGet()" :href="config.invest" title="投资轮次" name="category" />
          </div>
          <!-- search -->
          <div>
            <client-only class="w-50 ml-3 input-style">
              <ElInput v-model="search" :placeholder="i18n.common.placeholder.search" class="w-full" @change="onSearch">
                <template #prefix>
                  <IconFont size="16" type="icon-sousuo" @click="onSearch" />
                </template>
              </ElInput>
            </client-only>
          </div>
        </div>
      </div>
      <!-- 列表  -->
      <div>
        <ui-pagination :limit="8" skin="pagination" :init-value="getInitValue()" :request="requestList">
          <template #default="scope">
            <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <DAppInvestProjectsItem v-for="(item, index) in scope.list" :key="index" />
            </div>
          </template>
        </ui-pagination>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply border-1 border-global-highTitle border-opacity-4 bg-global-white rounded-md;
  }

  ::v-deep(input::-webkit-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle text-opacity-45 font-medium;
  }

  ::v-deep(input::-ms-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle text-opacity-45 font-medium;
  }
}

@screen md {
  .input-style {
    ::v-deep(.el-input__inner) {
      @apply border-1 border-global-highTitle border-opacity-4 bg-global-white rounded-md;
    }

    ::v-deep(input::-webkit-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle text-opacity-45 font-medium;
    }

    ::v-deep(input::-ms-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle text-opacity-45 font-medium;
    }
  }
}
</style>
