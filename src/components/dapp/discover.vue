<script setup lang="ts">
import { ref } from "vue"
import safeGet from "@fengqiaogang/safe-get";
import * as logic from "src/types/dapp/";
import { toLower } from "src/utils";
import { includes } from 'ramda';


const IGOData = ref([
  {
    "id": 1,
    // 名称
    "name": "Raca",
    // 数据类型, dapp-普通项目数据; ad-"广告"
    "data_type": "dapp",
    // Logo
    "logo": "https://jsdata-web.xyz/media/dapp/logo.png",
    // 封面
    "cover": "https://jsdata-web.xyz/media/dapp/cover.png",
    // 描述
    "description": "这里是项目描述，xxxxxxxx",
    // 项目代币
    "symbol": "HLS",
    // 所在公链
    "chains": ["bsc"],
    // IDO平台
    "tge_platform": "daomaker",
    // 风险等级
    "risk": "high",
    // 项目评分
    "overall_score": 9.8,
    // IDO价格
    "ido_price": 1.2,
    // 筹款目标
    "ido_fundraising_goal": 2000,
    // IDO开始时间
    "ido_start_at": 16534242234
  },{
    "id": 2,
    // 名称
    "name": "Raca",
    // 数据类型, dapp-普通项目数据; ad-"广告"
    "data_type": "dapp",
    // Logo
    "logo": "https://jsdata-web.xyz/media/dapp/logo.png",
    // 封面
    "cover": "https://jsdata-web.xyz/media/dapp/cover.png",
    // 描述
    "description": "这里是项目描述，xxxxxxxx",
    // 项目代币
    "symbol": "HLS",
    // 所在公链
    "chains": ["bsc"],
    // IDO平台
    "tge_platform": "daomaker",
    // 风险等级
    "risk": "high",
    // 项目评分
    "overall_score": 9.8,
    // IDO价格
    "ido_price": 1.2,
    // 筹款目标
    "ido_fundraising_goal": 2000,
    // IDO开始时间
    "ido_start_at": 16534242234
  },{
    "id": 3,
    // 名称
    "name": "Raca",
    // 数据类型, dapp-普通项目数据; ad-"广告"
    "data_type": "dapp",
    // Logo
    "logo": "https://jsdata-web.xyz/media/dapp/logo.png",
    // 封面
    "cover": "https://jsdata-web.xyz/media/dapp/cover.png",
    // 描述
    "description": "这里是项目描述，xxxxxxxx",
    // 项目代币
    "symbol": "HLS",
    // 所在公链
    "chains": ["bsc"],
    // IDO平台
    "tge_platform": "daomaker",
    // 风险等级
    "risk": "high",
    // 项目评分
    "overall_score": 9.8,
    // IDO价格
    "ido_price": 1.2,
    // 筹款目标
    "ido_fundraising_goal": 2000,
    // IDO开始时间
    "ido_start_at": 16534242234
  },
])
const active = ref<logic.TabTypes>();
const tabs = ref<logic.TabItem[]>(logic.tabs);
const init = function (query: object) {
  const type = safeGet<logic.TabTypes>(query, "type");
  if (type) {
    const id = toLower<logic.TabTypes>(type);
    const values = Object.values(logic.TabTypes);
    if (includes(id, values)) {
      active.value = id as logic.TabTypes;
      return;
    }
  }
  // 默认为全部
  active.value = logic.TabTypes.upcoming;
}
const onChangeView = function (data: object) {
  init(data);
}
</script>
<template>
  <div class="discover-warp px-3 md:px-22.5">
    <div class="content pt-8">
      <!-- 头部 -->
      <div class="header">
        <DappDiscoversHeader></DappDiscoversHeader>
      </div>
       <!-- 分类 -->
      <ui-Header-sticky active-class="table-box-title" class="is-tab bg-global-topBg mt-8">
        <div>
          <ui-tab :list="tabs" @change="onChangeView" active-name="type"></ui-tab>
        </div>
      </ui-Header-sticky>
      <!-- 搜索条件 -->
      <div>
        <DappDiscoversSearch></DappDiscoversSearch>
      </div>
      <!-- 列表内容 -->
      <div class="py-8">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <DappDiscoversList v-for="(item, index) in IGOData" :key='index' :list="item"></DappDiscoversList>
        </div>
        <div>
          <!-- <DappDiscoversEndlist class="px-4"></DappDiscoversEndlist> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.discover-warp {
  @apply pb-15 bg-global-topBg;

  .content {
    @apply max-w-320 mx-auto;
  }
  .is-tab {
    box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
  }
}
</style>
