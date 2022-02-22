<script setup lang="ts">
import HomeTableTd  from './td.vue'
import {ref} from 'vue'
const props=defineProps({
  data:Object,
  title:String
})

</script>
<template>
    <div class="table-box bg-global-white  border-1">
      <div class="flex items-center justify-between">
        <span class="title">{{title}}</span>
        <span class="more">more > </span>
      </div>
      <div class="gang"></div>
      <table class="table-my">
        <thead>
        <tr class="h-5">
          <td class="header-td">#</td>
          <template v-for="item in data.header">
            <td>{{item.name}}</td>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in data.header">
          <tr class="h-11.5">
            <td class="number pr-2">{{index}}</td>
            <td><HomeTableTd :typeName="data.header[0].key"/></td>
            <td>{{data.list[index].macap}}</td>
            <td>{{data.list[index].end}}</td>
            <td>{{data.list[index].ath}}</td>
            <td>{{data.list[index].current}}</td>
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
  @apply my-5;
}
thead td,.number{
  @apply text-kd12px16px text-global-highTitle text-opacity-45 text-center;
}
tbody td{
  @apply text-center text-kd14px18px text-global-highTitle;
}

.table-box{
  @apply p-4 w-full h-full bg-global-white rounded-kd16px;
}
.table-my{
  //border-collapse:separate;  border-spacing:0px 0px;
  @apply w-full bg-opacity-0 rounded-kd6px;
}
</style>
