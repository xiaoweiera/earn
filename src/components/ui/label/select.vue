<script lang="ts" setup>
/**
 * @file select
 * @auth svon.me@gmail.com
 */

import { computed, ref } from "vue";
import type { PropType } from "vue";
import type { LabelItem } from "src/types/ui/label";
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";

const emitEvent = defineEmits(["change"]);

const props = defineProps({
  list: {
    required: true,
    type: Array as PropType<LabelItem[]>,
  },
  nameKey: {
    type: String,
    default: "name",
  },
  // 默认选中的值
  selected: {
    type: String,
    default: "",
  },
});

const name = ref<string>("");

// 当前需要展示的数据
const curr = computed<LabelItem>(function () {
  let data: LabelItem = props.list[0];
  if (props.selected || name.value) {
    for (const item of props.list) {
      if (item) {
        const value = item[props.nameKey];
        if (value && name.value === name.value) {
          data = item;
        }
        if (value === props.selected) {
          data = item;
        }
      }
    }
  }
  return data;
});

const handleCommand = function (data: LabelItem) {
  name.value = data[props.nameKey];
  emitEvent("change", data);
};
</script>

<template>
  <div>
    <el-dropdown v-if="list.length > 1" placement="bottom-start" size="small" trigger="click" @command="handleCommand">
      <slot :arrow="true" :data="curr"></slot>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="(item, index) in list" :key="index">
            <el-dropdown-item :command="item">
              <slot :arrow="false" :data="item"></slot>
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <template v-else>
      <slot :arrow="false" :data="curr"></slot>
    </template>
  </div>
</template>
