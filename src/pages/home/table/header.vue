<script setup lang="ts">
import { getHeader } from "src/logic/home";
import { onMounted, ref } from "vue";
import safeGet from "@fengqiaogang/safe-get";
import { oss } from "src/config";
const props = defineProps({
  page: {
    type: String,
    default: "",
  },
  sort: {
    type: Boolean,
    default: true,
  },
  shortIcon: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: () => "h-10.5",
  },
  params: {
    type: Object,
    default: () => {
      return {};
    },
  },
  item: {
    type: Object,
    required: true,
  },
});
// [headerName,headerCss]
const cssData: any = ref([]);
onMounted(() => {
  cssData.value = getHeader(safeGet(props.item, "title"));
});
const sortIcon: any = {
  "desc": "icon-shuangxiangjiantou-down",
  "asc": "icon-shuangxiangjiantou-up",
  "": "icon-shuangxiangjiantou",
};
const getIcon = (item: any) => {
  if (!props.params.sort_field && item.active) {
    return "icon-shuangxiangjiantou-down";
  }
  const params = props.params || {};
  const type = safeGet<string>(params, "sort_type");
  const sort_field = safeGet<string>(params, "sort_field");
  if (type && sort_field && sort_field === safeGet(props.item, "title")) {
    return sortIcon[type];
  }
  return "icon-shuangxiangjiantou";
};
</script>
<template>
  <div class="flex items-center">
    -{{ item.sort }}|
    <div class="relative h-full flex items-center" :class="item.sort && sort ? 'hand' : ''">
      <div v-if="shortIcon">
        <img v-if="item.active" class="w-2 h-1 mr-1 relative -top-0.6" :src="`${oss}/common/sortDown.png`" />
      </div>
      <div v-else class="h-full flex items-center">
        <IconFont v-if="(item.sort && params && sort) || (!params.sort_field && item.active)" class="relative mr-1" size="14" :type="getIcon(item)" />
        <div :class="item.title === params?.sort_field || (!params.sort_field && item.active) ? 'sort-border' : ''" />
      </div>
      <span :class="item.title === params?.sort_field || (item.active && shortIcon) ? 'text-global-primary' : ''">
        <span class="text-global-highTitle text-kd12px16px font-medium font-kdFang">{{ item.title }}d</span>
      </span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sort-border {
  @apply border-1 absolute w-full -bottom-0.5 border-global-primary;
}
.sort-border-no {
  @apply border-1 absolute w-full -bottom-0.5 border-global-primary border-global-opacity-0;
}
</style>
