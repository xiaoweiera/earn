<script setup lang="ts">
/**
 * @file 搜索结果
 * @auth svon.me@gmail.com
 */

import { ref } from "vue";
import I18n from "src/utils/i18n/";
import { toArray } from "src/utils/";
import type { PropType } from "vue";
import type { SearchItem } from "src/types/search/";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  list: {
    type: Array as PropType<SearchItem[]>,
    default: () => [],
  },
  active: {
    type: [String, Number],
    default: "",
  },
});
const i18n = I18n();
const showAll = ref<boolean>(false);

const onShowMore = function () {
  showAll.value = true;
};

const isShow = function (index: number): boolean {
  const list = toArray(props.list);
  if (list.length <= 6 || index < 3) {
    return true;
  }
  return showAll.value;
};
</script>

<template>
  <div class="py-3 border-t border-global-highTitle border-opacity-6">
    <div v-if="name" class="px-3 pb-2">
      <h5 class="text-14-18 font-m text-global-highTitle text-opacity-45" v-text="name"></h5>
    </div>
    <ul v-if="list.length > 0">
      <template v-for="(data, index) in list" :key="index">
        <li v-if="isShow(index)" :class="{ active: data.id === active }" :data-id="data.id">
          <v-router class="px-3 block" :href="data.url" target="_blank">
            <div class="flex items-center p-2 result-content rounded-lg">
              <template v-if="data.logo">
                <IconFont :type="data.logo" size="24" class="mr-1.5" />
              </template>
              <span v-else class="block w-6 h-6 mr-1.5">
                <ui-image class="w-full h-full" :rounded="true" />
              </span>
              <span class="block flex-1 truncate">
                <span class="text-14-18 font-m">{{ data.name }}</span>
              </span>
            </div>
          </v-router>
        </li>
      </template>
      <li v-if="list.length > 6 && !showAll">
        <div class="px-3">
          <a class="p-2 inline-block link cursor-pointer text-12-16 font-m" @click="onShowMore">
            <span>{{ i18n.part(i18n.common.button.expandMore, list.length - 3, { size: list.length - 3 }) }}</span>
          </a>
        </div>
      </li>
    </ul>
    <div v-else class="py-4">
      <div class="w-25 h-30 mx-auto">
        <ui-image class="w-full h-full" :oss="true" src="/static/images/search-empty.png" fit="contain" />
      </div>
      <p class="mt-4 text-global-highTitle text-opacity-45 text-center">
        <span class="text-14-18">暂无搜索内容，换个关键词吧~</span>
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
li {
  &:hover,
  &.active {
    .result-content {
      @apply bg-global-highTitle bg-opacity-4;
    }
  }
}
</style>
