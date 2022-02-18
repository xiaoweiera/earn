<script setup lang="ts">
import {ref} from 'vue'
const props=defineProps({
  type:String,
  filter:Boolean
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
