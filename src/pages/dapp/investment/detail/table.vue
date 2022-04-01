<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import Filter from "./filter.vue";
import { dataToTimestamp } from "src/lib/tool";
import { toNumberCashFormat } from "src/utils/convert/to";
import { getDateMDY } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
import { getParam } from "src/utils/router";
import _ from "lodash";

const id = getParam<string>("id");
const query = ref(getParam<string>("query"));
const i18n = I18n();
const params = reactive({
  id,
  page: 1,
  page_size: 100,
  query: query,
  sort_field: "",
  sort_type: "", // desc asc
});
const data = ref([]);
const resultNumber = ref(0);
const loading = ref(false);
// 防抖
const getData = _.debounce(async (clear?: boolean) => {
  await debounceData(clear);
}, 300);
// 得到表格数据
const debounceData = async (clear?: boolean) => {
  loading.value = true;
  if (clear) {
    params.page = 1;
    data.value = [];
  }
  const res: any = [1, 2, 3];
  resultNumber.value = res.length;
  data.value = data.value.concat(res);
  loading.value = false;
};

const more = () => {
  params.page++;
  getData();
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="info">
    <!--    筛选-->
    <Filter />
    <!--    列表-->
    <div v-if="data.length || loading" class="showX">
      <table class="table-my my-4">
        <thead>
          <tr class="border-tb">
            <td>
              <div class="sort pl-3 text-number">#</div>
            </td>
            <td>
              <uiSort class="sort" :sort-data="params" key-name="name" name="Project Name" @change="sort" />
            </td>
            <td>
              <uiSort class="sort justify-center" :sort-data="params" key-name="type" name="Type" @change="sort" />
            </td>
            <td>
              <uiSort class="sort justify-center" :sort-data="params" key-name="round" name="Round" @change="sort" />
            </td>
            <td>
              <uiSort class="sort justify-end" :sort-data="params" key-name="money" name="投资金额" @change="sort" />
            </td>
            <td>
              <uiSort class="sort justify-end" :sort-data="params" key-name="date" name="日期" @change="sort" />
            </td>
            <td>
              <uiSort class="sort justify-end pr-3" :sort-data="params" key-name="state" name="项目状态" @change="sort" />
            </td>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in data" :key="index">
            <tr class="h-14">
              <td class="pl-3 index-number">{{ index }}</td>
              <td>
                <div class="flex items-center max-w-28 whitespace-nowrap">
                  <ui-image class="min-w-8 min-h-8 rounded-full" :src="safeGet(item, 'logo')" />
                  <div class="ml-1.5">
                    <div class="numberDefault text-number line-height-no smallTxt max-w-28 whitespace-nowrap">Astar Network</div>
                    <div class="nameTag text-number text-left line-height-no">ASTR</div>
                  </div>
                </div>
              </td>
              <td class="text-center txt text-number">Web3</td>
              <td class="text-center txt text-number">Seed</td>
              <td class="text-right txt text-number">{{ toNumberCashFormat(5000000, "$") }}</td>
              <td class="text-right txt text-number">{{ 1 ? getDateMDY(dataToTimestamp(159283911)) : "TBA" }}</td>
              <td class="text-right txt text-number pr-3">已发布</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <ui-empty v-else-if="data.length === 0 && !loading" class="pb-3 pt-10" />
    <div v-if="data.length > 0 && resultNumber >= params.page_size" class="more" @click="more">{{ i18n.home.loadingMore }}</div>
    <UiLoading v-if="loading" class="fixed top-0 bottom-0 left-0 right-0" />
  </div>
</template>
<style scoped lang="scss">
.sort {
  @apply h-10;
  @apply flex items-center;
  @apply text-kd12px16px font-medium text-global-highTitle text-opacity-65;
}

.index-number {
  @apply text-global-highTitle text-kd14px16px;
}

.border-tb {
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

.table-my {
  @apply md:w-full w-180;
}

.numberDefault {
  @apply text-kd12px16px md:text-kd14px16px text-global-highTitle;
}

.nameTag {
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}

.txt {
  @apply text-kd14px16px text-global-highTitle;
}

.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}
</style>
