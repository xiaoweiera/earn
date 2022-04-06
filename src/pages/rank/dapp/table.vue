<script setup lang="ts">
import { ElOption, ElSelect, ElSwitch, ElInput } from "element-plus";
import { GroupPosition, dappHeader, dappHeaderMobile } from "src/logic/rank/config";
import Tabs from "src/pages/rank/tabs.vue";
import Item from "src/pages/rank/dapp/item.vue";
import Header from "src/pages/rank/tableHeader.vue";
import * as console from "src/plugins/log/";
import I18n from "src/utils/i18n";
import { ref, reactive, onMounted, watch } from "vue";
import document from "src/plugins/browser/document";
import window from "src/plugins/browser/window";
import { getParam } from "src/utils/router";
import * as alias from "src/utils/root/alias";
import { Model } from "src/logic/rank";
import { useRoute } from "vue-router";
import { getValue } from "src/utils/root/data";
import { config as routerConfig } from "src/router/config";
import _ from "lodash";
const props = defineProps({
  category: {
    type: String,
    default: () => "",
  },
  isGroup: {
    type: Boolean,
    default: () => true,
  },
});
const i18n = I18n();
const isPc = ref(true);
const route = useRoute();
const api = new Model();
const param = reactive({
  category: props.category || undefined,
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
const onSort = () => {
  listChange();
};
//防抖
const listChange = _.debounce(() => {
  console.info("change");
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
      category: props.category || undefined,
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
    <div class="md:flex items-center">
      <Tabs v-if="isGroup" :key="chainKey" :position="GroupPosition.dappRank" :base-url="routerConfig.rankDapp" />
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
              <div :class="isPc ? '' : 'showX'">
                <!--        header-->
                <div class="lg:w-full w-255">
                  <UiSticky v-if="isPc" active-class="table-box-title">
                    <Header :header-data="dappHeader" :param="param" @onSort="onSort" />
                  </UiSticky>
                  <Header v-else :header-data="dappHeaderMobile" :param="param" @onSort="onSort" />
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
  .table-box-title {
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
  }
  .header {
    @apply flex items-center;
  }

  .title-wrap {
    background-color: #fafbfc;
  }
}
</style>
