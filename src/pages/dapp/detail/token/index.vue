<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { oss } from "src/config";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import { Model, tokenUrl } from "src/logic/dapp/detail";
import { Currency, TabName } from "src/types/dapp/data";
import DAppTokensNfts from "src/pages/dapp/detail/token/nfts.vue";
import DappTokensAirdrops from "src/pages/dapp/detail/token/airdrops.vue";

const props = defineProps({
  value: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const i18n = I18n();
const empty = ref<boolean>(false); // 是否为空数据
const chartData: any = ref({}); //代币图表
// 当前币种
const active = ref<string | number>("");
// 币种列表
const tokenList = ref<Currency[]>([]);

const params = reactive({
  id: props.value.id,
});

const onCustom = function (data: object) {
  return data;
};

//处理id和name
const integratedData = function (data: any) {
  if (data) {
    return data.map(function (item: any) {
      return {
        ...item,
        id: item.symbol,
        name: item.symbol,
      };
      return item;
    });
  }
  return data;
};
const getTokenList = async () => {
  const api = new Model();
  const res: any = await api.getTokenList(params);
  const list = integratedData(res);
  tokenList.value = list;
  if (props.value.tab === TabName.dashboard) {
    const [first] = list;
    if (first) {
      const value = { token: first.id };
      return onChange(value);
    }
  }
};
// 币种切换
const onChange = async function (data: object) {
  const api = new Model();
  const tokenId = safeGet<string | number>(data, "token");
  if (tokenId) {
    active.value = tokenId;
    const tokenParams = {
      symbol: tokenId,
      range: "ALL",
    };
    const data = await api.getTokenData(tokenParams);
    if (data) {
      chartData.value = data;
    }
  }
};
onMounted(function () {
  getTokenList();
});
</script>

<template>
  <!-- 代币页面显示 -->
  <div v-if="value.tab === TabName.token" class="min-h-87.5">
    <!-- 添加loading -->
    <div v-if="tokenList && tokenList.length" class="md:flex md:flex-nowrap">
      <div class="md:flex-1">
        <p v-if="chartData.xAxis && chartData.xAxis.length > 0" class="text-global-highTitle text-kd16px24px pl-2">{{ i18n.address.money.jiage }}</p>
        <!-- 代币图表 -->
        <div class="token-echart md:mt-2">
          <div class="equal-width-height" :class="{ 'equal-60': value.tab === TabName.token, 'equal-30': value.tab === TabName.dashboard }">
            <div v-if="chartData.legends" class="w-full h-48 mx-auto md:mt-2">
              <ui-echart-content :custom="onCustom" :data="chartData" class="h-full" />
            </div>
          </div>
        </div>
      </div>
      <!-- 代币排行 -->
      <div v-if="value.tab === TabName.token" class="md:mt-0 mt-5">
        <div class="md:w-min-75 w-full h-full md:ml-4 lg:ml-6 lg:w-75 rounded-xl bg-global-topBg px-4 pt-2 pb-2">
          <ui-tab active-name="token" trigger="click" :list="tokenList" @change="onChange">
            <template #default="scope">
              <span class="text-14-18 font-m">{{ scope.data.name }}</span>
            </template>
          </ui-tab>
          <div class="pt-1">
            <template v-for="item in tokenList" :key="item.id">
              <div v-if="value.type === TabName.nft">
                <DAppTokensNfts :list="item" />
              </div>
              <div v-else>
                <DappTokensAirdrops :list="item" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="relative">
      <div v-if="empty">
        <div class="w-full h-full">
          <img class="w-full h-full" :src="`${oss}/common/tokenImg.png`" />
        </div>
        <div class="tokenEmpty">
          <p class="text-kd14px18px text-global-highTitle text-opacity-85">{{ i18n.dapp.project.captured }}</p>
          <p class="mt-3 text-kd14px18px text-global-white text-center px-3 py-2 bg-global-darkblue text-white rounded">
            <v-router :href="tokenUrl" target="_blank">
              {{ I18n.dapp.project.submit }}
            </v-router>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- 概览页显示 -->
  <div v-else-if="value.tab === TabName.dashboard">
    <div class="md:flex md:flex-nowrap">
      <div class="md:flex-1">
        <p class="text-global-highTitle text-kd16px24px pl-2">{{ i18n.address.money.jiage }}</p>
        <!-- 代币图表 -->
        <div v-if="tokenList && tokenList.length" class="token-echart md:mt-2">
          <div class="equal-width-height" :class="{ 'equal-60': value.tab === TabName.token, 'equal-30': value.tab === TabName.dashboard }">
            <div v-if="chartData.legends" class="w-full h-48 mx-auto md:mt-2">
              <ui-echart-content :custom="onCustom" :data="chartData" class="h-full" />
            </div>
          </div>
        </div>
        <div v-else class="relative h-58">
          <div v-if="empty">
            <div class="w-full h-full">
              <img class="w-full h-full" :src="`${oss}/common/tokenImg.png`" />
            </div>
            <div class="tokenEmpty">
              <p class="text-kd14px18px text-global-highTitle text-opacity-85">{{ i18n.dapp.project.captured }}</p>
              <p class="mt-3 text-kd14px18px text-global-white text-center px-3 py-2 bg-global-darkblue text-white rounded">
                <v-router :href="tokenUrl" target="_blank">
                  {{ I18n.dapp.project.submit }}
                </v-router>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.equal-width-height {
  &.equal-30 {
    &:before {
      margin-top: 40%;
    }
  }
  &.equal-60 {
    &:before {
      margin-top: 70%;
    }
  }
}
.tokenEmpty {
  @apply absolute;
  top: 34%;
  left: 35%;
}
@screen md {
  .tokenEmpty {
    top: 34%;
    left: 41%;
  }
}
.token-list {
  @apply h-10 flex flex-row justify-between items-center text-12 text-global-highTitle border-b-1 border-global-highTitle border-opacity-4;
}
</style>
