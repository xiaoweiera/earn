<script setup lang="ts">
import { ElPopover } from "element-plus";

defineProps({
  width: {
    type: [Number, String],
    default: "fit-content"
  },
  placement: {
    type: String,
    default: "bottom"
  },
  trigger: {
    type: String,
    default: "hover"
  }
})
</script>

<template>
  <client-only>
    <template #note>
      <slot name="label"></slot>
    </template>
    <el-popover :placement="placement" :trigger="trigger" :width="width" popper-class="ui-hover">
      <template #reference>
        <div>
          <slot name="label"></slot>
        </div>
      </template>
      <div>
        <slot name="content"></slot>
      </div>
    </el-popover>
  </client-only>
</template>
