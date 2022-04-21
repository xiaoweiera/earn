<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import { Model } from "src/logic/dapp/detail";
import { Currency, TabName } from "src/types/dapp/data";
import DAppTokensNfts from "src/pages/dapp/detail/token/nfts.vue";
import DAppTokensAirdrops from "src/pages/dapp/detail/token/airdrops.vue";
import { uuid } from "src/utils";

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const i18n = I18n();
const tokenKey = ref<string>(uuid());
const empty = ref<boolean>(false); // 是否为空数据
const chartData: any = ref({}); //代币图表
// 当前币种
const active = ref<string | number>("");
// 币种列表
const tokenList = ref<Currency[]>([]);

const params = reactive({
  id: props.data.id,
});

const onCustom = function (data: object) {
  return data;
};

//处理id和name

const integratedData = async (data: any) => {
  if (data && data.length) {
    return data.map(function (item: any) {
      return {
        ...item,
        id: item.symbol,
        name: item.symbol,
      };
    });
  }
  return data;
};
const getTokenList = async () => {
  const api = new Model();
  const res: any = await api.getTokenList(params);
  const list = await integratedData(res);
  tokenList.value = list;
  if (tokenList.value.length <= 0) {
    empty.value = true;
  }
  if (props.data.tab === TabName.dashboard && list.length) {
    const [first] = list;
    if (first) {
      const value = { token: first.id };
      return onChange(value);
    }
  }
};
// 币种切换
const onChange = async function (data: object) {
  const tokenId = safeGet<string | number>(data, "token");
  if (tokenId) {
    const api = new Model();
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
  <div>
    <div v-if="tokenList && tokenList.length > 0" :key="tokenKey" class="mb-6 md:mb-10 min-h-85">
      <!-- 添加loading -->
      <div class="md:flex md:flex-nowrap">
        <div class="md:flex-1">
          <p v-if="chartData.xAxis && chartData.xAxis.length > 0" class="text-global-highTitle text-kd16px24px pl-2">{{ i18n.address.money.jiage }}</p>
          <!-- 代币图表 -->
          <div class="token-echart md:mt-2">
            <div :class="tokenList && tokenList.length > 1 ? 'h-110' : 'h-100'">
              <div v-if="chartData.legends" class="h-full mx-auto md:mt-2">
                <ui-echart-content :custom="onCustom" :data="chartData" class="h-full" />
              </div>
            </div>
          </div>
        </div>
        <!-- 代币排行 -->
        <div class="md:mt-0 mt-5">
          <div class="md:w-min-75 w-full h-full md:ml-4 lg:ml-6 lg:w-75 rounded-xl bg-global-topBg px-4 pt-2 pb-2">
            <div v-if="tokenList && tokenList.length > 1" class="flex items-center h-10 min-w-67 showX cursor-pointer border-b border-global-darkblue border-opacity-4">
              <p v-for="item in tokenList" :key="item.id" :class="active === item.id ? 'tab-active' : ''" class="inline-flex flex-col items-center justify-center px-1 min-w-15 mr-4 h-full text-kd14px1px8 text-global-highTitle text-opacity-45 font-m" @click="onChange(item)">
                <span>{{ item.name }}</span>
                <span class="tab-active-border"></span>
              </p>
            </div>
            <div class="pt-1">
              <template v-for="item in tokenList" :key="item.id">
                <div v-if="data.type === TabName.nft">
                  <DAppTokensNfts :list="item" />
                </div>
                <div v-else>
                  <DAppTokensAirdrops :list="item" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-active {
  @apply text-global-darkblue;
  .tab-active-border {
    @apply w-full h-0.5 mt-2 bg-global-darkblue;
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
