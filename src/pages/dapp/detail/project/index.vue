<script lang="ts" setup>
import I18n from "src/utils/i18n";
import _ from "lodash";
import { reactive, ref } from "vue";
import { uuid, toNumberCash, getEnDateMDY, toNumberCashFormat } from "src/utils";
import { Model } from "src/logic/dapp/detail";
import { getValue } from "src/utils/root/data";
import { alias, createRef } from "src/utils/ssr/ref";
import { config } from "src/router/config";

const props = defineProps({
  id: [String, Number],
  default: () => {
    return {};
  },
});
const i18n = I18n();
const key = ref(uuid());
const params = reactive({
  page: 1,
  page_size: 200,
  project_id: props.id,
  sort_field: "",
  sort_type: "", // desc asc
});

const infoList: any = createRef<object[]>(alias.dApp.DAppDetail.invest, []);
//排序
const sort = () => listChange();
const api = new Model();
const listChange = _.debounce(() => {
  key.value = uuid();
}, 300);

//项目信息列表
const requestList = async () => {
  infoList.value = await api.getProjectInfo(params);
  return infoList.value;
};
const initValue = () => {
  return getValue<object[]>(alias.dApp.DAppDetail.invest, []);
};

//计算总数
const total = function (data: any) {
  if (data && data.length > 0) {
    return data.reduce((sum: number, item: any) => {
      return item.amount + sum;
    }, 0);
  }
};
</script>

<template>
  <div>
    <div class="mb-6 mt-8 md:mt-14">
      <h1 class="text-global-highTitle text-kd24px28px font-medium">{{ i18n.invest.project.investmentTitle }}</h1>
      <!-- 数据合集 -->
      <div class="w-full md:w-92 grid grid-cols-2 gap-6 mt-3">
        <div class="project-round">
          <p class="round-title">{{ i18n.invest.project.financing }}</p>
          <p class="round-num">{{ infoList.length }}</p>
        </div>
        <div class="project-round">
          <p class="round-title">{{ i18n.invest.project.totalRaised }}</p>
          <p class="round-num">{{ toNumberCashFormat(total(infoList), "", "$") }}</p>
        </div>
      </div>
    </div>
    <!-- 表格 -->
    <div :key="key">
      <ui-pagination :limit="200" :init-value="initValue()" :request="requestList">
        <template #default="scope">
          <div class="showX">
            <table class="table-my mb-4">
              <thead>
                <tr class="border-tb">
                  <td class="w-10">
                    <div class="sort pl-3 text-number">#</div>
                  </td>
                  <td class="w-30">
                    <uiSort class="sort justify-center" :sort-data="params" key-name="stage_name" :name="i18n.invest.fundedRound" @change="sort" />
                  </td>
                  <td class="w-30">
                    <uiSort class="sort justify-center" :sort-data="params" key-name="invested_at" :name="i18n.invest.date" @change="sort" />
                  </td>
                  <td class="w-30">
                    <uiSort class="sort justify-center" :sort-data="params" key-name="amount" :name="i18n.invest.fundAmount" @change="sort" />
                  </td>
                  <td class="pr-3">
                    <!--                    <uiSort class="sort justify-end" :sort-data="params" key-name="amount" :name="i18n.invest.project.investment" @change="sort" />-->
                    <div class="sort justify-end">{{ i18n.invest.project.investment }}</div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in scope.list" :key="index">
                  <tr class="min-h-15 h-15">
                    <td class="pl-3 index-number">{{ index + 1 }}</td>
                    <td class="h-full">
                      <div class="project-td">
                        {{ item.stage_name }}
                      </div>
                    </td>
                    <td class="h-full">
                      <div class="project-td">
                        {{ getEnDateMDY(item.invested_at) }}
                      </div>
                    </td>
                    <td class="h-full">
                      <div class="project-td">
                        {{ toNumberCash(item.amount, "", "$") }}
                      </div>
                    </td>
                    <td class="h-full py-3">
                      <div class="flex flex-wrap items-center justify-end text-kd14px18px text-global-darkblue font-medium">
                        <temlate v-for="(data, index) in item.investors" :key="index">
                          <v-router :href="`${config.invest}/${data.id}`" target="_blank" name="span">{{ data.name }}</v-router>
                          <span class="text-global-highTitle">，</span>
                        </temlate>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-round {
  @apply bg-global-white border border-global-darkblue border-opacity-6 overflow-hidden rounded-lg;
}
.round-title {
  @apply h-8.5 flex items-center justify-center text-kd14px18px text-global-highTitle text-opacity-65;
}
.round-num {
  @apply h-11.5 flex items-center justify-center bg-global-darkblue text-kd24px28px text-global-white;
}

.sort {
  @apply h-10;
  @apply flex items-center;
  @apply text-kd12px16px font-medium text-global-highTitle text-opacity-65;
}
.border-tb {
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

.table-my {
  @apply w-300 md:w-full md:max-w-300;
}
.index-number {
  @apply text-global-highTitle text-kd14px16px;
}
.project-td {
  @apply flex items-center justify-center text-kd14px18px text-global-highTitle font-medium py-3;
}
.ui-pagination {
  @apply min-h-30;
}
</style>
