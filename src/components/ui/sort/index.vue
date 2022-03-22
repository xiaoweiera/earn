<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";
import {computed} from 'vue'

const props = defineProps({
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
  }
});
const emit = defineEmits(['change'])
const sortIcon: any = {
  desc: "icon-shuangxiangjiantou-down",
  asc: "icon-shuangxiangjiantou-up",
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
  if (!props.sortData.sort_type || props.sortData.sort_field !== props.keyName) {
    props.sortData.sort_type = "desc";
  } else if (props.sortData.sort_type === "desc") {
    props.sortData.sort_type = "asc";
  } else {
    props.sortData.sort_type = "";
  }
  props.sortData.sort_field = props.keyName;
  getIcon()
  emit('change')
};
const borderCss = computed(() => props.keyName === props.sortData.sort_field ? 'sort-border' : '')
</script>
<template>
  <div @click="change" class="item hand">
    <div class="item-content">
      <IconFont class="relative mr-0.5" size="14" :type="getIcon()"/>
      <p>{{ name }}</p>
      <div :class="borderCss"/>
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
  @apply absolute w-full -bottom-0.5 border-global-primary;
}
</style>