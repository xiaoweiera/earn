<script setup lang="ts">
import { ElOption, ElSelect, ElSwitch, ElInput } from "element-plus";
import { GroupPosition, dappHeader, dappHeaderMobile } from "src/logic/rank/config";
import Tabs from "src/pages/rank/tabs.vue";
import Item from "src/pages/rank/dapp/item.vue";
import I18n from "src/utils/i18n";
import { ref, reactive, onMounted, watch } from "vue";
import document from "src/plugins/browser/document";
import window from "src/plugins/browser/window";
import { getParam } from "src/utils/router";
import * as alias from "src/utils/root/alias";
import { Model } from "src/logic/home";
import { useRoute } from "vue-router";
import { getValue } from "src/utils/root/data";
import _ from "lodash";

const i18n = I18n();
const isPc = ref(true);
const route = useRoute();
const api = new Model();
const param = reactive({
  category: getParam<string>("category") || undefined,
  chain: getParam<string>("chain") || "all",
  group_id: getParam<string>("group") || "all",
  interval: "24h",
  sort_field: "volume",
  sort_type: "desc",
  query: "",
});
const isCompare = ref(false);
const listKey = ref(0);
const chainKey = ref(0);
watch(route, async () => {
  const newChain = getParam<string>("chain") || "all";
  if (param.chain !== newChain) {
    param.chain = newChain;
    chainKey.value++;
  }
  listChange();
});
watch(
  () => [param.interval, param.query],
  async () => listChange(),
);
const onSort = () => listChange();
//防抖
const listChange = _.debounce(() => {
  listKey.value++;
}, 300);
let initStatus = true;
const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return getValue(alias.rank.dappList, []);
  }
  return [];
};

const requestList = function (query: object) {
  const newParam = Object.assign(
    param,
    {
      category: getParam<string>("category") || undefined,
      chain: getParam<string>("chain") || "all",
      group_id: getParam<string>("group") || "all",
    },
    query,
  );
  return api.rank.getDappList(newParam);
};
onMounted(() => {
  isPc.value = document.body.clientWidth > 1024;
  window.addEventListener("resize", () => {
    isPc.value = document.body.clientWidth > 1024;
  });
});
</script>
<template>
  <div>
    <div class="flex items-center">
      <Tabs :key="chainKey" :position="GroupPosition.dappRank" />
      <div class="flex flex-1 justify-end rank-dapp">
        <div class="flex items-center xshidden md:mr-3">
          <span class="mr-1.5 text-sm text-global-highTitle text-opacity-85 i8n-font-inter">{{ i18n.dapp.rank.comparison }}</span>
          <el-switch v-model="isCompare"></el-switch>
        </div>
        <client-only class="interval md:order-1 order-2 md:mr-3">
          <el-select v-model="param.interval" size="small">
            <el-option v-for="item in ['7d', '24h']" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </client-only>
        <div class="query md:order-2 order-1 i8n-font-inter w-full md:w-auto mr-3 md:mr-0">
          <el-input v-model="param.query" :placeholder="i18n.dapp.rank.searchProject" size="small">
            <template #prefix>
              <i class="el-input__icon el-icon-search"></i>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <!--    table-->
    <div class="table-container">
      <div class="pt-3 title-wrap">
        <div :key="listKey">
          <ui-pagination :limit="50" :init-value="initValue()" :request="requestList">
            <template #default="scope">
              <div class="showX">
                <!--        header-->
                <div class="lg:w-full w-255">
                  <div class="title-content w-full px-3 flex items-center header h-10.5 bg-global-white rounded-kd6px">
                    <template v-for="(item, i) in isPc ? dappHeader : dappHeaderMobile" :key="i">
                      <div :class="i === 0 ? item.width + item.class : item.width + item.class" class="flex whitespace-nowrap sort h-full text-kd14px18px text-opacity-65 text-global-highTitle">
                        <div :class="item.key === param.sort_field ? 'tagBottom' : 'tagBottomNo'" class="h-full flex items-center">
                          <UiSort :sort="item.sort" class="font-kdBarlow" :sort-data="param" :key-name="item.key" :name="item.name" @change="onSort" />
                        </div>
                      </div>
                    </template>
                  </div>
                  <!--        list-->
                  <div v-for="(item, i) in scope.list" :key="i">
                    <Item :z-index="scope.list.length - 1 - i" :is-compare="isCompare" :sort-name="param.sort_field" :header-data="isPc ? dappHeader : dappHeaderMobile" :i="i" :item="item" />
                  </div>
                </div>
              </div>
            </template>
          </ui-pagination>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.rank-dapp {
  .tagBottom {
    @apply border-b-2 border-global-primary;
  }

  .tagBottomNo {
    @apply border-b-2 border-global-white;
  }

  .interval {
    .el-input__inner {
      background: none;
      width: 80px;
      height: 34px !important;
      border-radius: 4px !important;
      @apply border-global-highTitle border-opacity-10;
    }
  }

  .query {
    .el-input__inner {
      background: none;
      height: 34px !important;
      border-radius: 4px !important;
      @apply w-full md:w-40 flex items-center border-global-highTitle border-opacity-10;
    }
  }
}

.table-container {
  .bodyTr {
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
    margin-top: 20px !important;
  }

  .header {
    @apply flex items-center;
  }

  .title-wrap {
    background-color: #fafbfc;

    .title-content {
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
