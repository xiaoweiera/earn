<script setup lang="ts">
/**
 * 首页Mint提交按钮
 */
import { ElButton } from "element-plus";
defineProps({
  type: {
    type: String,
    default: "ok", // ok-no-stop-auto
  },
});
const txt = {
  ok: "Mint",
  no: "Mint",
  stop: "STOP",
  auto: "Auto Mint",
};
</script>
<template>
  <div>
    <div class="mt-4 text-center" :class="type">
      <el-button native-type="submit">{{ txt[type] ? txt[type] : "Mint" }}</el-button>
    </div>
  </div>
</template>
<style lang="scss">
.ok,
.auto {
  .el-button {
    border: none !important;
    background: #006ff7 !important;
    color: white;
    border-radius: 6px !important;
    @apply w-75 h-11;
  }
}
.no {
  .el-button {
    border: none !important;
    background: rgba(3, 54, 102, 0.06) !important;
    color: rgba(3, 54, 102, 0.45) !important;
    border-radius: 6px !important;
    @apply w-75 h-11;
  }
}
.stop {
  .el-button {
    border: none !important;
    background: #dd4415 !important;
    color: white;
    border-radius: 6px !important;
    @apply w-75 h-11;
  }
}
</style>
