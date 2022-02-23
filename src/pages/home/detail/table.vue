<script setup lang="ts">
import HomeTableHeader from '../table/header.vue'
import HomeTableTd  from '../table/td.vue'
import {ref,onMounted} from 'vue'
import {getParam} from "src/utils/router";
import {createReactive, onLoadReactive} from "~/utils/ssr/ref";
import {detail} from "~/types/home";
import {Model} from "~/logic/home";
const props=defineProps({
  info:Object
})
const type=ref('data')
const id=getParam<string>("id")
const chain=ref(getParam<string>("chain"))
const category=ref(getParam<string>("category"))
const query=ref(getParam<string>("query"))
const params={
  id:id,
  page:1,
  page_size:10,
  chain:chain.value,
  category:category.value,
  query:query.value
}
// onMounted(()=>{
//   type.value=getParam<string>("type") || "data" //data  desc
// })
const data = createReactive<detail>("API.home.getProjects", {} as any);
onMounted(function () {
  const api = new Model();
  const id=getParam<string>('id', '') as string
  // 得到数据汇总
  onLoadReactive(data, () => api.getProjects(params));
});
</script>
<template>
  <div class="table-box">
<!--    <HomeFilter   class="mb-4"/>-->
    <table class="table-my">
      <thead>
      <tr class="h-10">
        <td><div class="text-left w-2">#</div></td>
        <template v-for="(item,index) in data.header" :key="index">
          <td class="text-left" v-if="item.key!=='id'">
            <HomeTableHeader :item="item"/>
          </td>
        </template>
      </tr>
      </thead>
      <tbody>
      <template v-for="(item,index) in data.items">
        <tr class="h-19.5">
          <td class="number"><div class="text-left w-2">{{index+1}}</div></td>
          <template v-for="(itemTwo,index) in data.header" :key="index">
            <td v-if="itemTwo.key!=='id'"><HomeTableTd :info="info" :typeName="itemTwo.key" :data="item"/></td>
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
