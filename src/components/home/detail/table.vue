<script setup lang="ts">
import {ref} from 'vue'
const data={
  header: [
    { name: 'Dapp Name', key: 'nameDes' },//nameProject
    { name: 'MCap/Change', key: 'salePrice' },
    { name: 'Ended in(UTC)', key: 'token' },
    // { name: 'ATH Since IDO', key: 'supply' },
    // { name: 'Current ROI USD', key: 'endedIn' }
  ],
  list: [
    { name: '老王', macap:1923,change:156.12,end:'jan 20th,2002',ath:888888,current:156.12 },
    { name: '老白', macap:923,change:12.12,end:'jan 11th,2002',ath:554,current:46.12 },
    { name: '老李', macap:423,change:322.12,end:'fa 20th,2002',ath:33,current:16.12 },
    { name: '老哥', macap:2923,change:64.12,end:'jan 20th,2002',ath:323232332,current:176.12 },
    { name: '老李', macap:423,change:322.12,end:'fa 20th,2002',ath:33,current:16.12 },
  ]
}
</script>
<template>
  <div class="table-box">
    <table class="table-my">
      <thead>
      <tr class="h-10">
        <td class="header-td thead-hr">#</td>
        <template v-for="item in data.header">
          <td :class="item.key.indexOf('name')>=0?'text-left':'text-center'" class="thead-hr">{{item.name}}</td>
        </template>
      </tr>
      </thead>
      <tbody>
      <template v-for="(item,index) in data.header">
        <tr :class="1===1?'h-19.5':'h-14'">
          <td class="number pr-2.5">{{index}}</td>
          <td><HomeTableTd :typeName="data.header[0].key"/></td>
          <td><HomeTableTd :typeName="data.header[1].key"/></td>
          <td><HomeTableTd :typeName="data.header[2].key"/></td>
        </tr>
      </template>
      </tbody>
    </table>
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
  border-collapse:separate;border-spacing: 0px 0px;
  @apply w-full bg-opacity-0 -mx-2.5 rounded-kd6px;
}
</style>
