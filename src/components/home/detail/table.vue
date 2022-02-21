<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {getParam} from "src/utils/router";
const props=defineProps({
  filter:Boolean
})
const type=ref('')
const data={
  header: [
    { name: 'Dapp Name', key: 'nameProject' },//nameProject
    { name: 'MCap/Change', key: 'salePrice' },
    { name: 'Ended in(UTC)', key: 'token' },
    { name: 'ATH Since IDO', key: 'supply' },
    { name: 'Current ROI USD', key: 'endedIn' }
  ],
  list: [
    { name: '老王', macap:1923,change:156.12,end:'jan 20th,2002',ath:888888,current:156.12 },
    { name: '老白', macap:923,change:12.12,end:'jan 11th,2002',ath:554,current:46.12 },
    { name: '老李', macap:423,change:322.12,end:'fa 20th,2002',ath:33,current:16.12 },
    { name: '老哥', macap:2923,change:64.12,end:'jan 20th,2002',ath:323232332,current:176.12 },
    { name: '老李', macap:423,change:322.12,end:'fa 20th,2002',ath:33,current:16.12 },
  ]
}
onMounted(()=>{
  type.value=getParam<string>("type") || "data" //data  desc
})
</script>
<template>
  <div class="table-box">
    <HomeFilter   class="mb-4"/>
    <table class="table-my">
      <thead>
      <tr class="h-10">
        <td class="header-td thead-hr">#</td>
        <template v-for="(item,index) in data.header">
          <td v-if="(type==='desc' && index<3) || type==='data'" :class="item.key.indexOf('name')>=0?'text-left':'text-center'" class="thead-hr text-left">{{item.name}}</td>
        </template>
      </tr>
      </thead>
      <tbody>
      <template v-for="(item,index) in data.header">
        <tr :class="1===1?'h-19.5':'h-14'">
          <td :class="type==='data'?'':'pr-3'" class="number"><div class="flex">{{index+1}}</div></td>
          <td><HomeTableTd  :type="type" :typeName="data.header[0].key"/></td>
          <td><HomeTableTd  :type="type" :typeName="data.header[1].key"/></td>
          <td><HomeTableTd  :type="type" :typeName="data.header[2].key"/></td>
          <template v-if="type==='data'">
            <td><HomeTableTd  :type="type" :typeName="data.header[3].key"/></td>
            <td><HomeTableTd  :type="type" :typeName="data.header[4].key"/></td>
          </template>
        </tr>
      </template>
      </tbody>
    </table>
    <div class="more">加载更多</div>
  </div>
</template>
<style scoped lang="scss">
.title{
  @apply text-kd18px24px font-medium font-kdFang text-global-highTitle;
}
.more{
  @apply text-global-primary;
}
.gang{
  border:1px solid rgba(3, 54, 102, 0.06);
  @apply mt-5;
}
.thead-hr{
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}
thead td,.number{
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}
tbody td{
  @apply text-center text-kd14px18px text-global-highTitle;
}
.table-box{
  @apply  w-full  bg-global-white rounded-kd16px;
}
.table-my{
  @apply w-full bg-opacity-0  rounded-kd6px;
}
.more{
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}
</style>
