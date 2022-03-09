<script setup lang="ts">
/**
 * @file 分页器
 * @author svon.me@gmail.com
 */

import { onMounted } from "vue";
import { size } from "src/utils";
import { Pagination } from "src/logic/ui/pagination";

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
});

const emitEvent = defineEmits(["change"]);

const { list, page, loading, next, empty, handleData } = Pagination(props as any);

const onNext = async function() {
  const query = Object.assign({}, {
    page: page.value,
    page_size: props.limit,
    pageSize: props.limit,
    limit: props.limit,
  }, props.data);
  if (props.request) {
    loading.value = true;
    try {
      const result = await props.request(query);
      const value = handleData(result);
      return emitEvent("change", [list.value, value]);
    } catch (e) {
      loading.value = false;
    }
  }
  return emitEvent("change", [[], []]);
};

let initFlat = true;

if (props.initValue) {
  if (props.initValue && size(props.initValue) > 0) {
    initFlat = false;
    handleData(props.initValue);
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
      <div v-if="request" class="page-more">
        <div v-show="next" class="pt-3 text-center">
          <ui-button-more :value="nextMore" :request="onNext" />
        </div>
      </div>
    </div>
  </div>
</template>
