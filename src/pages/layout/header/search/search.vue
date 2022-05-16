<script setup lang="ts">
/**
 * @file 搜索
 * @auth svon.me@gmail.com
 */
import Result from "./result.vue";
</script>

<template>
  <div class="search-main relative w-full">
    <input class="text-14-18 text-m" placeholder="搜索 DApp/NFT" />
    <span class="search-icon">
      <span class="flex items-center justify-center w-full h-full">
        <IconFont type="icon-sousuo" size="16" />
      </span>
    </span>
    <div class="result-list absolute top-full left-0 right-0 hidden">
      <Result />
    </div>
  </div>
</template>

<style scoped lang="scss">
%transition {
  @apply block h-8.5;
  transition: all 0.3s;
}
%animation {
  @apply w-full max-w-full h-10.5;
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
    @apply bg-white rounded-b-2xl;
  }

  &.result {
    input {
      @extend %animation;
      @apply rounded-b-none;
    }
    .result-list {
      @apply block shadow-md;
    }
  }
}
</style>
