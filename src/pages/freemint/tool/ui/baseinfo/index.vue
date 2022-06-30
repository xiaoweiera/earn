<script setup lang="ts">
/**
 * 基础信息
 */
import Tag from "../tag.vue";
import { ElInput } from "element-plus";
import { PropType } from "vue";
import { toolMode } from "src/types/freemint";
const props = defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
});
//@ts-ignore
const changeValueType = (value: string) => (props.toolModel.baseInfo.valueType = value);
//@ts-ignore
const changeGasType = (value: string) => (props.toolModel.baseInfo.gasType = value);
</script>
<template>
  <div class="border-css">
    <div class="flex items-center">
      <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
      <span class="text-kd14px18px font-medium text-global-black-title" @click="aa">基础信息</span>
    </div>
    <div class="kd-input">
      <!--      Value-->
      <div class="item">
        <div class="txt" v-html="'Mint Price <='"></div>
        <div class="state mt-1 md:mt-0">
          <el-input v-model="toolModel.baseInfo.value" class="input-info" placeholder="" autocomplete="off" />
          <!--切换按钮-->
          <Tag class="ml-3" @change="changeValueType" />
          <div class="des xshidden" v-html="'Mint Price 超过该值的 Mint 会自动忽略'"></div>
        </div>
      </div>
      <!--      Gas 上限-->
      <div class="item">
        <div class="txt" v-html="'单词手续费上限 <='"></div>
        <div class="des mdhidden" v-html="'单次手续费超过该值的 Mint 会自动忽略'"></div>
        <div class="state mt-1 md:mt-0">
          <el-input v-model="toolModel.baseInfo.gasLimit" class="input-info" placeholder="" autocomplete="off" />
          <!--切换按钮-->
          <Tag class="ml-3" @change="changeGasType" />
          <div class="des xshidden" v-html="'单次手续费超过该值的 Mint 会自动忽略'"></div>
        </div>
      </div>
      <!--      单合约 Mint 数量-->
      <div class="item">
        <div class="txt" v-html="'单合约 Mint 数量 <='"></div>
        <el-input v-model="toolModel.baseInfo.singleContractMintAmount" class="input-info mt-1 md:mt-0" placeholder="" autocomplete="off" />
      </div>
      <!--      本次 Mint 总数-->
      <div class="item">
        <div class="txt" v-html="'本次 Mint 总数 <='"></div>
        <div class="state mt-1 md:mt-0">
          <el-input v-model="toolModel.baseInfo.mintTotal" class="input-info" placeholder="" autocomplete="off" />
          <div class="des xshidden" v-html="'达到上限后，自动 Mint 程序会自动停止'"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.txt {
  @apply text-kd12px16px text-global-black-title whitespace-nowrap mr-3;
  @apply min-w-32 w-32 md:text-right;
}
::v-deep(.el-checkbox__label) {
  @apply text-global-text-grey text-kd12px16px;
}
::v-deep(.el-checkbox__inner) {
  border: 2px solid rgba(3, 54, 102, 0.25) !important;
  border-radius: 4px !important;
}
.item {
  @apply md:w-110 md:h-8 mt-3;
  @apply md:flex items-center relative;
}
.des {
  @apply text-kd12px16px text-global-text-grey md:ml-3 my-1 md:my-0 whitespace-nowrap;
}
</style>
