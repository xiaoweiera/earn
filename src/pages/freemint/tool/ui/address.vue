<script setup lang="ts">
/**
 * Mint Hash 或者 合约地址 可自动识别
 */
import { ElInput } from "element-plus";
import { ref, PropType, onMounted } from "vue";
import { toolMode } from "src/types/freemint";
import { Nft } from "src/pages/freemint/lib/nft";
const emit = defineEmits(["addressCall"]);
const props = defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
});
const NFT = ref();
const isGet = ref(false);
//赋值或回调
const getMint = async (value: object) => {
  isGet.value = true;
  const res = await NFT.value.parse_hash(props.toolModel.hash);
  if (res) {
    props.toolModel.mintValue = res.value;
    props.toolModel.inputData = res.input_data;
    props.toolModel.contract = res.contract_address;
    props.toolModel.hashWithNFTOwner = res.owner
    props.toolModel.gasLimit = res.gasLimit
  }
  isGet.value = false;
  emit("addressCall", value);
};
onMounted(async () => {
  //@ts-ignore
  NFT.value = new Nft(window["AlchemyWeb3"]);
});
</script>
<template>
  <div class="w-full border-css">
    <div class="title">填入 Mint Hash 或 合约地址 可自动识别</div>
    <div class="flex items-center">
      <el-input v-model="toolModel.hash" placeholder="输入 ERC721 合约地址或者输入别人的 Mint Hash" autocomplete="off" />
      <div class="get-mint min-w-20.5" @click="getMint">
        <span v-if="!isGet">确定</span>
        <IconFont v-else size="14" type="loading" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border: 1px solid rgba(3, 54, 102, 0.04) !important;
  box-shadow: none;
  background: #fafbfc;
  height: 32px !important;
  padding-left: 8px !important;
  border-radius: 4px !important;
  color: #111316 !important;
  @apply text-kd12px16px;
}
.title {
  @apply text-kd14px18px font-medium text-global-black-title mb-1.4;
}
.get-mint {
  @apply bg-global-primary bg-opacity-6 rounded-kd4px;
  @apply ml-4 h-8 px-3 text-kd14px18px font-medium;
  @apply flex items-center text-global-primary flex-nowrap justify-center whitespace-nowrap cursor-pointer;
}
</style>
