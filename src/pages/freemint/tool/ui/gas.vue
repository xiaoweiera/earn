<script setup lang="ts">
/**
 * Gas预估花费
 */
import { ElInput } from "element-plus";
import { PropType } from "vue";
import { toolMode } from "src/types/freemint";

defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
});
</script>
<template>
  <div class="w-full border-css">
    <!--  Gas-->
    <div class="md:flex items-center justify-between">
      <div class="flex items-center">
        <ui-image class="mr-2 w-5 h-5" oss src="/mint/gas.png" />
        <div class="title">
          <span>Gas 预估花费 =</span>
          <span>0.005 ETH</span>
          <span>($4.21)</span>
        </div>
      </div>
    </div>
    <div class="md:flex mt-4">
      <div class="state md:mr-6">
        <div class="gasItem">
          <div class="des">Base Fee (GWei)</div>
          <el-input v-model="toolModel.baseFeePerGas" placeholder="0" autocomplete="off" />
        </div>
        <div class="gasItem">
          <div class="des">Priority Fee (GWei)</div>
          <el-input v-model="toolModel.maxPriorityFeePerGas" placeholder="0" autocomplete="off" />
        </div>
        <div class="gasItem">
          <div class="des">Gas Limit</div>
          <el-input v-model="toolModel.maxFeePerGas" placeholder="0" autocomplete="off" />
        </div>
      </div>
    </div>
    <!-- -------------------------------------------------- -->
    <div class="mt-6 flex items-center">
      <!--  Mint数量-->
      <div class="flex-1 mr-6">
        <div class="flex items-center">
          <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
          <div class="title">Mint 数量</div>
        </div>
        <el-input v-model="toolModel.mintAmount" class="mt-4" placeholder="0" autocomplete="off" />
      </div>
      <!--  Value-->
      <div class="flex-1">
        <div class="flex items-center">
          <ui-image class="mr-2 w-5 h-5" oss src="/mint/walletNo.png" />
          <div class="title">Value</div>
        </div>
        <el-input v-model="toolModel.mintValue" class="mt-4" placeholder="0" autocomplete="off" />
      </div>
    </div>
    <!--  input data-->
    <div class="mt-6 input-data">
      <div class="flex items-center">
        <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
        <div class="title mr-1.5">Input Data</div>
        <span class="tips">如无法读懂，请不要修改</span>
      </div>
      <el-input v-model="toolModel.inputData" class="mt-4" :rows="3" type="textarea" placeholder="请输入" />
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

::v-deep(.el-switch__core) {
  @apply h-4.5;
}

::v-deep(.el-switch__action) {
  @apply w-3.5 h-3.5;
}

.input-data {
  ::v-deep(.el-textarea__inner) {
    border: 1px solid rgba(3, 54, 102, 0.04) !important;
    box-shadow: none;
    background: #fafbfc;
    padding: 8px !important;
    border-radius: 6px !important;
    color: #111316 !important;
    @apply text-kd12px16px;
  }
}

.title {
  @apply text-kd14px18px font-medium text-global-black-title;
}

.gasItem {
  @apply text-center flex-1;
  .des {
    @apply mb-1.5;
  }

  ::v-deep(.el-input__inner) {
    border: 1px solid rgba(3, 54, 102, 0.04) !important;
    box-shadow: none;
    background: #fafbfc;
    height: 32px !important;
    padding-left: 8px !important;
    border-radius: 4px !important;
    color: #111316 !important;
    text-align: center !important;
    @apply text-kd12px16px;
  }
}

.gasItem:not(:last-child) {
  @apply mr-3;
}

@screen md {
  .gasItem:not(:last-child) {
    @apply mr-6;
  }
}

.des {
  @apply text-kd12px16px md:text-kd13px18px text-global-text-grey whitespace-nowrap;
}

.des-no {
  color: #d3d6db;
  @apply text-kd12px16px  md:text-kd13px18px;
}

.no-show {
  @apply opacity-40;
}

.tips {
  color: #989898;
  @apply text-kd12px16px;
}
</style>
