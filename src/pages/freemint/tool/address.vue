<script setup lang="ts">
import Chain from "../feed/chain.vue";
import Card from "./ui/card/index.vue";
import Key from "./ui/key.vue";
import Log from "./ui/log/index.vue";
import Node from "./ui/node.vue";
import Button from "./ui/button.vue";
import BaseInfo from "./ui/baseinfo/index.vue";
import Keyword from "./ui/keyword.vue";
// import Info from "./ui/info.vue";
import { reactive } from "vue";
import { toolMode } from "src/types/freemint";
import { ref, onMounted } from "vue";
import { Nft } from "src/pages/freemint/lib/nft";

const toolModel: toolMode = reactive({
  node: "",
  keyList: ["71eb2e2adb04b9a0347e4f3607c30f246c9e84a3e406983cb36a9eb409bbe147"],
  // node: "https://eth-goerli.alchemyapi.io/v2/QbsWpdaiHPxNiBHB297Zq4d9SfSF4Mnu", //节点
  // keyList: [
  //   "71eb2e2adb04b9a0347e4f3607c30f246c9e84a3e406983cb36a9eb409bbe147", // 0xA68c22160A887ce1E91ce7B650f80FED923650bC
  //   // "a9d02766e49feb7e640d1e72b76af727da02ca420253953c28536dc2bb929517", //0xe74d2e4743aBD08bDc64B7b98568015A48145019
  //   // "test-error",
  // ], //私钥
  smartMintList: [], //smart 地址列表
  baseFeePerGas: 0,
  maxPriorityFeePerGas: 0,
  maxFeePerGas: 0,
  baseInfo: {
    value: 0,
    valueType: "eth",
    gasLimit: 0.05,
    gasType: "eth",
    singleContractMintAmount: 1,
    mintTotal: 10,
    isNoLimit: false,
  },
  mintAmount: 10,
  mintValue: 0,
  inputData: "",
  shieldWord: "", //屏蔽词搜索
  keyWord: "", //关键词搜索
  logs: [],
  start_running: false,
  minted: {}, // { contract_address: []}
});

//@ts-ignore
const keyList = (keyList: any) => (toolModel.keyList = keyList);
const smartMintList = (keyList: any) => (toolModel.smartMintList = keyList);

const NFT = ref();

const autom_mint = async () => {
  await NFT.value.auto_mint(toolModel, toolModel.keyList, toolModel.logs);
};

onMounted(async () => {
  //@ts-ignore
  NFT.value = new Nft(window["AlchemyWeb3"]);
});
</script>
<template>
  <div class="container-mint">
    <div class="state justify-between">
      <div class="text-kd16px22px font-medium text-global-highTitle">根据地址自动 Mint</div>
      <div>
        <Chain />
      </div>
    </div>
    <!--    卡片-->
    <Card class="mt-4" :toolModel="toolModel" />
    <!--    节点选择-->
    <Node class="mt-4" :toolModel="toolModel" />
    <!--    私钥-->
    <Key class="mt-4" :toolModel="toolModel" @key-call="keyList" />
    <!--    基础信息-->
    <BaseInfo class="mt-4" :toolModel="toolModel" />
    <!--  Smart Minter地址筛选-->
    <Key class="mt-4" icon="filter" title="Smart Minter 地址筛选" des="添加你想跟踪的地址，将仅跟踪这些地址 Mint 的 NFT。填入地址后点击 Add 添加。" :isWallet="false" @key-call="smartMintList" />
    <!--    NFT 关键词搜索-->
    <Keyword class="mt-4" :toolModel="toolModel" />
    <!--    Mint日志-->
    <Log class="mt-4" :toolModel="toolModel" />
    <!--    首页 info 和 Mint按钮-->
    <!-- <Info class="mt-4" /> -->
    <!--Mint-->
    <Button type="auto" :toolModel="toolModel" @start_mint="autom_mint" />
  </div>
</template>
<style lang="scss">
.container-mint {
  @apply max-w-200 mx-auto p-4 md:pt-6 md:px-0;
}

.border-css {
  @apply p-4 border-1 border-global-highTitle border-opacity-10 rounded-kd6px;
}

.kd-input {
  .el-input__inner {
    border: 1px solid rgba(3, 54, 102, 0.04) !important;
    box-shadow: none;
    background: #fafbfc;
    height: 32px !important;
    //padding-left: 8px !important;
    border-radius: 4px !important;
    color: #111316 !important;
    @apply text-kd12px16px;
  }

  .input-info {
    @apply w-50 min-w-50;
  }
}

.button-mint {
  @apply bg-global-primary bg-opacity-6 rounded-kd4px;
  @apply h-8  px-2 md:px-3 text-kd14px18px   font-medium;
  @apply flex items-center text-global-primary flex-nowrap justify-center whitespace-nowrap cursor-pointer;
}
</style>
