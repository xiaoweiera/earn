<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";
import { computed } from "vue";
import * as console from "src/plugins/log/";

const props = defineProps({
  sort: {
    type: Boolean,
    default: () => true,
  },
  sortData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  keyName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["change"]);
const sortIcon: any = {
  "desc": "icon-shuangxiangjiantou-down",
  "asc": "icon-shuangxiangjiantou-up",
  "": "icon-shuangxiangjiantou",
};
//icon切换
const getIcon = () => {
  const sortData = props.sortData || {};
  const type = safeGet<string>(sortData, "sort_type");
  const sort_field = safeGet<string>(sortData, "sort_field");
  if (type && sort_field && sort_field === props.keyName) {
    return sortIcon[type];
  }
  return "icon-shuangxiangjiantou";
};
//更改排序
const change = () => {
  console.info("sort");
  if (!props.sort) return;
  if (!props.sortData.sort_type || props.sortData.sort_field !== props.keyName) {
    props.sortData.sort_type = "desc";
  } else if (props.sortData.sort_type === "desc") {
    props.sortData.sort_type = "asc";
  } else {
    props.sortData.sort_type = "";
  }
  props.sortData.sort_field = props.keyName;
  getIcon();
  emit("change");
};
const borderCss = computed(() => (props.keyName === props.sortData.sort_field ? "sort-border" : ""));
</script>
<template>
  <div class="item" :class="sort ? 'hand' : ''" @click="change()">
    <div class="item-content">
      <IconFont v-if="sort" class="relative mr-0.5" size="14" :type="getIcon()" />
      <p>{{ name }}</p>
      <div :class="borderCss" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.item {
  @apply relative w-full h-full flex items-center hand;
}
.item-content {
  @apply w-max relative h-full flex items-center;
}

.sort-border {
  @apply border-1 absolute w-full -bottom-0.5 border-global-primary;
}
</style>
