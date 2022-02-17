<script lang="ts">
export default {
  props: {
    value: [String, Number]
  }
}
</script>

<template>
  <span class="time-count-down">
    <TimeCountdown :value="value">
      <template #default="date">
        <i class="text-12-12">{{ date.day }}</i> : <i class="text-12-12">{{ date.hour }}</i> : <i class="text-12-12">{{ date.minute }}</i> : <i class="text-12-12">{{ date.second }}</i>
      </template>
    </TimeCountdown>
  </span>
</template>

<style scoped lang="scss">
.time-count-down {
  @apply text-global-numRed inline-block;
  i {
    font-style: normal;
    line-height: 18px;
    border-radius: 2px;
    @apply text-white text-center;
    @apply w-4.5 h-4 bg-global-numRed inline-block;
  }
}
</style>
