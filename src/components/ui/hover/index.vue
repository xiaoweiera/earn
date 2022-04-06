<script lang="ts" setup>
import { computed } from "vue";
import { ElPopover } from "element-plus";

const props = defineProps({
  width: {
    type: [Number, String],
    default: "fit-content",
  },
  placement: {
    type: String,
    default: "bottom",
  },
  trigger: {
    type: String,
    default: "hover",
  },
  // 是否圆角 (border-radius: 100px)
  rounded: {
    type: Boolean,
    default: () => false,
  },
  popperClass: {
    type: String,
    default: "",
  },
  offset: {
    type: Number,
    default: 0,
  },
});

const className = computed(function () {
  const arr: string[] = ["ui-hover"];
  if (props.rounded) {
    arr.push("rounded");
  }
  if (props.popperClass) {
    arr.push(props.popperClass);
  }
  return arr.join(" ");
});
</script>

<template>
  <client-only>
    <template #note>
      <slot name="label" />
    </template>
    <el-popover :placement="placement" :popper-class="className" :trigger="trigger" :width="width" :offset="offset">
      <template #reference>
        <div>
          <slot name="label" />
        </div>
      </template>
      <div>
        <slot name="content" />
      </div>
    </el-popover>
  </client-only>
</template>
