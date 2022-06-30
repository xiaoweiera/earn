<script lang="ts" setup>
import { PropType, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import I18n from "src/utils/i18n/index";
import { ElOption, ElSelect } from "element-plus";
import { getParam } from "src/utils/router";
import { topicDetail } from "src/types/home";

const props = defineProps({
  filters: {
    type: Object,
    default: () => {
      return {};
    },
  },
  info: {
    type: Object as PropType<topicDetail>,
    default: () => {
      return {};
    },
  },
});
const router = useRouter();
const route = useRoute();
const query = getParam<object>();
const i18n = I18n();
const chain = ref(getParam<object>("chain") ? getParam<object>("chain") : "All");
const platform = ref(getParam<object>("platform") ? getParam<object>("platform") : "All");
const chainData: any = ref([]);
const categoryData: any = ref([]);
const platformData: any = ref([]);
// 重组数据
const mergeData = (key: string, data: any, origin: string[]) => {
  const list = ["All"];
  if (origin && origin.length > 0) {
    list.push(...origin);
  }
  list.forEach((item: string) => {
    const param: any = { ...query, [key]: item };
    const prop: any = { name: item, [key]: item };
    data.value.push({
      ...prop,
      href: {
        path: `${route.path}`,
        query: param,
      },
    });
  });
};
mergeData("chain", chainData, props.info?.extra.available_chains);
mergeData("category", categoryData, props.info?.extra.available_categories);
mergeData("platform", platformData, props.info?.extra.available_platforms);

const changeChain = (name: string) => {
  const item = chainData.value.find((item: any) => item.name === name);
  router.push(item.href);
};
const changePlatform = (name: string) => {
  const item = platformData.value.find((item: any) => item.name === name);
  router.push(item.href);
};
</script>
<template>
  <div>
    <div class="flex items-center flex-wrap">
      <div class="flex items-center flex-wrap justify-between w-full">
        <div class="flex items-center w-full">
          <div v-if="info.category_filter_supported" class="is-tab relative mr-2">
            <div class="text-kd14px18px text-global-highTitle text-opacity-65 font-kdFang whitespace-nowrap mr-4">
              {{ i18n.home.category }}
            </div>
            <ui-tab class="relative z-22" :list="categoryData" :split="3" active-name="category" />
          </div>
          <div v-if="info.chain_filter_supported" class="flex items-center mr-4 flex-wrap">
            <span class="mr-4 text-kd14px18px text-global-highTitle text-opacity-65">{{ i18n.home.chain }}</span>
            <client-only class="flex items-center justify-between">
              <el-select v-model="chain" :popper-append-to-body="false" class="projectMining flex-1 select" size="small" @change="changeChain">
                <el-option v-for="item in chainData" :key="item.name" :label="item.name" :value="item.name" />
              </el-select>
            </client-only>
          </div>
          <div v-if="info.platform_filter_supported" class="flex items-center">
            <span class="mr-4 text-kd14px18px text-global-highTitle text-opacity-65">{{ i18n.home.platform }}</span>
            <client-only class="flex items-center justify-between">
              <el-select v-model="platform" :popper-append-to-body="false" class="projectMining flex-1 select" size="small" @change="changePlatform">
                <el-option v-for="item in platformData" :key="item.name" :label="item.name" :value="item.name" />
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
    box-shadow: none;
    background: #fafbfc;
    height: 34px !important;
    padding-left: 12px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px md:w-25 text-left  text-global-highTitle  flex items-center  text-kd14px18px;
  }
}

.is-tab {
  @apply flex items-center;
  ::v-deep(.tab-wrap) {
    @apply items-center flex;
    .tab-item {
      @apply flex px-3   min-h-8.5 max-h-8.5  rounded-md;
      &:after {
        @apply h-0;
      }

      &:not(a) {
        &:not([href]) {
          @apply cursor-pointer ml-4;
        }
      }

      &:not(:first-child) {
        @apply ml-4;
      }
    }

    span {
      @apply text-kd14px18px font-medium font-kdFang;
    }

    .active {
      @apply flex max-h-8 bg-global-darkblue bg-opacity-6 rounded-md;
    }
  }
}
</style>
