<script setup lang="ts">
/**
 * @file 分页器
 * @author svon.me@gmail.com
 */

import {ref, onMounted } from "vue";
import { size, toArray } from "src/utils";

const props = defineProps({
  // 请求逻辑
  request: {
    type: Function,
    required: true,
  },
  showLoading: {
    type: Boolean,
    default: () => true
  },
  // 加载更多按钮提示语
  nextMore: {
    type: String,
  },
  // 每页数据条数
  limit: {
    type: Number,
    default: () => 20
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  },
  initValue: {
    type: Array,
    default: () => []
  },
});

const emitEvent = defineEmits(['change']);

const list = ref<any[]>(props.initValue); // 数据集合
const page = ref<number>(size(props.initValue) > 0 ? 2 : 1); // 当前页码
const loading = ref<boolean>(true); // 是否为加载中
const next = ref<boolean>(false); // 是否有下一页数据
const empty = ref<boolean>(false); // 是否为空数据

const onNext = async function () {
  const query = Object.assign({}, {
    page: page.value,
    page_size: props.limit,
    pageSize: props.limit,
    limit: props.limit,
  }, props.data);
  if (props.request) {
    loading.value = true;
    const result = await Promise.resolve(props.request(query));
    const array = toArray(result || []);
    // 判断是否有下一页
    if (size(array) < props.limit) {
      next.value = false;
    } else {
      page.value = page.value + 1;
      next.value = true;
    }
    if (size(array) > 0) {
      list.value = toArray(list.value, array);
    }
    // 判断数据是否为空
    if (query.page <= 1 && size(list.value) < 1) {
      empty.value = true;
    } else {
      empty.value = false;
    }
    loading.value = false;
    return emitEvent("change", [list.value, array]);
  }
  return emitEvent("change", [[], []]);
}

onMounted(onNext);

</script>

<template>
  <div class="min-h-100 ui-pagination auto-h">
    <!-- 如果数据为空 -->
    <div v-if="empty">
      <slot name="empty">
        <ui-empty/>
      </slot>
    </div>
    <div v-else>
      <div>
        <ui-spin :loading="showLoading && loading">
          <slot :list="list"></slot>
        </ui-spin>
      </div>
      <div class="page-more" v-if="request">
        <div class="pt-3 text-center" v-show="next">
          <ui-button-more :value="nextMore" :request="onNext"/>
        </div>
      </div>
    </div>
  </div>
</template>



