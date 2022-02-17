<script setup lang="ts">
import I18n from '~/utils/i18n/index'
</script>
<template>
  <div>
    <ui-time-countdown :value="value">
      <template #default="scope">
        <div class="flex items-center">
          <span class="flex flex-col items-center">
            <span class="time-value">{{ scope.day }}</span>
            <span class="time-label">Day</span>
          </span>
          <span class="time-middle">
            :
          </span>
          <span class="flex flex-col items-center">
            <span class="time-value">{{ scope.hour }}</span>
            <span class="time-label">Hrs</span>
          </span>
          <span class="time-middle">
            :
          </span>
          <span class="flex flex-col items-center">
            <span class="time-value">{{ scope.minute }}</span>
            <span class="time-label">Min</span>
          </span>
          <span class="time-middle">
            :
          </span>
          <span class="flex flex-col items-center">
            <span class="time-value">{{ scope.second }}</span>
            <span class="time-label">Sec</span>
          </span>
        </div>
      </template>
    </ui-time-countdown>
  </div>
</template>
<style lang="scss" scoped>
  .time-label {
    @apply ml-1 text-kd10px12px text-global-default text-opacity-65 font-kdFang;
  }
  .time-value {
    font-family: Barlow Semi Condensed;
    @apply text-kd18px18px text-global-darkblue font-semibold;
  }
  .time-middle {
    @apply text-kd14px14px text-global-darkblue mx-1;
  }
</style>