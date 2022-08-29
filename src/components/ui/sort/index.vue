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
  field: {
    type: String,
    default: "",
  },
});
const sortKey = computed<string>(() => (props.keyName ? props.keyName : props.field));

const emit = defineEmits(["change"]);
const sortIcon: any = {
  "desc": "./public/images/earn/down.png",
  "asc": "./public/images/earn/up.png",
  "": "./public/images/earn/order.png",
};
//icon切换
const getIcon = () => {
  const sortData = props.sortData || {};
  const type = safeGet<string>(sortData, "sortType");
  const sortField = safeGet<string>(sortData, "sortField");
  if (type && sortField && sortField === sortKey.value) {
    return sortIcon[type];
  }
  return "./public/images/earn/order.png";
};
//更改排序
const change = () => {
  if (!props.sort) return;
  if (!props.sortData.sortType || props.sortData.sortField !== sortKey.value) {
    props.sortData.sortType = "desc";
  } else if (props.sortData.sortType === "desc") {
    props.sortData.sortType = "asc";
  } else {
    props.sortData.sortType = "";
  }
  props.sortData.sortField = sortKey.value;
  getIcon();
  emit("change", { field: props.sortData.sortField, type: props.sortData.sortType });
};
const borderCss = computed(() => {
  if (sortKey.value === props.sortData.sortField || (props.active && !props.sortData.sortField)) {
    return "sort-border";
  }
  return "";
});
</script>
<template>
  <div class="item h-full" :class="sort ? 'hand' : ''" @click="change()">
    <div class="item-content h-full relative" :class="borderCss">
      <img v-if="sort" class="relative mr-0.5 w-3.5 h-3.5" :src="getIcon()" />
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
