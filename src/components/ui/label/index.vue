<script lang="ts" setup>
/**
 * @file 标签
 * @auth svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
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
  // icon 名称，value 为对象时生效
  iconName: {
    type: String,
    default: "icon",
  },
  value: {
    type: [Array, String] as PropType<LabelItem[] | string[] | string>,
    default: () => [],
  },
  // value 名称
  nameKey: {
    type: String,
    default: "name",
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
  const array: LabelItem[] = map(function (value: string | LabelItem) {
    if (isObject(value)) {
      if (safeGet<string>(value, props.nameKey)) {
        return value;
      }
      return void 0;
    }
    return {
      icon: props.icon,
      [props.nameKey]: value,
      [props.iconName]: props.icon,
    };
  }, compact(toArray(props.value)));
  const data = compact(array);
  if (props.noSelect) {
    return data.slice(0, 1);
  }
  return data;
});

const onChange = function (data: LabelItem) {
  emitEvent("change", data);
};
</script>

<template>
  <div v-if="size(list) >= 1" class="ui-label rounded bg-global-highTitle bg-opacity-6">
    <label-select :list="list" :name-key="nameKey" :selected="selected" class="flex" @change="onChange">
      <template #default="{ data, arrow }">
        <div v-if="data" class="text-global-highTitle text-opacity-65 py-1 px-2 whitespace-nowrap">
          <div class="flex items-center">
            <!--icon-->
            <slot :data="data" name="prefix">
              <div v-if="data[iconName] || data.icon" class="flex w-4 mr-1">
                <IconFont :type="data[iconName] || data.icon" class="flex" size="16" />
              </div>
            </slot>
            <!--内容-->
            <div class="flex text-global-highTitle text-opacity-85">
              <slot :data="data">
                <label class="text-12-18">
                  <template v-if="copy && size(data[nameKey]) >= 11">{{ encryption(data[nameKey]).value() }}</template>
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
                <v-copy :value="data[nameKey]" message class="flex cursor-pointer">
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
