<script setup lang="ts">
/**
 * @file 分页器
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import type { PropType } from "vue";
import { onMounted } from "vue";
import { size, isArray, toInteger } from "src/utils";
import { Pagination, PageSkin } from "src/logic/ui/pagination";

const props = defineProps({
  // 请求逻辑
  request: {
    type: Function,
    required: true,
  },
  showLoading: {
    type: Boolean,
    default: () => true,
  },
  // 加载更多按钮提示语
  nextMore: {
    type: String,
    default: "",
  },
  // 每页数据条数
  limit: {
    type: Number,
    default: () => 20,
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  initValue: {
    type: Array,
    default: () => [],
  },
  skin: {
    type: String as PropType<PageSkin>,
    default: () => PageSkin.more,
  },
});

const emitEvent = defineEmits(["change"]);

const { list, page, loading, next, empty, handleData } = Pagination(props as any);

/**
 * @获取分页所需参数
 * @param page 当前页码
 */
const getQuery = function (page: number) {
  return {
    page,
    page_size: props.limit,
    pageSize: props.limit,
    limit: props.limit,
    ...props.data,
  };
};

const getData = async function (query: object) {
  if (props.request) {
    loading.value = true;
    try {
      const result = await props.request(query);
      const data = handleData(result);
      if (next.value) {
        let value = toInteger(safeGet<number>(query, "page"));
        if (value < 1) {
          value = 1;
        }
        page.value = value;
      }
      return emitEvent("change", [list.value, data]);
    } catch (e) {
      loading.value = false;
    }
  }
  return emitEvent("change", [[], []]);
};

const onPrev = function () {
  const value = page.value - 1;
  if (value >= 1) {
    return getData(getQuery(value));
  }
};

const onNext = function () {
  if (next) {
    const value = page.value + 1;
    return getData(getQuery(value));
  }
};

let initFlat = true;

if (props.initValue) {
  if (props.initValue && isArray(props.initValue) && size(props.initValue) > 0) {
    initFlat = false;
    const value = handleData(props.initValue);
    emitEvent("change", [list.value, value]);
  }
}

onMounted(() => {
  if (initFlat && size(list.value) < 1) {
    onNext();
  }
});
</script>

<template>
  <div class="min-h-100 ui-pagination auto-h">
    <div v-if="empty">
      <slot name="empty">
        <ui-empty />
      </slot>
    </div>
    <div v-else>
      <div>
        <ui-spin :loading="showLoading && loading">
          <slot :list="list" />
        </ui-spin>
      </div>
      <div v-if="request" class="page-more clearfix">
        <!-- 分页模式 -->
        <div v-if="skin === PageSkin.pagination" class="mt-3 h-9 flex items-center justify-center">
          <a :class="{ disable: page <= 1 }" class="px-3 py-2 flex items-center link" @click="onPrev">
            <IconFont type="icon-leftNo" size="16" />
            <span class="ml-1 text-14-18">上一页</span>
          </a>
          <a :class="{ disable: !next }" class="ml-6 px-3 py-2 flex items-center link" @click="onNext">
            <span class="mr-1 text-14-18">下一页</span>
            <IconFont type="icon-rightNo" size="16" />
          </a>
        </div>
        <!--无限模式-->
        <template v-else>
          <div v-show="next" class="mtt-3 text-center">
            <ui-button-more :value="nextMore" :request="onNext" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
