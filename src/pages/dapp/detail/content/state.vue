<script setup lang="ts">
import I18n from "src/utils/i18n";
import { isAfter } from "src/utils";

defineProps({
  // 开始时间
  start: {
    type: [String, Number],
    required: true,
  },
  // 结束时间
  ended: {
    type: [String, Number],
    required: true,
  },
});
const i18n = I18n();
</script>

<template>
  <div v-if="start || ended">
    <!--如果开始时间大于当前时间-->
    <template v-if="isAfter(start)">
      <!-- 即将开始 -->
      <p class="py-1 px-2 bg-global-darkblue bg-opacity-12 rounded-md text-kd12px18px text-global-darkblue font-kdInter">{{ i18n.dapp.detail.upcoming }}</p>
    </template>
    <!--如果结束时间大于当前时间-->
    <template v-else-if="isAfter(ended)">
      <!-- 进行中 -->
      <p class="py-1 px-2 bg-global-numGreen bg-opacity-12 rounded-md text-kd12px18px text-global-numGreen font-kdInter">{{ i18n.dapp.detail.ongoing }}</p>
    </template>
    <template v-else>
      <!-- 已结束 -->
      <p class="py-1 px-2 bg-global-highTitle bg-opacity-12 rounded-md text-kd12px18px text-global-highTitle font-kdInter">{{ i18n.dapp.detail.ended }}</p>
    </template>
  </div>
</template>
<style scoped></style>
