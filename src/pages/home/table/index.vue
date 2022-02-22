<script setup lang="ts">
import HomeTableModel  from './model.vue'
import {ref} from 'vue'
const props=defineProps({
  topicIndex:[String,Number],
  data:Object
})
// const data={
//   header: [
//     { name: 'Dapp Name', key: 'name' },
//     { name: 'MCap/Change', key: 'mcap-change' },
//     { name: 'Ended in(UTC)', key: 'ended-in' },
//     { name: 'ATH Since IDO', key: 'ath-since-ido' },
//     { name: 'Current ROI USD', key: 'current-roi-usd' }
//   ],
//   list: [
//     { name: '老王', macap:1923,change:156.12,end:'jan 20th,2002',ath:888888,current:156.12 },
//     { name: '老白', macap:923,change:12.12,end:'jan 11th,2002',ath:554,current:46.12 },
//     { name: '老李', macap:423,change:322.12,end:'fa 20th,2002',ath:33,current:16.12 },
//     { name: '老哥', macap:2923,change:64.12,end:'jan 20th,2002',ath:323232332,current:176.12 },
//     { name: '老李', macap:423,change:322.12,end:'fa 20th,2002',ath:33,current:16.12 },
//   ]
// }
// const data2={
//   header: [
//     { name: 'Dapp Name', key: 'nameProject' },
//     { name: 'MCap/Change', key: 'mcap-change' },
//     { name: 'Ended in(UTC)', key: 'ended-in' },
//     { name: 'ATH Since IDO', key: 'ath-since-ido' },
//     { name: 'Current ROI USD', key: 'current-roi-usd' }
//   ],
//   list: [
//     { name: '老哈', macap:123,change:16.12,end:'n 20th,2002',ath:888888,current:156.12 },
//     { name: '老夏', macap:1223,change:12.12,end:'jan 11th,2002',ath:554,current:46.12 },
//     { name: '老洞', macap:23,change:2.12,end:'fa 20th,2002',ath:33,current:16.12 },
//     { name: '老白', macap:223,change:64.12,end:'jan 20th,2002',ath:323232332,current:176.12 },
//     { name: '老嗷嗷', macap:1423,change:322.12,end:'fa 20th,2002',ath:33,current:16.12 },
//   ]
// }

</script>
<template>
  <div class="min-w-150 min-h-86 py-3  relative">
    <div class="bg"></div>
    <div class="relative  min-h-86 bg-global-white rounded-kd16px">
      <template v-for="(item,index) in data">
              <HomeTableModel  class="h-full z-11 absolute top-0" :class="topicIndex===index?'active':'active-no'" :data="item"/>
      </template>
<!--      <HomeTableModel  class="h-full z-11 absolute top-0" :class="topicIndex===0?'active':'active-no'" :data="data" title="🚀 DeFi Daily Active User (24H)"/>-->
<!--      <HomeTableModel  class="h-full z-11 absolute top-0" :class="topicIndex===1?'active':'active-no'" :data="data2" title="🚀 NFT is Beautiful"/>-->
    </div>
  </div>
</template>
<style scoped lang="scss">
.bg{
  @apply w-138 mx-auto h-full absolute left-0 right-0   top-0 bg-global-white bg-opacity-45 rounded-kd16px;
}
.table-box{
  @apply w-full h-full bg-global-white rounded-kd16px;
}
.active{
  transition: all 1.2s;
  opacity:1;
}
.active-no{
  transition: all 1.2s;
  opacity: 0;
}
.table-default{
  @apply h-full z-11 absolute top-0;
}
</style>
