<script lang="ts" setup>
/**
 * @file 标签
 * @auth svon.me@gmail.com
 */

import { computed } from "vue";
import type { PropType } from "vue";
import type { LabelItem } from "src/types/ui/label";
import { toArray, size, map, isObject, compact, encryption } from "src/utils/";
import LabelSelect from "./select.vue";

const emitEvent = defineEmits(["change"]);

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
  nameKey: {
    type: String,
    default: "name",
  },
  value: {
    type: [Array, String] as PropType<LabelItem[] | string[] | string>,
    default: () => [],
  },
  // 不使用下拉框，只想展示第一条数据
  noSelect: {
    type: Boolean,
    default: false,
  },
  // 当 value 的长度大于 1 时有效
  // 设置默认选中的值，默认为 value 第一个元素
  selected: {
    type: String,
    default: "",
  },
  // 是否需要复制功能
  // 如果 value 长度大于 1, 该功能无效
  copy: {
    type: Boolean,
    default: false,
  },
});

const list = computed<LabelItem[]>(function () {
  const array = map(function (value: string | LabelItem) {
    if (isObject(value)) {
      return value;
    }
    return {
      [props.nameKey]: value,
    };
  }, compact(toArray(props.value)));
  if (props.noSelect) {
    return array.slice(0, 1);
  }
  return array;
});

const onChange = function (data: LabelItem) {
  emitEvent("change", data);
};
</script>

<template>
  <div v-if="size(list) >= 1" class="ui-label rounded bg-global-highTitle bg-opacity-6">
    <label-select :list="list" :name-key="nameKey" :selected="selected" class="flex" @change="onChange">
      <template #default="{ data, arrow }">
        <div v-if="data" class="text-global-highTitle text-opacity-65 py-1 px-2">
          <div class="cursor-pointer flex items-center">
            <!--icon-->
            <slot :data="data" name="prefix">
              <span v-if="data.icon || data.logo" class="flex pr-1">
                <IconFont :type="data.icon || data.logo" size="16" />
              </span>
            </slot>
            <!--内容-->
            <div class="flex text-global-highTitle text-opacity-85">
              <slot :data="data">
                <label class="text-12-18">
                  <template v-if="data[nameKey].length >= 11">{{ encryption(data[nameKey]).value() }}</template>
                  <template v-else>{{ data[nameKey] }}</template>
                </label>
              </slot>
            </div>
            <!--功能-->
            <slot :data="data" name="suffix">
              <span v-if="arrow" class="flex pl-1">
                <IconFont v-if="arrow" size="16" type="icon-arrow-down" />
              </span>
              <div v-else-if="copy" class="flex pl-1">
                <v-copy :value="data.name" class="flex">
                  <IconFont size="16" type="icon-copy" />
                </v-copy>
              </div>
            </slot>
          </div>
        </div>
      </template>
    </label-select>
  </div>
</template>

<style lang="scss" scoped>
.ui-label {
  @apply mr-3;
  &:last-child {
    @apply mr-0;
  }

  &:not(.flex),
  &:not([class*="block"]),
  &:not([class~="block"]) {
    @apply inline-block;
  }
}
</style>
