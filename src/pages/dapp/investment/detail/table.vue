<script setup lang="ts">
import { reactive, PropType, ref } from "vue";
import Filter from "./filter.vue";
import { ElPopover } from "element-plus";
import { toNumberCashFormat } from "src/utils/convert/to";
import { config } from "src/router/config";
import { getDateMDY } from "src/utils";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
import { detailModel, filterModel } from "src/types/invest";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import * as alias from "src/utils/root/alias";
import API from "src/api";
import { useRoute } from "vue-router";
import _ from "lodash";
const props = defineProps({
  detail: {
    type: Object as PropType<detailModel>,
    required: true,
  },
});
const typeLength = 1; //类型显示个数
const data: any = createRef<object[]>(alias.invest.detail.investment, []);
const key = ref(0);
const route = useRoute();
const i18n = I18n();
const api = new API();
const params = reactive({
  investor_id: props.detail.id,
  keyword: "",
  project_category: "",
  stage: "",
  has_symbol: "",
  sort_field: "",
  sort_type: "", // desc asc
});
const change = (data: filterModel) => {
  Object.assign(params, data);
  listChange();
};
const listChange = _.debounce(() => {
  key.value++;
}, 300);
const sort = () => listChange();
const requestList = () => {
  return api.invest.getInvestment(params);
};
const initValue = () => {
  onLoadRef<object>(data, () => {
    return api.invest.getInvestment(params);
  });
};
</script>
<template>
  <div class="info">
    <!--    筛选 -->
    <Filter :detail="detail" @change="change" />
    <div :key="key">
      <!--    列表-->
      <ui-pagination :limit="10" :init-value="initValue()" :request="requestList">
        <template #default="scope">
          <div class="showX">
            <table class="table-my mb-4">
              <thead>
                <tr class="border-tb">
                  <td>
                    <div class="sort pl-3 text-number">#</div>
                  </td>
                  <td>
                    <uiSort class="sort" :sort="false" :sort-data="params" key-name="name" :name="i18n.invest.projectName" @change="sort" />
                  </td>
                  <td class="w-55">
                    <uiSort class="sort justify-center" :sort-data="params" key-name="project__categories" :name="i18n.invest.type" @change="sort" />
                  </td>
                  <td class="w-17">
                    <uiSort class="sort justify-end" :sort-data="params" key-name="stage_name" :name="i18n.invest.fundedRound" @change="sort" />
                  </td>
                  <td class="w-28">
                    <uiSort class="sort justify-end" :sort-data="params" key-name="amount" :name="i18n.invest.fundAmount" @change="sort" />
                  </td>
                  <td class="w-34">
                    <uiSort class="sort justify-end" :sort-data="params" key-name="invested_at" :name="i18n.invest.date" @change="sort" />
                  </td>
                  <td class="w-24">
                    <uiSort class="sort justify-end pr-3" :sort-data="params" key-name="project__symbol" :name="i18n.invest.isSend" @change="sort" />
                  </td>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in scope.list" :key="index">
                  <v-router :href="`${safeGet(config, 'funds')}/${safeGet(item, 'project.id')}`" name="tr" class="h-14" target="_blank">
                    <td class="pl-3 index-number">{{ index + 1 }}</td>
                    <td>
                      <div class="flex items-center max-w-31 whitespace-nowrap">
                        <ui-image class="min-w-8 max-w-8 w-8 h-8 rounded-full" :src="safeGet(item, 'project.logo')" />
                        <div class="ml-1.5 flex-1">
                          <div class="numberDefault text-number line-height-no short max-w-31 whitespace-nowrap">{{ safeGet(item, "project.name") }}</div>
                          <div class="nameTag text-number text-left line-height-no">{{ safeGet(item, "project.symbol") }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="text-right txt text-number">
                      <div v-if="safeGet(item, 'project.categories') && safeGet(item, 'project.categories.length') > 0" class="flex items-center whitespace-nowrap justify-center">
                        <template v-for="(typeName, i) in item.project.categories.slice(0, typeLength)" :key="i">
                          <span :class="i === 0 ? '' : 'ml-1.5'" class="typeTxt i8n-font-inter">{{ typeName }}</span>
                        </template>
                        <client-only class="invest-icon">
                          <el-popover v-if="item.project.categories.length > typeLength" popper-class="chain-popper" placement="bottom" trigger="hover" :append-to-body="false">
                            <div class="flex items-center px-2 py-1.5">
                              <template v-for="(typeName, i) in item.project.categories.slice(typeLength)" :key="i">
                                <span :class="i === 0 ? '' : 'ml-1.5'" class="typeTxt i8n-font-inter">{{ typeName }}</span>
                              </template>
                            </div>
                            <template #reference>
                              <div class="ml-1.5 relative bottom-1 text-global-highTitle text-opacity-45">...</div>
                            </template>
                          </el-popover>
                        </client-only>
                      </div>
                      <div v-else class="text-center text-global-highTitle">-</div>
                    </td>
                    <td class="text-right txt text-number">{{ safeGet(item, "stage_name") }}</td>
                    <td class="text-right txt text-number">{{ toNumberCashFormat(safeGet(item, "amount"), "$") }}</td>
                    <td class="text-right txt text-number">{{ 1 ? getDateMDY(safeGet(item, "invested_at")) : "TBA" }}</td>
                    <td class="text-right txt text-number pr-3">{{ safeGet(item, "project.symbol") ? safeGet(item, "project.symbol") : i18n.invest.noSend }}</td>
                  </v-router>
                </template>
              </tbody>
            </table>
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
<style scoped lang="scss">
.invest-icon {
  ::v-deep(.el-popover.el-popper) {
    min-width: fit-content !important;
    width: fit-content !important;
    padding: 0px 0px 0px 0px !important;
    border-radius: 100px;
    transform: translate(100%, 100%);
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }
}
.typeTxt {
  @apply text-kd14px18px text-global-highTitle font-kdFang;
}
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
  @apply md:w-full  w-200;
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
