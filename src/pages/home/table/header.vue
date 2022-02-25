<script setup lang="ts">
import {getHeader} from "~/logic/home";
import {onMounted, ref} from "vue";
const props = defineProps({
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
  cssData.value = getHeader(props.item.key)
})
const sortIcon: any = {
  'desc': 'icon-shuangxiangjiantou-down',
  'asc': 'icon-shuangxiangjiantou-up',
  '': 'icon-shuangxiangjiantou'
}
const getIcon = () => {
  if (props?.params?.sort_field === props.item.key) {
    return sortIcon[props?.params?.sort_type]
  }
  return 'icon-shuangxiangjiantou'
}
</script>
<template>
  <div class="flex items-center hand" :class="cssData[1]">
    <div class="relative">
      <IconFont v-if="item.sort && params" class="relative top-0.5 mr-1" size="14" :type="getIcon()"/>
      <span>{{ cssData[0] }}</span>
      <div :class="item.key===params?.sort_field?'sort-border':''"></div>
    </div>

  </div>
</template>
<style scoped lang="scss">
.sort-border{
  @apply border-1 absolute w-full -bottom-2.5 border-global-primary;
}
.sort-border-no{
  @apply border-1 absolute w-full -bottom-2.5 border-global-primary border-global-opacity-0;
}
</style>