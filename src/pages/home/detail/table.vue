<script setup lang="ts">
import HomeTableHeader from '../table/header.vue'
import HomeTableTd  from '../table/td.vue'
import HomeFilter from "../filter.vue"
import {ref, onMounted, PropType,watch} from 'vue'
import {ElSelect, ElOption, ElInput} from 'element-plus';
import {useRoute,useRouter} from "vue-router";
import {getParam} from "src/utils/router";
import {createReactive, onLoadReactive} from "~/utils/ssr/ref";
import {detail} from "~/types/home";
import {Model} from "~/logic/home";
import {config as routerConfig} from "~/router/config";
const props=defineProps({
  info:Object as PropType<detail>
})
const route=useRoute()
const router=useRouter()
const key=ref(0)
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
watch(route,(n)=>{
  key.value++
})
const data = createReactive<detail>("API.home.getProjects", {} as any);
onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadReactive(data, () => api.getProjects(params));
});
const search = ref(getParam<object>('search'))
watch(search, (n) => {
  const query = getParam<object>();
  router.push({
    path: routerConfig.homeDetail,
    query: {
      ...query,
      //@ts-ignore
      search: n
    }
  })
})
</script>
<template>
  <div class="table-box">
    <div class="flex justify-between items-baseline">
      <HomeFilter :key="key" v-if="info.id" :info="info" :filters="info.filters"   class="mb-4"/>
      <client-only>
        <div class="relative flex items-center search">
          <IconFont class="absolute text-global-highTitle text-opacity-45 left-3" size="16" type="icon-sousuo-da1"/>
          <el-input v-model="search" placeholder="Search"/>
        </div>
      </client-only>
    </div>

    <table class="table-my">
      <thead>
      <tr class="h-10">
        <td><div class="text-left w-4">#</div></td>
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
          <td class="number"><div class="text-left w-4">{{index+1}}</div></td>
          <template v-for="(itemTwo,index) in data.header" :key="index">
            <td v-if="itemTwo.key!=='id'"><HomeTableTd :info="info" :typeName="itemTwo.key" :data="item"/></td>
          </template>
        </tr>
      </template>
      </tbody>
    </table>
<!--    <div class="more">加载更多</div>-->
  </div>
</template>
<style scoped lang="scss">
.search {
  ::v-deep(.el-input__inner) {
    border: 1px solid rgba(3, 54, 102, 0.1) !important;
    background: none;
    height: 34px !important;
    padding-left: 35px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-50 text-left    text-global-highTitle text-opacity-85  flex items-center  text-kd14px18px;
  }
}

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
