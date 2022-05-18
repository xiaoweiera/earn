<script setup lang="ts">
/**
 * @file 搜索
 * @auth svon.me@gmail.com
 */

import _ from "lodash";
import API from "src/api/";
import Result from "./result.vue";
import I18n from "src/utils/i18n/";
import { ref, onMounted, computed } from "vue";
import DB from "@fengqiaogang/dblist";
import { $ } from "src/plugins/browser/event";
import window from "src/plugins/browser/window";
import { selectItem } from "src/logic/common/search";
import type { SearchItem } from "src/types/search/";
import { onUpdateRef } from "src/utils/ssr/ref";
import { cache } from "src/plugins/cache";
import { uuid, toBoolean } from "src/utils/";
import { createHref } from "src/plugins/router/pack";

const i18n = I18n();

let oldText = "";
const focusStatus = ref<boolean>(false);
const inputValue = ref<string>("");
const active = ref<string | number>("");
const searchList = ref<SearchItem[]>([]);
const domInput = ref<any>(null);

const placeholder = computed<string>(function () {
  return i18n.common.placeholder.search + " DApp/NFT";
});

const _updateRefList = onUpdateRef(searchList, async function (keyword = "") {
  oldText = keyword;
  active.value = "";
  const key = uuid({ keyword });
  const temp = cache.getItem(key);
  if (temp) {
    try {
      return JSON.parse(temp);
    } catch (e) {
      // todo
    }
  }
  const api = new API();
  const value = await api.common.getSearchList(keyword);
  cache.setItem(key, JSON.stringify(value));
  return value;
});

const onUpdate = _.debounce(function (value?: string) {
  return _updateRefList(value);
}, 300);

const onChange = _.debounce(function () {
  const keyword: string = inputValue.value;
  if (keyword && keyword === oldText) {
    return;
  }
  onUpdate(keyword);
}, 100);

const onFocus = function () {
  focusStatus.value = true;
  const $input = $(".search-main input");
  if ($input) {
    $input.focus();
  }
  return onChange();
};

const onBlur = function () {
  focusStatus.value = false;
  searchList.value = [];
  active.value = "";
  oldText = "";
  const $input = $(".search-main input");
  if ($input) {
    $input.blur();
  }
};

const onClear = function () {
  inputValue.value = "";
};

const onSelectItem = function (data: SearchItem): void {
  if (data.id) {
    oldText = data.name;
    inputValue.value = data.name;
    active.value = data.id;
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
      window.open(createHref(item.url));
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
  // 获取默认的搜索数据
  setTimeout(onUpdate);

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
  <div class="search-main relative w-full" :class="{ result: focusStatus }" @click.stop="onFocus">
    <input ref="domInput" v-model="inputValue" class="text-14-18 text-m" :placeholder="placeholder" @input="onChange" @keyup.up="onUp" @keyup.down="onDown" @keyup.enter="onSubmit" @focus="onFocus" @click.stop.prevent />
    <span class="search-icon">
      <span class="flex items-center justify-center w-full h-full">
        <IconFont type="icon-sousuo" size="16" />
      </span>
    </span>
    <span v-show="toBoolean(inputValue)" class="clear-search text-global-highTitle text-opacity-45" @click="onClear">
      <IconFont type="icon-x" size="16" />
    </span>
    <div class="result-list absolute top-full right-0">
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
  transition: all 0.3s;
}

%animation {
  @apply w-full max-w-full h-10.5 rounded-t-kd20px rounded-b-none pr-12;
  & ~ .search-icon {
    @apply right-full h-10.5;
  }
  & ~ .clear-search {
    @apply h-10.5;
  }
  & ~ .result-list {
    @apply w-full;
  }
}

.search-main {
  .search-icon {
    @extend %transition;
    @apply absolute top-0 cursor-pointer transform translate-x-full;
  }
  .clear-search {
    @extend %transition;
    @apply flex hidden items-center justify-center;
    @apply absolute top-0 right-3 cursor-pointer w-6;
  }

  input {
    outline: none;
    @apply placeholder-global-highTitle placeholder-opacity-45;
    @apply pl-8.5 pr-2 w-56 bg-white rounded-2xl ml-auto;
    @extend %transition;

    & ~ .search-icon {
      @apply w-8.5 right-56;
    }
    & ~ .result-list {
      @apply w-56;
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
    @apply max-h-110 invisible overflow-y-auto;
    transition: all 0.3s;

    .result-wrap {
      @apply invisible opacity-40;
      transition: all 0.3s;
    }
  }

  &.result {
    input {
      @extend %animation;
    }
    .clear-search {
      @apply flex;
    }
    .result-list {
      @apply block shadow-md visible z-10012;
      .result-wrap {
        @apply opacity-100 visible;
      }
    }
  }
}
</style>
