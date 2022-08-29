<script setup>
import { ref,onMounted } from 'vue'
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
onMounted(()=>{
  if(props.data.length>0){
    emit('submit',props.data[0])
  }
})
</script>
<template>
  <div class="flex items-center">
    <template v-for="(item,index) in data">
      <div :class="tab===index?'select-ok':'select-no'" class="tab" @click="selectTab(item,index)">{{item.showName}}</div>
    </template>
  </div>
</template>
<style lang="scss">
.select-ok{
  @apply bg-global-lan04;
}
.select-no{
  @apply bg-global-hui06;
}
.tab{
  @apply cursor-pointer h-8 px-2.5 text-kd14px22px text-global-hui01;
  @apply flex items-center rounded-kd4px w-max;
}
.tab:not(:first-child){
  @apply ml-2;
}
</style>