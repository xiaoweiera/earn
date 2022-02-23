<script setup lang="ts">
import HomeTableTd  from './td.vue'
import HomeTableHeader from './header.vue'
import {ref} from 'vue'

const props=defineProps({
  data:Object
})

</script>
<template>
    <div class="table-box bg-global-white  border-1">
      <div class="flex items-center justify-between">
        <span class="title">{{data.name}}</span>
        <span class="more cursor-pointer">more > </span>
      </div>
      <div class="gang"></div>
      <table class="table-my">
        <thead>
        <tr class="h-5">
          <td><div class="text-left w-7">#</div></td>
          <template v-for="(item,index) in data.table.header" :key="index">
            <td class="text-left" v-if="item.key!=='id'">
              <HomeTableHeader :item="item"/>
            </td>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in data.table.items" :key="index">
          <tr class="h-11.5">
            <td class="number">
            <div class=" text-left w-7">{{index+1}}</div>
            </td>
            <template v-for="(itemTwo,index) in data.table.header" :key="index">
              <td v-if="itemTwo.key!=='id'"><HomeTableTd :typeName="itemTwo.key" :data="item"/></td>
            </template>
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
