<script lang="ts" setup>
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import { ElInput } from "element-plus";
import I18n from "src/utils/i18n";

import type { summaryItem } from "src/types/home";
import { getClassWidth, tabCage, tabPlat } from "src/logic/dapp/";

import { config } from "src/router/config";
import { uuid } from "src/utils";
import { setInject, stateAlias } from "src/utils/use/state";
import _ from "lodash";
import { getParam } from "src/utils/router";
import { createHref } from "src/plugins/router/pack";
import window from "src/plugins/browser/window";
import { useRouter } from "vue-router";
import DappDiscoversContentChain from "./content/chain.vue";
import DappDiscoversContentType from "./content/type.vue";

defineProps({
  data: {
    required: true,
    type: Object as PropType<summaryItem>,
  },
  keys: {
    type: String,
    default: "",
  },
});
const $router = useRouter();
const i18n = I18n();
const keyID = ref<string>(uuid());
const onChangeParam = setInject(stateAlias.ui.tab);

const search = ref<string>();

const onSearch = _.debounce(async () => {
  const query = { ...getParam<object>(), search: search.value || "" };
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
    <div class="hidden md:block">
      <!-- 项目类型、公链、搜索框 -->
      <div class="flex justify-between items-center">
        <div class="flex items-center flex-1">
          <!-- 项目类型 -->
          <div class="hidden md:block">
            <DappDiscoversContentType
              :key="keys"
              :list="tabCage(data.category, 'group', config.dappList)"
              name="group"
              :split="4"
              :title="i18n.home.topList.category"
              :title-width="getClassWidth()"
            />
          </div>
          <div class="flex items-center">
            <span class="h-6 border-l-1 border-global-highTitle border-opacity-10 mx-4" />
            <!-- 公链 -->
            <DappDiscoversContentChain
              :key="keys"
              :chain-data="data.chain"
              :href="config.dappList"
              name="chain"
              :title="i18n.home.idoIgoProject.chain"
            />
          </div>
        </div>
        <!-- 搜索框 -->
        <client-only class="w-50 input-style">
          <ElInput v-model="search" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
            <template #prefix>
              <IconFont type="icon-sousuo" size="16" @click="onSearch" />
            </template>
          </ElInput>
        </client-only>
      </div>
      <!-- platform -->
      <DappDiscoversContentType
        :key="keys"
        :list="tabPlat(data.platform, 'platform', config.dappList)"
        class="mt-4"
        name="platform"
        :split="5"
        :title="i18n.home.topList.plat"
        :title-width="getClassWidth()"
      />
    </div>
    <div class="block md:hidden">
      <div>
        <div class="flex items-center">
          <DappDiscoversContentChain
            :key="keyID"
            class="w-1/2"
            :chain-data="data.chain"
            :href="config.dappList"
            name="chain"
            :title="i18n.home.idoIgoProject.chain"
          />
          <IconFont
            v-if="data.chain && data.category"
            size="24"
            class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5 h-full"
            type="icon-gang"
          />
          <DappDiscoversContentChain
            :key="keyID"
            class="w-1/2"
            :chain-data="data.category"
            :href="config.dappList"
            name="group"
            :title="i18n.home.topList.category"
          />
        </div>
        <div class="flex items-center mt-4">
          <DappDiscoversContentChain
            :key="keyID"
            class="w-1/2"
            :chain-data="data.platform"
            :href="config.dappList"
            name="platform"
            :title="i18n.home.topList.plat"
          />
          <IconFont
            v-if="data.chain && data.category"
            size="24"
            class="text-global-highTitle text-opacity-10 mx-2 relative top-0.5 h-full"
            type="icon-gang"
          />
          <!-- 搜索框 -->
          <client-only class="w-1/2 input-style">
            <ElInput v-model="search" class="w-full" :placeholder="i18n.common.placeholder.search" @change="onSearch">
              <template #prefix>
                <IconFont type="icon-sousuo" size="16" @click="onSearch" />
              </template>
            </ElInput>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply border-0 border-global-highTitle border-opacity-4 bg-global-white rounded-md;
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
      @apply border-0 border-global-highTitle border-opacity-4 bg-global-topBg rounded-md;
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
