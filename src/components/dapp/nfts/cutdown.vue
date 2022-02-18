<script setup lang="ts">
import I18n from '~/utils/i18n/index'
</script>
<template>
  <div>
    <ui-time-countdown :value="value">
      <template #default="scope">
        <div class="flex items-center">
          <span class="font-kdBarlow">
            <span class="time-value">{{ scope.day }}</span>
            <span class="time-label">d</span>
          </span>
          <span class="ml-1 font-kdBarlow">
            <span class="time-value">{{ scope.hour }}</span>
            <span class="time-label">h</span>
          </span>
          <span class="ml-1 font-kdBarlow">
            <span class="time-value">{{ scope.minute }}</span>
            <span class="time-label">m</span>
          </span>
          <span class="ml-1 font-kdBarlow">
            <span class="time-value">{{ scope.second }}</span>
            <span class="time-label">s</span>
          </span>
        </div>
      </template>
    </ui-time-countdown>
  </div>
</template>
<style lang="scss" scoped>
  .time-label {
    @apply font-kdBarlow text-kd14px20px text-global-white font-medium i8n-font-Barlow;
  }
  .time-value {
    @apply font-kdBarlow text-kd14px20px text-global-white font-medium i8n-font-Barlow;
  }
</style>