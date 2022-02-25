<script setup lang="ts">
import HomeTableModel from './model.vue'
import {ref} from 'vue'
const props = defineProps({
  topicIndex: [String, Number],
  data: Object
})
const id=ref(0)
const changeTopic=(index:number)=>id.value=index

</script>
<template>
  <div class="md:w-150 w-full  md:min-h-86 md:py-3  relative">
    <div class="bg xshidden"></div>
    <div class="relative md:min-h-86 md:bg-global-white rounded-kd16px">
      <template v-for="(item,index) in data" :key="item.id">
        <HomeTableModel class="xshidden h-full  md:absolute top-0" :class="topicIndex===index?'active':'active-no'" :data="item"/>
        <HomeTableModel v-if="index===id" class="h-full mdhidden" :class="id===index?'block':'hidden'" :data="item"/>
      </template>
    </div>
    <!--手机端翻页-->
    <div class="mdhidden flex items-center justify-center mt-4">
      <template v-for="(item,index) in data">
        <div  @click="changeTopic(index)" class="dian hand" :class="id===index?'yuan':'yuan-no'"></div>
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bg {
  @apply w-138 mx-auto h-full absolute left-0 right-0   top-0 bg-global-white bg-opacity-45 rounded-kd16px;
}
.table-box {
  @apply w-full h-full bg-global-white rounded-kd16px;
}
.yuan{
  @apply w-2 h-2 bg-global-white rounded-full;
}
.yuan-no{
  @apply w-2 h-2 bg-global-white bg-opacity-45 rounded-full;
}
.dian:not(:first-child){
  @apply ml-6;
}
.active {
  transition: all 1s;
  opacity: 1;
  z-index: 2;
}

.active-no {
  transition: all 1s;
  opacity: 0;
  z-index: 1;
}

.table-default {
  @apply h-full z-11 absolute top-0;
}
</style>
