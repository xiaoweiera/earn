<script setup lang="ts">
import _ from "lodash";
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import { ElInput } from "element-plus";
import type { summaryItem } from "src/types/dapp/detail";
import { useRouter } from "vue-router";
import { getParam } from "src/utils/router";
import window from "src/plugins/browser/window";
import { createHref } from "src/plugins/router/pack";

import { tabCage } from "src/logic/dapp/";
import { config } from "src/router/config";

// 引入 use state
import { setInject, stateAlias } from "src/utils/use/state";

import I18n from "src/utils/i18n";
import ClientOnly from "src/components/client/only.vue";
import { uuid } from "src/utils";
import DAppDiscoversContentChain from "../discovers/content/chain.vue";
import DAppDiscoversContentType from "../discovers/content/type.vue";

const keys = ref<string>(uuid());

defineProps({
  data: {
    required: true,
    type: Object as PropType<summaryItem>,
  },
});

const $router = useRouter();
const i18n = I18n();

const onChangeParam = setInject(stateAlias.ui.tab);

const search = ref<string>();

const onSearch = _.debounce(async () => {
  const query = { ...getParam<object>(), query: search.value || "" };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
  if (onChangeParam) {
    onChangeParam(query);
  }
}, 300);

onMounted(() => {
  search.value = getParam<string>("query") || "";
});
</script>
<template>
  <div v-if="data" class="mt-5">
    <div class="hidden lg:block">
      <!-- 项目类型、公链、搜索框 -->
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <!-- 项目类型 -->
          <DAppDiscoversContentType v-if="data.available_categories" :key="key" :list="tabCage(data.available_categories, 'category', config.nft)" :split="3" :title="i18n.home.topList.category" name="category" />
          <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4" />
          <!-- 公链 -->
          <DAppDiscoversContentChain :title="i18n.home.idoIgoProject.chain" :chain-data="data.available_chains" :href="config.nft" name="chain" />
        </div>
        <!-- 搜索框 -->
        <client-only class="w-50 input-style">
          <ElInput v-model="search" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo-da" class="text-global-highTitle" size="16" @click="onSearch" />
            </template>
          </ElInput>
        </client-only>
      </div>
    </div>
    <div class="block lg:hidden">
      <div class="flex items-center">
        <DAppDiscoversContentChain :key="keys" :title="i18n.home.idoIgoProject.chain" :chain-data="data.available_chains" :href="config.nft" name="chain" />
        <IconFont v-if="data.chain" size="24" class="text-global-highTitle text-opacity-10 mx-2 relative h-full" type="icon-gang" />
        <client-only class="w-1/2 input-style">
          <ElInput v-model="search" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo-da" class="text-global-highTitle" size="16" @click="onSearch" />
            </template>
          </ElInput>
        </client-only>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    padding-left: 31px !important;
    @apply border-1 border-global-highTitle border-opacity-4 bg-global-white rounded-md;
  }
  ::v-deep(input::-webkit-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle font-medium;
  }
  ::v-deep(input::-ms-input-placeholder) {
    @apply text-kd12px16px text-global-highTitle font-medium;
  }
}

@screen md {
  .input-style {
    ::v-deep(.el-input__inner) {
      padding-left: 31px !important;
      @apply border-1 border-global-highTitle border-opacity-4 bg-global-topBg rounded-md;
    }
    ::v-deep(input::-webkit-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle font-medium;
    }
    ::v-deep(input::-ms-input-placeholder) {
      @apply text-kd14px18px text-global-highTitle font-medium;
    }
  }
}
</style>
