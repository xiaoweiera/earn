<script setup lang="ts">
/**
 * @file 搜索结果
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
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
    <ul>
      <template v-for="(data, index) in list" :key="index">
        <li v-show="isShow(index)" :class="{ active: data.id === active }">
          <v-router class="px-3 block">
            <div class="flex items-center p-2 result-content rounded-lg">
              <IconFont :type="data.icon" size="24" class="mr-1.5" />
              <span class="block flex-1">
                <span class="text-14-18 font-m">{{ data.name }}</span>
              </span>
            </div>
          </v-router>
        </li>
      </template>
      <li v-if="list.length > 6 && !showAll">
        <div class="px-3">
          <a class="p-2 inline-block link cursor-pointer" @click="onShowMore">
            <span>展开更多 ({{ list.length - 3 }})</span>
          </a>
        </div>
      </li>
    </ul>
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
