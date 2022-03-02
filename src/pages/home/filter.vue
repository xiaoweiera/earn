<script setup lang="ts">
import {ref, computed} from 'vue'
import {useRoute, useRouter} from "vue-router";
import I18n from 'src/utils/i18n/index'
import {ElSelect, ElOption} from 'element-plus';
import {getParam} from "src/utils/router";
import {config as routerConfig} from "src/router/config";

const props = defineProps({
  filters: {
    type: Object as any,
    default: () => {
    },
  },
  info: Object
})
const route = useRoute()
const router = useRouter()
const query = getParam<object>();
const i18n = I18n();
const chain = ref(getParam<object>('chain')?getParam<object>('chain'):'All')
const search = ref(getParam<object>('search'))
const chainData: any = ref([])
const categoryData: any = ref([])
//重组数据
const mergeData = (key: string, data: any) => {
  const list = ['All'].concat(props?.filters[key]?.options)
  list.forEach((item: string) => {
    const param: any = {...query,[key]:item}
    const prop: any = {name: item,[key]:item}
    data.value.push({
      ...prop,
      href: {
        path: routerConfig.homeDetail,
        query: param
      }
    })
  })
}
mergeData('chain', chainData)
mergeData('category', categoryData)
const change = (name: any) => {
  const item = chainData.value.find((item: any) => item.name === name)
  router.push(item.href)
}
const isChain = computed(() => {
  //@ts-ignore
  if (props.info.filters.chain.show && props.info.filters.chain.options.length > 0) {
    return true
  }
})
const isCategory = computed(() => {
  //@ts-ignore
  if (props.info.filters.category.show && props.info.filters.category.options.length > 0) {
    return true
  }
})
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center w-full">
          <div v-if="isCategory" class="is-tab relative">
            <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang whitespace-nowrap mr-4">{{i18n.home.category}}</div>
            <ui-tab class="relative z-22" :list="categoryData" :split="4" active-name="category"></ui-tab>
          </div>
          <IconFont v-if="isCategory && isChain" class="text-global-highTitle text-opacity-10 mx-4 relative top-0.5  h-full" type="icon-gang"/>
          <div v-if="isChain" class="flex items-center">
            <span class="mr-4 text-kd14px18px text-global-highTitle text-opacity-65">{{i18n.home.chain}}</span>
            <client-only class="flex items-center justify-between">
              <el-select @change="change" class="projectMining  flex-1 select" :popper-append-to-body="false" v-model="chain" size="small">
                <el-option v-for="item in chainData" :label="item.name" :value="item.name" :key="item.name"></el-option>
              </el-select>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select {
  ::v-deep(.el-input__inner) {
    border: 1px solid rgba(3, 54, 102, 0.1) !important;
    background: none;
    height: 34px !important;
    padding-left: 12px !important;
    @apply text-kd14px18px md:w-25 text-left    text-global-highTitle text-opacity-85  flex items-center  text-kd14px18px;
  }
}


%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}

.is-tab {
  @apply flex items-center;
}
</style>
