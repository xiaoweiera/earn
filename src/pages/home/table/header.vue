<script setup lang="ts">
import {getHeader} from "~/logic/home";
import {onMounted,ref} from "vue";
const props=defineProps({
  item:{
    type:Object,
    required:true
  }
})
//[headerName,headerCss]
const cssData:any=ref([])
onMounted(()=>{
  cssData.value=getHeader(props.item.key)
})
</script>
<template>
  <div :class="cssData[1]">{{cssData[0]}}</div>
</template>