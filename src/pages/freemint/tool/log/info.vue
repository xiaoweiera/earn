<script setup lang="ts">
/**
 * Mint日志的文字提示
 */
defineProps({
  type: {
    type: String,
    required: true, //going - waring
  },
});
</script>
<template>
  <div v-if="type === 'going'" class="flex items-center" :class="type">
    <IconFont class="mr-1.5" size="14" type="loading" />
    <span class="going">Auto Mint 程序运行中...</span>
  </div>
  <div v-else-if="type === 'waring'" class="flex items-center" :class="type">
    <IconFont class="mr-1.5" size="14" type="infoNo" />
    <span class="waring">私钥 1 Gas 费不足，Auto Mint 程序已停止</span>
  </div>
</template>
<style scoped lang="scss">
.going {
  @apply text-kd14px18px font-medium text-global-black-title;
}
.waring {
  @apply text-kd14px18px font-medium text-global-red;
}
</style>
