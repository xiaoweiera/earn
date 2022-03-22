<script setup lang="ts">
import { ElInput } from "element-plus";
import I18n from "src/utils/i18n";
import { ref } from "vue";
import _ from "lodash";
import { getParam } from "src/utils/router";
import { createHref } from "src/plugins/router/pack";
import window from "src/plugins/browser/window";
import { useRouter } from "vue-router";

import DAppInvestFundItem from "src/pages/dapp/investment/fund/item.vue";

const i18n = I18n();
const search = ref<string>("");
const $router = useRouter();
const onSearch = _.debounce(async () => {
  const query = { ...getParam<object>(), query: search.value || "" };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
}, 300);
</script>

<template>
  <div>
    <!-- 机构 -->
    <div>
      <!-- pc端头部-->
      <div class="hidden md:block">
        <div class="flex justify-between items-center">
          <!-- 标题  -->
          <h3 class="text-kd40px40px text-global-highTitle font-kdSemiBold">
            <span>FUNDS 🏦</span>
          </h3>
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
        <p class="mt-2 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">KingData is a crypto platform for tracking private and public fundraising. We include latest information on seed, private, strategic, and IDO/IEO rounds.</p>
      </div>
      <!-- 手机端头部 -->
      <div class="block md:hidden">
        <h3 class="text-kd40px40px text-global-highTitle font-kdSemiBold">
          <span>FUNDS 🏦</span>
        </h3>
        <p class="mt-3 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">KingData is a crypto platform for tracking private and public fundraising. We include latest information on seed, private, strategic, and IDO/IEO rounds.</p>
        <div class="mt-4 w-full">
          <client-only class="w-full input-style">
            <ElInput v-model="search" :placeholder="i18n.common.placeholder.search" class="w-full" @change="onSearch">
              <template #prefix>
                <IconFont size="16" type="icon-sousuo" @click="onSearch" />
              </template>
            </ElInput>
          </client-only>
        </div>
      </div>
      <!--  -->
      <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DAppInvestFundItem v-for="(item, index) in 8" :key="index" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply border-1 border-global-highTitle border-opacity-4 bg-global-topBg rounded-md;
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
      @apply border-1 border-global-highTitle border-opacity-4 bg-global-topBg rounded-md;
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
