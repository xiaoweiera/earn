<script setup lang="ts">
import { ElInput } from "element-plus";
import I18n from "src/utils/i18n";
import { onMounted, ref } from "vue";
import _ from "lodash";
import { getParam } from "src/utils/router";
import { createHref } from "src/plugins/router/pack";
import window from "src/plugins/browser/window";
import { useRouter } from "vue-router";
import { getValue } from "src/utils/root/data";
import { BlogData } from "src/types/blog";
import { Model } from "src/logic/dapp/invest";
import { alias } from "src/utils/ssr/ref";

import DAppInvestFundItem from "src/pages/dapp/investment/fund/item.vue";
import { uuid } from "src/utils";
import { scrollGoToDom } from "src/plugins/browser/scroll";

const i18n = I18n();
const search = ref<string>("");
const $router = useRouter();
const searchKey = ref<string>(uuid());
let initValue = true;

const getInitValue = function () {
  if (initValue) {
    initValue = false;
    return getValue<BlogData[]>(alias.invest.list.funds, []);
  }
};

// 获取 融资 列表
const requestList = function (data: object) {
  const model = new Model();
  const param = getParam<string>("search");
  const query = {
    ...data,
    keyword: param || "",
  };
  return model.getFundsList(query);
};
onMounted(() => {
  search.value = getParam<string>("search") || "";
});
const onSearch = _.debounce(async () => {
  const query = { ...getParam<object>(), search: search.value || "" };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
  searchKey.value = uuid();
}, 300);

const changeView = function () {
  scrollGoToDom(".j-funds-title", 40);
};
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
            <span>{{ i18n.invest.project.funds }} 🏦</span>
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
        <p class="mt-2 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">{{ i18n.invest.project.subTitle }} {{ i18n.invest.project.tipTitle }}</p>
      </div>
      <!-- 手机端头部 -->
      <div class="block md:hidden">
        <h3 class="text-kd40px40px text-global-highTitle font-kdSemiBold">
          <span>{{ i18n.invest.project.funds }} 🏦</span>
        </h3>
        <p class="mt-3 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">{{ i18n.invest.project.subTitle }} {{ i18n.invest.project.tipTitle }}</p>
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
      <div :key="searchKey">
        <ui-pagination :limit="8" skin="pagination" :init-value="getInitValue()" :request="requestList" @next="changeView" @prev="changeView">
          <template #default="scope">
            <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <DAppInvestFundItem v-for="item in scope.list" :key="item.id" :data="item" />
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
