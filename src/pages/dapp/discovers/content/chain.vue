<script lang="ts" setup>
import { ElOption, ElSelect } from "element-plus";
import { useRouter } from "vue-router";
import { getParam } from "src/utils/router";
import { computed, onMounted, ref } from "vue";

// 引入 use state
import { setInject, stateAlias } from "src/utils/use/state";
import _ from "lodash";
import { createHref } from "src/plugins/router/pack";

const props = defineProps({
  title: {
    type: String,
    default: () => "",
  },
  chainData: {
    type: Array,
    default: () => [],
  },
  href: {
    type: String,
    default: () => "",
  },
  name: {
    type: String,
    default: () => "",
  },
});

const router = useRouter();

const routerParam = ref<string>("");

const onChangeParam = setInject(stateAlias.ui.tab);

const allValue = "All";

const list = computed(() => {
  // @ts-ignore
  const array: string[] = props.chainData ? [allValue].concat(props.chainData) : [allValue];
  const data: any[] = [];
  const query = getParam<object>();
  array.forEach((value: string) => {
    data.push({
      value,
      [props.name]: value,
      href: {
        path: props.href,
        query: {
          ...query,
          [props.name]: value,
        },
      },
    });
  });
  return data;
});

onMounted(() => {
  routerParam.value = getParam<string>(props.name) || allValue;
});

const change = _.debounce(async (value: string) => {
  const query = { ...getParam<object>(), [props.name]: value };
  const url = createHref(props.href, query);
  await router.push(url);
  if (onChangeParam) {
    onChangeParam(query);
  }
}, 300);
</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-kd12px16px md:text-14-18 text-global-highTitle text-opacity-65">{{ title }}</div>
      <div class="flex items-center flex-1 w-full md:w-25 h-8 ml-2 md:ml-4">
        <div class="w-full">
          <client-only class="flex items-center justify-between">
            <el-select
              v-model="routerParam"
              :popper-append-to-body="false"
              class="projectMining flex-1 select"
              size="small"
              @change="change"
            >
              <el-option v-for="item in list" :key="item.value" :label="item.value" :value="item.value" />
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
    @apply border-1 border-global-highTitle border-opacity-4 bg-global-white h-8 rounded-md;
    @apply text-kd14px18px w-full md:w-25 text-left text-global-highTitle text-opacity-85 flex items-center text-kd14px18px;
  }
  @screen md {
    ::v-deep(.el-input__inner) {
      @apply border-1 border-global-highTitle border-opacity-4 text-kd14px18px w-25 h-8 pl-3 bg-global-topBg text-left text-global-highTitle text-opacity-85 flex items-center text-kd14px18px;
    }
  }
}
</style>
