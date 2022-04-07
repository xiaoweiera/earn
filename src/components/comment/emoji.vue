<script setup lang="ts">
import { ElPopover } from "element-plus";
const emit = defineEmits(["select"]);
const list = ["🤣", "🙂", "😆", "😍", "😭", "😡"];
//点击表情添加回调
const addEmoji = (v: string) => emit("select", v + " ");
</script>
<template>
  <div class="emojiContainer">
    <client-only class="flex items-center">
      <el-popover placement="top" trigger="hover" :append-to-body="false">
        <div class="flex items-center p-2">
          <template v-for="(item, i) in list" :key="i">
            <div :class="i < list.length - 1 ? 'mr-1.5' : ''" class="w-6 h-6 text-18 text-center hand" @click="addEmoji(item)">
              {{ item }}
            </div>
          </template>
        </div>
        <template #reference>
          <IconFont class="ml-4 text-global-highTitle text-opacity-45 hand" size="18" type="icon-biaoqingbao" />
        </template>
      </el-popover>
    </client-only>
  </div>
</template>
<style lang="scss">
.emojiContainer {
  .el-popper {
    border-radius: 30px !important;
    padding: 0px !important;
    width: auto !important;
  }
}
</style>
