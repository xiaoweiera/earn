<script setup lang="ts">
import DAppDiscoversCutdown from "src/pages/dapp/discovers/cutdown.vue";
// import I18n from "src/utils/i18n";
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
// const i18n = I18n();
</script>

<template>
  <div v-if="start || ended">
    <!--如果开始时间大于当前时间-->
    <template v-if="isAfter(start)">
      <!-- 开始时间 -->
      <p class="text-kd14px18px text-global-highTitle text-opacity-85 font-kdFang text-center">Time remaining</p>
      <div class="mt-3">
        <DAppDiscoversCutdown class="time-count-down" :value="start" />
      </div>
    </template>
    <!--如果结束时间大于当前时间-->
    <template v-else-if="isAfter(ended)">
      <!-- 剩余时间 -->
      <p class="text-kd14px18px text-global-highTitle text-opacity-85 font-kdFang text-center">Time remaining</p>
      <div class="mt-3">
        <DAppDiscoversCutdown class="time-count-down" :value="ended" />
      </div>
    </template>
    <template v-else>
      <!-- 已结束 -->
    </template>
  </div>
</template>

<style scoped lang="scss">
.time-count-down {
  @apply px-7;
  ::v-deep(.down-time) {
    @apply justify-between;
    .time-list {
      @apply min-w-10;
    }
    .time-value {
      @apply text-kd24px28px font-semibold;
    }
    .time-label {
      @apply text-kd12px18px;
    }
  }
}
</style>
