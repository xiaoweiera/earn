<script setup lang="ts">
/**
 * 基础信息
 */
import Tag from "../tag.vue";
import { ElInput, ElCheckbox } from "element-plus";
import { ref } from "vue";

const price = ref(0);
const gasLimit = ref(0);
const mintNumber = ref(0);
const mintTotal = ref(0);
const isLimit = ref(false);
</script>
<template>
  <div class="border-css">
    <div class="flex items-center">
      <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
      <span class="text-kd14px18px font-medium text-global-black-title">基础信息</span>
    </div>
    <div class="kd-input">
      <!--      Value-->
      <div class="item">
        <span class="txt" v-html="'Value <='"></span>
        <el-input v-model="price" class="input-info" placeholder="" autocomplete="off" />
        <!--切换按钮-->
        <Tag class="ml-3" />
      </div>
      <!--      Value-->
      <div class="item">
        <span class="txt" v-html="'Gas 上限 <='"></span>
        <el-input v-model="gasLimit" class="input-info" placeholder="" autocomplete="off" />
        <!--切换按钮-->
        <Tag class="ml-3" />
        <span class="des" v-html="'捋自动获取最优Gas方案，并确保每笔Gas <= Gas 上限'"></span>
      </div>
      <!--      Value-->
      <div class="item">
        <span class="txt" v-html="'单合约 Mint 数量 <='"></span>
        <el-input v-model="mintNumber" class="input-info" placeholder="" autocomplete="off" />
      </div>
      <!--      Value-->
      <div class="item">
        <span class="txt" v-html="'本次 Mint 总数 <='"></span>
        <el-input v-model="mintTotal" class="input-info" placeholder="" autocomplete="off" />
        <el-checkbox v-model="isLimit" class="ml-3" label="无上限"></el-checkbox>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.txt {
  @apply text-kd12px16px text-global-black-title whitespace-nowrap mr-3;
  @apply min-w-32 w-32 text-right;
}
::v-deep(.el-checkbox__label) {
  @apply text-global-text-grey text-kd12px16px;
}
::v-deep(.el-checkbox__inner) {
  border: 2px solid rgba(3, 54, 102, 0.25) !important;
  border-radius: 4px !important;
}
.item {
  @apply w-110 h-8 mt-3;
  @apply flex items-center relative;
}
.des {
  @apply text-kd12px16px text-global-text-grey ml-3 whitespace-nowrap;
}
</style>
