<script setup lang="ts">
/**
 * 关键词搜错
 */
import { ref } from "vue";
import { ElInput } from "element-plus";
const screenWord = ref(""); //关键词屏蔽
const selectWord = ref(""); //关键词筛选
</script>
<template>
  <div class="border-css kd-input">
    <div>
      <div class="flex items-center">
        <ui-image class="mr-2 w-5 h-5" oss src="/mint/filter.png" />
        <span class="title">NFT 关键词筛选</span>
      </div>
      <div class="des mt-1.5">如填写了关键词，将按照下列规则，先屏蔽后筛选。助您精准 Mint NFT</div>
    </div>
    <div class="item">
      <div class="txt">关键词屏蔽(选填)</div>
      <el-input v-model="screenWord" class="input-info value-input" placeholder="" autocomplete="off" />
      <div class="des value-des">名字包含关键词的 NFT将被过滤，多个词请用[,]分隔</div>
    </div>
    <div class="item">
      <div class="txt">关键词筛选(选填)</div>
      <el-input v-model="selectWord" class="input-info value-input" placeholder="" autocomplete="off" />
      <div class="des value-des">只 Mint 包含关键词的 NFT，多个词请用[,]分隔</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.value-input {
  @apply md:mx-3 mt-1 md:mt-0 order-1 md:order-0;
}
.value-des {
  @apply mt-1 md:mt-0 order-0 md:order-1;
}
.title {
  @apply text-kd14px18px font-medium text-global-black-title;
}
.des {
  @apply text-kd12px16px text-global-text-grey;
}
.txt {
  @apply text-kd12px16px text-global-black-title;
}
.item {
  @apply flex md:flex-row flex-col md:items-center mt-4;
}
</style>
