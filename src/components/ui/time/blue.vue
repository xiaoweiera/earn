<script lang="ts" setup>
/**
 * @file 蓝色 时间
 * @auth svon.me@gmail.com
 */
import Time from "./countdown.vue";

defineProps({
  value: {
    type: [String, Number],
    default: "",
  },
});
</script>

<template>
  <div class="flex items-center text-18-20 text-global-darkblue font-m">
    <Time :value="value">
      <template #default="scope">
        <span>{{ scope.day }}d</span>
        <span>{{ scope.hour }}h</span>
        <span>{{ scope.minute }}m</span>
        <span>{{ scope.second }}s</span>
      </template>
    </Time>
  </div>
</template>
<style lang="scss" scoped>
.blue-time {
}

span {
  @apply inline-block align-middle min-w-9;
  &:after {
    content: ":";
    @apply mx-1 inline align-bottom font-semibold;
  }

  &:last-child {
    @apply min-w-7.5;
    &:after {
      content: none;
    }
  }
}
</style>
