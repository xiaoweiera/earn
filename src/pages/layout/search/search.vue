<script setup lang="ts">
/**
 * @file 搜索
 * @auth svon.me@gmail.com
 */

import API from "src/api/";
import Result from "./result.vue";
import { ref, onMounted } from "vue";
import DB from "@fengqiaogang/dblist";
import { $ } from "src/plugins/browser/event";
import { selectItem } from "src/logic/common/search";
import type { SearchItem } from "src/types/search/";
import { onUpdateRef } from "src/utils/ssr/ref";

let oldText = "";
const inputValue = ref<string>("");
const active = ref<string | number>("");
const searchList = ref<SearchItem[]>([]);
const domInput = ref<any>(null);

const onUpdate = onUpdateRef(searchList, async function (keyword = "") {
  oldText = keyword;
  active.value = "";
  const api = new API();
  return api.common.getSearchList(keyword);
});

const onChange = function (): void {
  const keyword: string = inputValue.value;
  if (keyword && keyword === oldText) {
    return;
  }
  onUpdate(keyword);
};

const onFocus = function () {
  const $input = $(".search-main input");
  if ($input) {
    $input.focus();
  }
  return onChange();
};

const onBlur = function () {
  searchList.value = [];
  active.value = "";
  const $input = $(".search-main input");
  if ($input) {
    $input.blur();
  }
};

const onSelectItem = function (data: SearchItem): void {
  if (data.id) {
    active.value = data.id;
    oldText = data.name;
    inputValue.value = data.name;
  }
};

const onUp = function () {
  const data = selectItem(searchList.value, active.value, -1);
  onSelectItem(data);
};

const onDown = function () {
  const data = selectItem(searchList.value, active.value, 1);
  onSelectItem(data);
};

// 确认事件
const onSubmit = function () {
  // 如果当前有选中项
  if (active.value) {
    // 获取选中的对象
    const db = new DB([]);
    db.insert(db.flatten(searchList.value));
    const item = db.selectOne<SearchItem>({ id: active.value });
    if (item) {
      alert(`你选中的是${item.name}`);
      oldText = "";
      inputValue.value = "";
      onBlur();
      return;
    }
  }
  // 搜索
  const keyword: string = inputValue.value;
  onUpdate(keyword);
};

onMounted(function () {
  $("body").on("click", function (e: Event) {
    const target = e.target;
    const $search = $(target).closest(".search-main");
    if ($search.length > 0) {
      onFocus();
    } else {
      onBlur();
    }
  });
});
</script>

<template>
  <div class="search-main relative w-full" :class="{ result: searchList.length > 0 }" @click.prevent.stop="onFocus">
    <input ref="domInput" v-model="inputValue" class="text-14-18 text-m" placeholder="搜索 DApp/NFT" @input="onChange" @keyup.up="onUp" @keyup.down="onDown" @keyup.enter="onSubmit" @focus="onFocus" @click.stop.prevent />
    <span class="search-icon">
      <span class="flex items-center justify-center w-full h-full">
        <IconFont type="icon-sousuo" size="16" />
      </span>
    </span>
    <div class="result-list absolute top-full left-0 right-0">
      <template v-for="(item, index) in searchList" :key="`${index}-${item.key}`">
        <Result v-if="item.children" :name="item.name" :list="item.children" :active="active" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
%transition {
  @apply block h-8.5;
  transition: all 0.3s;
}

%animation {
  @apply w-full max-w-full h-10.5 rounded-t-kd20px rounded-b-none;
  & ~ .search-icon {
    @apply right-full h-10.5;
  }
}

.search-main {
  .search-icon {
    @extend %transition;
    @apply absolute top-0 cursor-pointer transform translate-x-full;
  }

  input {
    outline: none;
    @apply placeholder-global-highTitle placeholder-opacity-45;
    @apply pl-8.5 pr-2 w-56 bg-white rounded-2xl ml-auto;
    @extend %transition;

    & ~ .search-icon {
      @apply w-8.5 right-56;
    }

    &:hover,
    &:focus,
    &:active {
      @apply border-none;
    }

    &:focus {
      @extend %animation;
    }
  }

  .result-list {
    @apply bg-white rounded-b-kd20px;
    height: 0;
    visibility: hidden;
    opacity: 0;
    transition: visibility, opacity 0.3s;
    transition-delay: 0.3s;
    overflow: hidden;
  }

  &.result {
    input {
      @extend %animation;
    }

    .result-list {
      @apply block shadow-md;
      visibility: visible;
      opacity: 1;
      height: auto;
      overflow-y: auto;
      max-height: 380px;
    }
  }
}
</style>
