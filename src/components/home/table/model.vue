<script setup lang="ts">
import {ref} from 'vue'
const data={
  header: [
    { name: 'Dapp Name', key: 'name' },
    { name: 'MCap/Change', key: 'mcap-change' },
    { name: 'Ended in(UTC)', key: 'ended-in' },
    { name: 'ATH Since IDO', key: 'ath-since-ido' },
    { name: 'Current ROI USD', key: 'current-roi-usd' }
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
      <div class="flex items-center justify-between">
        <span class="title">🚀 DeFi Daily Active User (24H)</span>
        <span class="more">more > </span>
      </div>
      <div class="gang"></div>
      <table class="w-full bg-opacity-0 rounded-kd6px" style="border-collapse:separate;  border-spacing:0px 20px;">
        <thead>
        <tr>
          <td class="header-td">#</td>
          <template v-for="item in data.header">
            <td>{{item.name}}</td>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in data.list">
          <tr class="h-6.5">
            <td class="number">{{index}}</td>
            <td>{{item.name}}</td>
            <td>{{item.macap}}</td>
            <td>{{item.end}}</td>
            <td>{{item.ath}}</td>
            <td>{{item.current}}</td>
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
thead td,.number{
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}
tbody td{
  @apply text-center text-kd14px18px text-global-highTitle;
}

.table-box{
  @apply p-4 w-full h-full bg-global-white rounded-kd16px;
}
</style>
