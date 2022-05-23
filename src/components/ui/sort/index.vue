<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";
import { computed } from "vue";

const props = defineProps({
  sort: {
    type: Boolean,
    default: () => false,
  },
  active: {
    type: Boolean,
    default: () => false,
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
const sortKey = computed<string>(() => (props.keyName ? props.keyName : props.name));

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
  const sortField = safeGet<string>(sortData, "sort_field");
  if (type && sortField && sortField === sortKey.value) {
    return sortIcon[type];
  }
  return "icon-shuangxiangjiantou";
};
//更改排序
const change = () => {
  if (!props.sort) return;
  if (!props.sortData.sort_type || props.sortData.sort_field !== sortKey.value) {
    props.sortData.sort_type = "desc";
  } else if (props.sortData.sort_type === "desc") {
    props.sortData.sort_type = "asc";
  } else {
    props.sortData.sort_type = "";
  }
  props.sortData.sort_field = sortKey.value;
  getIcon();
  emit("change");
};
const borderCss = computed(() => {
  if (sortKey.value === props.sortData.sort_field || (props.active && !props.sortData.sort_field)) {
    return "sort-border";
  }
  return "";
});
</script>
<template>
  <div class="item h-full" :class="sort ? 'hand' : ''" @click="change()">
    <div class="item-content h-full relative" :class="borderCss">
      <IconFont v-if="sort" class="relative mr-0.5" size="14" :type="getIcon()" />
      <p class="h-full flex items-center">{{ name }}</p>
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

.sort-border::after {
  border: 1px solid #006ff7;
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
