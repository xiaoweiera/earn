<script lang="ts" setup>
import {computed, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import I18n from 'src/utils/i18n/index'
import {ElOption, ElSelect} from 'element-plus';
import {getParam} from "src/utils/router";
import {config as routerConfig} from "src/router/config";
import safeGet from "@fengqiaogang/safe-get";

const props = defineProps({
  filters: {
    type: Object,
  },
  info: {
    type: Object
  }
})
const route = useRoute()
const router = useRouter()
const query = getParam<object>();
const i18n = I18n();
const chain = ref(getParam<object>('chain') ? getParam<object>('chain') : 'All')
const search = ref(getParam<object>('search'))
const chainData: any = ref([])
const categoryData: any = ref([])
//重组数据
const mergeData = (key: string, data: any) => {
  const list = [ 'All' ];
  const filters = props.filters || {};
  if (safeGet(filters, `${key}.options`)) {
    const value: string[] = [].concat([], safeGet(filters, `${key}.options`));
    list.push(...value);
  }
  list.forEach((item: string) => {
    const param: any = {...query, [key]: item}
    const prop: any = {name: item, [key]: item}
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
const isChain = computed<boolean>(function () {
  const info = props.info || {};
  const show = safeGet(info, "filters.chain.show");
  const options = safeGet<string[]>(info, "filters.chain.options");
  return !!(show && options && options.length > 0);
});
const isCategory = computed<boolean>(function () {
  const info = props.info || {};
  const show = safeGet(info, "filters.category.show");
  const options = safeGet<string[]>(info, "filters.category.options");
  return !!(show && options && options.length > 0);
});
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
          <IconFont v-if="isCategory && isChain"
                    class="text-global-highTitle text-opacity-10 mx-4 relative top-0.5  h-full" type="icon-gang"/>
          <div v-if="isChain" class="flex items-center">
            <span class="mr-4 text-kd14px18px text-global-highTitle text-opacity-65">{{ i18n.home.chain }}</span>
            <client-only class="flex items-center justify-between">
              <el-select v-model="chain" :popper-append-to-body="false" class="projectMining  flex-1 select"
                         size="small" @change="change">
                <el-option v-for="item in chainData" :key="item.name" :label="item.name" :value="item.name"></el-option>
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

.is-tab {
  @apply flex items-center;
}
</style>
