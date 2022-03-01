<script lang="ts" setup>
import {ElOption, ElSelect} from 'element-plus';
import {useRoute, useRouter} from "vue-router";
import {getParam} from "src/utils/router";
import I18n from "src/utils/i18n";
import {ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: () => '',
  },
  chainData: {
    type: Array as any,
    default: () => {
    },
  },
  href: {
    type: String,
    default: () => '',
  },
  name: {
    type: String,
    default: () => '',
  }
})
const route = useRoute();
const router = useRouter();
const query = getParam<object>();
const chainDatas: any = ref([]);
const routerParam = ref(getParam<object>(props.name))
const i18n = I18n();
//重组数据
const mergeData = (key: string, data: any) => {
  const list = [ 'All' ].concat(props?.chainData)
  list.forEach((item: string) => {
    const param: any = {...query,[key]:item}
    const prop: any = {name: item,[key]:item}
    data.value.push({
      ...prop,
      href: {
        path: props.href,
        query: param
      }
    })
  })
}
mergeData(props.name, chainDatas)
const change = (name: any) => {
  const item = chainDatas.value.find((item: any) => item.name === name)
  router.push(item.href)
}
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-kd12px16px md:text-14-18 text-global-highTitle text-opacity-65">{{ title }}</div>
      <div class="flex items-center flex-1 w-full md:w-25 h-8 ml-2 md:ml-4">
        <div class="w-full">
          <client-only class="flex items-center justify-between">
            <el-select v-model="routerParam" :popper-append-to-body="false" class="projectMining  flex-1 select"
                       size="small" @change="change">
              <el-option v-for="item in chainDatas" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.select {
  ::v-deep(.el-input__inner) {
    @apply bg-global-white h-8 rounded-md border border-global-highTitle border-opacity-6;
    @apply text-kd14px18px w-full md:w-25 text-left text-global-highTitle text-opacity-85 flex items-center text-kd14px18px;
  }
  @screen md {
    ::v-deep(.el-input__inner) {
      border: 1px solid rgba(3, 54, 102, 0.1) !important;
      background: none;
      height: 34px !important;
      padding-left: 12px !important;
      @apply text-kd14px18px md:w-25 text-left text-global-highTitle text-opacity-85 flex items-center text-kd14px18px;
    }
  }
}
</style>
