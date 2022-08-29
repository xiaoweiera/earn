<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['submit'])
const tab=ref(0)
const selectTab=(data,index)=>{
  tab.value=index
  emit('submit',data)
}
</script>
<template>
  <div class="flex items-center p-1 border-1 w-max rounded-kd8px border-global-hui06">
    <template v-for="(item,index) in data">
      <div :class="tab===index?'select-ok':'select-no'" class="tab" @click="selectTab(item,index)">{{item.name}}</div>
    </template>
  </div>
</template>
<style lang="scss">
.select-ok{
  @apply bg-global-lan04 text-global-hui01;
}
.select-no{
  background-color: #ffffff00;
  @apply text-global-hui02;
}
.tab{
  @apply cursor-pointer h-8 px-2.5 text-kd14px22px ;
  @apply flex items-center rounded-kd4px w-max;
}
.tab:not(:first-child){
  @apply ml-2;
}
</style>