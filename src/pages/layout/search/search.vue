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
import window from "src/plugins/browser/window";
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
  oldText = "";
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
    if (item && item.url) {
      window.open(item.url);
      oldText = "";
      onBlur();
      return;
    }
  }
  // 搜索
  const keyword: string = inputValue.value;
  onUpdate(keyword);
};

onMounted(function () {
  const is = function (dom: HTMLElement, parentSelect: string, isSelect?: string) {
    if (isSelect) {
      if ($(dom).is(isSelect)) {
        return true;
      }
    }
    const $list = $(dom).closest(parentSelect);
    return $list.length > 0;
  };

  $("body").on("click", function (e: Event) {
    const target = e.target;
    if (is(target as HTMLElement, "a", "a")) {
      onBlur();
      return;
    }
    if (is(target as HTMLElement, ".search-main")) {
      onFocus();
    } else {
      onBlur();
    }
  });
});
</script>

<template>
  <div class="search-main relative w-full" :class="{ result: searchList.length > 0 }">
    <input ref="domInput" v-model="inputValue" class="text-14-18 text-m" placeholder="搜索 DApp/NFT" @input="onChange" @keyup.up="onUp" @keyup.down="onDown" @keyup.enter="onSubmit" @focus="onFocus" @click.stop.prevent />
    <span class="search-icon">
      <span class="flex items-center justify-center w-full h-full">
        <IconFont type="icon-sousuo" size="16" />
      </span>
    </span>
    <div class="result-list absolute top-full right-0 left-0">
      <div class="result-wrap">
        <template v-for="(item, index) in searchList" :key="`${index}-${item.key}`">
          <Result v-if="item.children" :name="item.name" :list="item.children" :active="active" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
%transition {
  @apply block h-8.5;
  transition: all 0.2s;
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
    height: auto;
    @apply bg-white rounded-b-kd20px;
    @apply max-h-95 invisible overflow-y-auto;
    transition: all 0.2s;

    .result-wrap {
      @apply invisible opacity-40;
      transition: all 0.3s;
      transition-delay: 0.2s;
    }
  }

  &.result {
    input {
      @extend %animation;
    }

    .result-list {
      @apply block shadow-md visible;
      .result-wrap {
        @apply opacity-100 visible;
      }
    }
  }
}
</style>
