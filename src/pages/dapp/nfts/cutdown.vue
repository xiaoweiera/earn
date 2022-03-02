<script setup lang="ts">
import I18n from "src/utils/i18n";
const i18n = I18n();
defineProps({
  value: {
    type: String || Number,
  }
})
</script>
<template>
  <div>
    <ui-time-countdown :value="value">
      <template #default="scope">
        <div class="flex items-center">
          <span class="font-kdBarlow">
            <span class="time-value">{{ scope.day }}</span>
            <span class="time-label">{{ i18n.home.nftProject.time.d }}</span>
          </span>
          <span class="ml-1 font-kdBarlow">
            <span class="time-value">{{ scope.hour }}</span>
            <span class="time-label">{{ i18n.home.nftProject.time.h }}</span>
          </span>
          <span class="ml-1 font-kdBarlow">
            <span class="time-value">{{ scope.minute }}</span>
            <span class="time-label">{{ i18n.home.nftProject.time.m }}</span>
          </span>
          <span class="ml-1 font-kdBarlow">
            <span class="time-value">{{ scope.second }}</span>
            <span class="time-label">{{ i18n.home.nftProject.time.s }}</span>
          </span>
        </div>
      </template>
    </ui-time-countdown>
  </div>
</template>
<style lang="scss" scoped>
  .time-label {
    @apply font-kdBarlow text-kd16px20px text-global-white font-medium i8n-font-Barlow;
  }
  .time-value {
    @apply font-kdBarlow text-kd16px20px text-global-white font-medium i8n-font-Barlow;
  }
</style>
