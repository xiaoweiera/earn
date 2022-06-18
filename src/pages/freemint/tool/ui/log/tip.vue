<script setup lang="ts">
/**
 * 状态小方块提示
 */
defineProps({
  type: {
    type: String,
    required: true, //noShow - select - success - fail
  },
});
const names = {
  noShow: "屏蔽",
  select: "筛选",
  success: "成功",
  fail: "失败",
};
</script>
<template>
  <div class="w-fit default" :class="type">{{ names[type] }}</div>
</template>
<style scoped lang="scss">
.default {
  @apply text-kd12px16px  h-5 px-2 whitespace-nowrap flex items-center justify-center;
}
.noShow {
  color: #989898;
  border: 1px solid #989898;
}
.select {
  color: #f0bf12;
  border: 1px solid #f0bf12;
}
.success {
  color: #008f28;
  border: 1px solid #008f28;
}
.fail {
  color: #dd4415;
  border: 1px solid #dd4415;
}
</style>
