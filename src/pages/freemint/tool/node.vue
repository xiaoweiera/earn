<script setup lang="ts">
import { ElSelect, ElOption } from "element-plus";
import { ref } from "vue";
const selectNode = ref(""); //选定的节点值
const nodeList = ref([
  { url: "https://aaaaaaaaa", value: 700 },
  { url: "https://bbbbbbbbb", value: 1100 },
  { url: "https://ccccccccc", value: 300 },
]);
const getColor = (value: number) => (value < 1000 ? "green" : "red");
</script>
<template>
  <div class="w-full border-css">
    <div class="flex items-center">
      <ui-image class="mr-2 w-5 h-5" oss src="/mint/data.png" />
      <span class="text-kd14px18px font-medium text-global-black-title">节点选择</span>
    </div>
    <client-only class="mt-3 relative">
      <el-select v-model="selectNode" class="w-full" placeholder="请选择">
        <el-option v-for="item in nodeList" :key="item.value" :label="item.url" :value="item.value">
          <div class="w-full h-full">
            <div class="flex h-full items-center justify-between">
              <span class="text-kd12px16px text-global-black-desc">{{ item.url }}</span>
              <span class="text-kd12px16px" :class="getColor(item.value)">{{ item.value }} ms</span>
            </div>
          </div>
        </el-option>
      </el-select>
      <div v-if="selectNode" class="selectNode" :class="getColor(selectNode)">{{ selectNode }} ms</div>
    </client-only>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-input__inner) {
  border: 1px solid rgba(3, 54, 102, 0) !important;
  box-shadow: none;
  background: #f8fafa;
  height: 32px !important;
  padding-left: 8px !important;
  border-radius: 4px !important;
  color: #111316 !important;
  @apply text-kd12px16px;
}
.el-select-dropdown__item {
  padding: 12px 12px 12px 12px !important;
}
.green {
  color: #008f28;
}
.red {
  color: #dd4415;
}
.selectNode {
  @apply text-kd12px16px absolute whitespace-nowrap right-8 top-2;
}
</style>
