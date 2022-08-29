<script setup>
import Chain from "src/pages/earn/chains/chain.vue"
import Filter from "src/pages/earn/fiflter/type.vue"
import {chainName, getAddress} from "src/logic/earn/index"
import List from "./list.vue"
import My from "./my.vue"
import { ref,onMounted } from "vue"
const tagType=ref('live')
//关注的地址列表
const addressList=ref([])
const tabList=[
  {name:'ALL',value:'ALL'},
  {name:'Buy',value:'Buy'},
  {name:'Sell',value:'Sell'},
  {name:'Mint',value:'Mint'},
]
const key=ref(0)
const eventType=ref('ALL')
const changeChain=()=>key.value++
const selectTag = (type) =>{
  if(tagType.value===type) return
  tagType.value=type
  addressList.value=getAddress()
  key.value++
}
const tabSubmit=(data)=>{
  eventType.value=data.value
  addressList.value=getAddress()
  key.value++
}
onMounted(()=>{
  addressList.value=getAddress()
})
</script>
<template>
  <div class="px-55 pb-39 huawei-medium">
    <Chain class="mt-6 flex" @submit="changeChain"/>
    <div class="flex items-center mt-6.5">
      <div class="flex flex-1 items-center border-global-hui08 mr-2.5 border-b-1 ">
        <div :class="tagType==='live'?'tag-selected':'tag-default'" class="mr-10 tag" @click="selectTag('live')">
          <span class="mr-1">Live Feeds</span>
          <img class="w-5 h-5 mr-1" src="./public/images/earn/live.png">
          <span class="text-kd16px24px text-global-green03">Live</span>
        </div>
        <div :class="tagType==='follow'?'tag-selected':'tag-default'" class="tag" @click="selectTag('follow')">Followed SmartMoney</div>
      </div>
      <Filter :data="tabList" @submit="tabSubmit"/>
    </div>
    <div v-if="chainName && addressList.length>0" :key="key">
      <div v-if="tagType==='live'">
        <List :addressList="addressList" :eventType="eventType"/>
      </div>
      <div v-else>
        <My :addressList="addressList" :eventType="eventType"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.tag{
  @apply flex items-center h-9;
  @apply text-kd20px28px  cursor-pointer;
}
.tag-selected{
  @apply text-global-hui01;
  border-bottom:2px solid white;
}
.tag-default{
  @apply text-global-hui02;
  border-bottom:2px solid #ffffff00;
}
</style>