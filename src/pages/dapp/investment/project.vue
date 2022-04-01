<script setup lang="ts">
import { ElInput, ElOption, ElSelect } from "element-plus";
import I18n from "src/utils/i18n";
import { onMounted, ref } from "vue";
import _ from "lodash";
import { getParam } from "src/utils/router";
import { createHref } from "src/plugins/router/pack";
import window from "src/plugins/browser/window";
import { useRouter } from "vue-router";
import { Model } from "src/logic/dapp/invest";
import { alias } from "src/utils/ssr/ref";
import { getValue } from "src/utils/root/data";
import { scrollGoToDom } from "src/plugins/browser/scroll";

import DAppInvestProjectsItem from "src/pages/dapp/investment/projects/item.vue";
import { uuid } from "src/utils";

const i18n = I18n();
const search = ref<string>("");
const round = ref<string>("");
const $router = useRouter();
let initValue = true;

const searchKey = ref<string>(uuid());

// 获取 项目 列表
const requestList = function (data: object) {
  const search = getParam<string>("query");
  const round = getParam<string>("round");
  const model = new Model();
  const query = {
    ...data,
    status: "potential",
    search: search || "",
    round: round || "All",
  };
  return model.getProjectsList(query);
};

const getInitValue = function () {
  if (initValue) {
    initValue = false;
    return getValue(alias.invest.list.projects, []);
  }
};
onMounted(() => {
  round.value = getParam<string>("round") || "All";
  search.value = getParam<string>("query") || "";
});
const onSearch = _.debounce(async () => {
  const query = { ...getParam<object>(), query: search.value || "" };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
  searchKey.value = uuid();
}, 300);

const onChange = _.debounce(async (value: string) => {
  const query = { ...getParam<object>(), round: value };
  const url = createHref(window.location.pathname, query);
  await $router.push(url);
  searchKey.value = uuid();
}, 300);
const list = [
  { value: "All", key: "All" },
  { value: "A轮", key: "A" },
  { value: "B轮", key: "B" },
  { value: "C轮", key: "C" },
  { value: "D轮", key: "D" },
];
const changeView = function () {
  scrollGoToDom(".j-project-title");
};
</script>

<template>
  <!-- pc端头部-->
  <div class="hidden md:block">
    <div class="flex justify-between items-center">
      <!-- 标题  -->
      <h3 class="text-kd40px40px text-global-highTitle font-kdSemiBold">
        <span>{{ i18n.invest.project.title }} 💼</span>
      </h3>
      <div class="flex justify-between">
        <!-- select -->
        <div>
          <div class="flex items-center">
            <div class="text-kd12px16px md:text-14-18 text-global-highTitle text-opacity-65">{{ i18n.invest.project.round }}</div>
            <div class="flex items-center flex-1 w-full w-25 h-8 ml-2 md:ml-4">
              <div class="w-full">
                <client-only class="flex items-center justify-between">
                  <el-select v-model="round" :popper-append-to-body="false" class="projectMining flex-1 select" size="small" @change="onChange">
                    <el-option v-for="item in list" :key="item.value" :label="item.value" :value="item.key" />
                  </el-select>
                </client-only>
              </div>
            </div>
          </div>
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
    <p class="mt-2 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">{{ i18n.invest.project.subTitle }} {{ i18n.invest.project.tipTitle }}</p>
  </div>
  <!-- 手机端头部 -->
  <div class="block md:hidden">
    <!-- 标题  -->
    <h3 class="text-kd32px32px text-global-highTitle font-kdSemiBold">
      <span>{{ i18n.invest.project.title }} 💼</span>
    </h3>
    <p class="mt-3 text-kd14px20px text-global-highTitle text-opacity-65 font-medium">{{ i18n.invest.project.subTitle }} {{ i18n.invest.project.tipTitle }}</p>
    <div class="mt-4 flex justify-between">
      <!-- select -->
      <div>
        <div class="flex items-center">
          <div class="text-kd12px16px md:text-14-18 text-global-highTitle text-opacity-65">{{ i18n.invest.project.round }}</div>
          <div class="flex items-center flex-1 w-full md:w-25 h-8 ml-2 md:ml-4">
            <div class="w-full">
              <client-only class="flex items-center justify-between">
                <el-select v-model="round" :popper-append-to-body="false" class="projectMining flex-1 select" size="small" @change="onChange">
                  <el-option v-for="item in list" :key="item.value" :label="item.value" :value="item.key" />
                </el-select>
              </client-only>
            </div>
          </div>
        </div>
      </div>
      <!-- search -->
      <div>
        <client-only class="w-42.5 ml-3 input-style">
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
  <div :key="searchKey">
    <ui-pagination :limit="8" skin="pagination" :init-value="getInitValue()" :request="requestList" @next="changeView" @prev="changeView">
      <template #default="scope">
        <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DAppInvestProjectsItem v-for="(item, index) in scope.list" :key="index" />
        </div>
      </template>
    </ui-pagination>
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
.select {
  ::v-deep(.el-input__inner) {
    @apply border-1 border-global-highTitle border-opacity-4 bg-global-topBg h-8 rounded-md;
    @apply text-kd14px18px w-full md:w-25 text-left text-global-highTitle text-opacity-85 flex items-center text-kd14px18px;
  }
  @screen md {
    ::v-deep(.el-input__inner) {
      @apply border-1 border-global-highTitle border-opacity-4 text-kd14px18px w-25 h-8 pl-3 bg-global-topBg text-left text-global-highTitle text-opacity-85 flex items-center text-kd14px18px;
    }
  }
}
</style>
