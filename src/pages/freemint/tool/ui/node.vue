<script setup lang="ts">
/**
 * 节点选择
 */
import { ElSelect, ElOption, ElInput } from "element-plus";
import { ref, PropType, reactive, onMounted } from "vue";
import { toolMode } from "src/types/freemint";
import { Nft } from "src/pages/freemint/lib/nft.js";

const props = defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
});
const NFT = ref();
const isPing = ref(false);
const nodeList = ref([
  { url: "https://mainnet-eth.compound.finance/", speed: "~" },
  { url: "https://geth.mytokenpocket.vip", speed: "~" },
  { url: "https://cloudflare-eth.com", speed: "~" },
  { url: "https://api.mycryptoapi.com/eth", speed: "~" },
  { url: "https://rpc.ankr.com/eth", speed: "~" },
  { url: "https://rpc.flashbots.net", speed: "~" },
]);
let currentRpc = reactive({ value: { url: "", speed: "~", isShow: false } });
const selectNode = ref(""); //选定的节点值

const ping = async () => {
  isPing.value = true;
  const urlList = nodeList.value.map((item) => item.url);
  const res = await NFT.value.test_rpc_list(urlList);
  const currentRes = await NFT.value._testSpeed(currentRpc.value.url);
  nodeList.value = res;
  currentRpc.value = { ...currentRes, isShow: true };
  isPing.value = false;
};

//更改地址
const selectChange = (item: any) => {
  selectNode.value = "";
  props.toolModel.node = item.url;
  currentRpc.value = {
    url: item.url,
    speed: item.speed,
    isShow: true,
  };
};

const inputChange = () => (currentRpc.value.isShow = false);
const getColor = (value: number) => (value < 1000 ? "green" : "red");

onMounted(async () => {
  //@ts-ignore
  NFT.value = new Nft(window["AlchemyWeb3"]);
  await ping();
  currentRpc.value = { ...nodeList.value[0], isShow: true };
});
</script>
<template>
  <div class="w-full border-css">
    <div class="state justify-between">
      <div class="state">
        <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
        <span class="text-kd14px18px font-medium text-global-black-title">节点选择</span>
      </div>
      <div class="button-mint">
        <span v-if="!isPing" @click="ping">Ping</span>
        <IconFont v-else size="14" type="loading" />
      </div>
    </div>
    <client-only class="mt-3 relative md:flex items-center">
      <el-select v-model="selectNode" class="w-30 mr-4" placeholder="请选择" @change="selectChange">
        <el-option v-for="item in nodeList" :key="item.url" :value="item">
          <div class="w-full h-full">
            <div class="flex h-full items-center justify-between">
              <span class="text-kd12px16px text-global-black-desc">{{ item["url"] }}</span>
              <span class="text-kd12px16px" :class="getColor(item['speed'])">{{ item["speed"] }} ms</span>
            </div>
          </div>
        </el-option>
      </el-select>
      <div class="state relative md:mt-0 mt-3 flex-1">
        <el-input v-model="currentRpc.value.url" class="input-info value-input" placeholder="" autocomplete="off" @change="inputChange" />
        <div v-if="currentRpc.value.url && currentRpc.value.isShow" class="selectNode" :class="getColor(currentRpc.value.speed)">{{ currentRpc.value.speed }} ms</div>
      </div>
    </client-only>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border: 1px solid rgba(3, 54, 102, 0) !important;
  box-shadow: none;
  background: #f8fafa;
  height: 32px !important;
  padding-left: 8px !important;
  border-radius: 4px !important;
  color: #111316 !important;
  @apply text-kd12px16px;
}

.el-select-dropdown__item {
  padding: 12px 12px 12px 12px !important;
  @apply w-82 md:w-107;
}

.green {
  color: #008f28;
}

.red {
  color: #dd4415;
}

.selectNode {
  @apply text-kd12px16px absolute whitespace-nowrap right-8 top-2;
}
</style>
