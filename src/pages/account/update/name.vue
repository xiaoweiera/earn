<script lang="ts" setup>
import { ref } from "vue";
import { ElInput, ElButton } from "element-plus";

//昵称
const nickName = ref<string>("");
</script>

<template>
  <div>
    <div class="input-style">
      <el-input v-model="nickName" placeholder="请输入昵称" />
    </div>
    <div class="mt-5">
      <el-button class="w-full" type="primary" size="large">确认</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-style {
  ::v-deep(.el-input__inner) {
    @apply h-11 border-1 border-global-highTitle border-opacity-10 rounded-kd4px;
  }
}
</style>
