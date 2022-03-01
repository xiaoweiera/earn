<script setup lang="ts">
import HomeTableHeader from '../table/header.vue'
import HomeTableTd from '../table/td.vue'
import HomeFilter from "../filter.vue"
import {ref, onMounted, PropType, watch, reactive} from 'vue'
import {ElSelect, ElOption, ElInput} from 'element-plus';
import {useRoute, useRouter} from "vue-router";
import {getParam} from "src/utils/router";
import {createReactive, onLoadReactive} from "src/utils/ssr/ref";
import {detail} from "src/types/home";
import {Model} from "src/logic/home";
import {config as routerConfig} from "src/router/config";
import I18n from "src/utils/i18n";

const props = defineProps({
  info: Object as PropType<detail>
})
const i18n = I18n();
const route = useRoute()
const router = useRouter()
const id = getParam<string>("id")
const chain = ref(getParam<string>("chain"))
const category = ref(getParam<string>("category"))
const query = ref(getParam<string>("search"))
const params = reactive({
  id: id,
  page: 1,
  page_size: 10,
  chain: chain.value,
  category: category.value,
  query: query.value,
  sort_field: '',
  sort_type: '',//desc asc
})
const resultNumber = ref(params.page_size)
const loading = ref(false)
const key = ref(0)

const api = new Model();
watch(route, (n) => {
  const query: any = getParam<string>()
  params.chain = query.chain
  params.category = query.category
  key.value++
  getData(true)
})
//搜索
const search = ref(getParam<object>('search'))
watch(search, (n: any) => {
  const query: any = getParam<object>();
  params.query = n
  router.push({
    path: routerConfig.homeDetail,
    query: {
      ...query,
      //@ts-ignore
      search: n
    }
  })
})
const data: any = createReactive<detail>("API.home.getProjects", {} as any);
//得到表格数据
const getData = async (clear?: boolean) => {
  loading.value = true
  const res: any = await api.getProjects(params)
  if (clear) {
    params.page = 1
    data.items = []
  }
  resultNumber.value = res?.items?.length
  data.items = data.items.concat(res.items)
  loading.value = false
}
//more
const more = () => {
  params.page++
  getData()
}
const isSearch = ref(false)
onMounted(function () {
  // 得到数据汇总
  onLoadReactive(data, () => api.getProjects(params));
});
//排序
const sort = (key: string) => {
  if (!params.sort_type || params.sort_field !== key) {
    params.sort_type = 'desc'
  } else if (params.sort_type === 'desc') {
    params.sort_type = 'asc'
  } else {
    params.sort_type = ''
  }
  params.sort_field = key
  getData(true)
}
//是否有筛选
const isFilter = () => {
  //@ts-ignore
  if (props.info.filters.chain.show && props.info.filters.chain.options.length > 0) {
    return true
    //@ts-ignore
  } else if (props.info.filters.category.show && props.info.filters.category.options.length > 0) {
    return true
    //@ts-ignore
  } else if (props.info.filters?.search?.show && props.info.filters?.search?.options.length > 0) {
    return true
  }
  return false
}
</script>
<template>
  <div class="table-box md:mb-0 mb-4">
    <div class="flex xshidden justify-between items-baseline">
      <HomeFilter :key="key" v-if="info.id && isFilter()" :info="info" :filters="info.filters" class="mb-4"/>
      <client-only>
        <div v-if="isSearch" class="relative flex items-center search">
          <IconFont class="absolute text-global-highTitle text-opacity-45 left-3" size="16" type="icon-sousuo-da1"/>
          <el-input v-model="search" placeholder="Search"/>
        </div>
      </client-only>
    </div>
    <div class="showX">
      <table class="table-my min-w-243">
        <thead>
        <tr class="min-h-10">
          <td class="h-full border-tb">
            <div class="text-left  w-5">#</div>
          </td>
          <template v-for="(item,index) in data.header" :key="index">
            <td class="text-left border-tb" v-if="item.key!=='id'">
              <HomeTableHeader @click="sort(item.key)" :params="params" :item="item"/>
            </td>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item,index) in data.items">
          <tr class="min-h-12.5 h-12.5 md:min-h19.5 md:h-19.5">
            <td class="number">
              <div class="text-left  w-5">{{ index + 1 }}</div>
            </td>
            <template v-for="(itemTwo,index) in data.header" :key="index">
              <td v-if="itemTwo.key!=='id'">
                <HomeTableTd :info="info" :typeName="itemTwo.key" :data="item"/>
              </td>
            </template>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <div v-if="data?.items?.length>0 && resultNumber>=params.page_size" @click="more" class="more">{{i18n.home.loadingMore}}</div>
    <UiLoading v-if="loading" class="fixed top-0 bottom-0 left-0 right-0"/>
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

.border-tb {
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

.title {
  @apply text-kd18px24px font-medium font-kdFang text-global-highTitle;
}

.gang {
  border: 1px solid rgba(3, 54, 102, 0.06);
  @apply mt-5;
}

.thead-hr {
  @apply border-t-1 border-b-1 border-global-highTitle border-opacity-6;
}

thead td, .number {
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}

tbody td {
  @apply text-center text-kd14px18px text-global-highTitle;
}

.table-box {
  @apply w-full  bg-global-white rounded-kd16px;
}

.table-my {
  @apply w-full bg-opacity-0  rounded-kd6px;
}

.more {
  @apply w-30 h-8 flex items-center justify-center mx-auto w-fit cursor-pointer rounded-kd6px;
  @apply text-kd14px18px font-medium font-kdFang text-global-primary;
  @apply bg-global-primary bg-opacity-6;
}
</style>
