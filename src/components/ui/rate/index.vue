<script setup lang="ts">
/**
 * @file DApp 评论
 */
import { toInteger, toNumber, toFixed } from "src/utils";
import I18n from "src/utils/i18n";
import safeGet from "@fengqiaogang/safe-get";
import { getInject } from "src/utils/use/state";
const dataProvide = getInject("detailState");
const i18n = I18n();
</script>

<template>
  <div class="rate">
    <div v-if="safeGet(dataProvide, 'id')" class="w-full h-full flex justify-center items-center">
      <div class="flex flex-col items-center">
        <p class="text-kd14px18px text-global-highTitle text-opacity-65">{{ i18n.part(i18n.airdrop.content.score, toInteger(safeGet(dataProvide, "clout")), { count: toInteger(safeGet(dataProvide, "clout")) }) }}</p>
        <div class="flex items-end">
          <p class="mt-2 text-kd48px48px text-global-highTitle">{{ toFixed(safeGet(dataProvide, "overall_score"), 1) }}</p>
          <p class="text-kd14px24px text-global-highTitle text-opacity-65 ml-1.5">分</p>
        </div>
        <UiRateStar :id="safeGet(dataProvide, 'id')" class="mt-3" :value="toNumber(safeGet(dataProvide, 'my_score'))"></UiRateStar>
      </div>
    </div>
  </div>
</template>
<style scoped>
.rate {
  border: 1px solid rgba(3, 54, 102, 0.06);
  @apply w-full md:w-70.5 h-34.5 py-4 md:py-0 md:h-full md:mr-6;
  @apply bg-global-highTitle bg-opacity-4 rounded-kd6px;
}
</style>
