<script setup lang="ts">
import {getHeader} from "src/logic/home";
import {onMounted, ref} from "vue";
import safeGet from "@fengqiaogang/safe-get";
const props = defineProps({
  height:{
    type:String,
    default: () =>'h-10.5'
  },
  name:String,
  params: {
    type: Object
  },
  item: {
    type: Object,
    required: true
  }
})
//[headerName,headerCss]
const cssData: any = ref([])
onMounted(() => {
  cssData.value = getHeader(props.item.key,props.name)
})
const sortIcon: any = {
  'desc': 'icon-shuangxiangjiantou-down',
  'asc': 'icon-shuangxiangjiantou-up',
  '': 'icon-shuangxiangjiantou'
}
const getIcon = () => {
  const params = props.params || {};
  const type = safeGet<string>(params, "sort_type");
  const sort_field = safeGet<string>(params, "sort_field");
  if (type && sort_field && sort_field === props.item.key) {
    return sortIcon[type];
  }
  return 'icon-shuangxiangjiantou';
}
</script>
<template>
  <div class="flex items-center" :class="`${cssData[1]} ${height}`">
    <div class="relative h-full flex items-center" :class="item.sort?'hand':''">
      <IconFont v-if="item.sort && params" class="relative mr-1"  size="14" :type="getIcon()"/>
      <span>{{ cssData[0] }}</span>
      <div :class="item.key===params?.sort_field?'sort-border':''"></div>
    </div>

  </div>
</template>
<style scoped lang="scss">
.sort-border{
  @apply border-1 absolute w-full -bottom-0.5 border-global-primary;
}
.sort-border-no{
  @apply border-1 absolute w-full -bottom-0.5 border-global-primary border-global-opacity-0;
}
</style>
