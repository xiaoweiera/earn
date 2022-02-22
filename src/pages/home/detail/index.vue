<script setup lang="ts">
import HomeDetailInfo  from './info.vue'
import HomeDetailTable  from './table.vue'
import HomeDetailTop  from './top.vue'
import HomeDetailTopic  from './topic.vue'
import {onMounted, ref} from 'vue'
const props=defineProps({
  type:String,
  filter:Boolean
})
onMounted(()=>{
  console.log('aaaa1111,2121')
})
</script>
<template>
  <div class="max-w-360 py-8 pb-30 px-20 mx-auto  flex justify-between">
    <div class="max-w-243">
      <HomeDetailInfo/>
      <HomeDetailTable class="mt-6" :type="type" :filter="filter"/>
    </div>
    <div class="w-65">
      <HomeDetailTop/>
      <HomeDetailTopic class="mt-6"/>
    </div>
  </div>
</template>
