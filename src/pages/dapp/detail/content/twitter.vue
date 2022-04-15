<script lang="ts" setup>
/**
 * @file DApp twitter
 * @auth svon.me@gmail.com
 */

import { ref } from "vue";

defineProps({
  name: {
    type: String,
    default: "",
  },
});

const error = ref<boolean>(false);
const loading = ref<boolean>(true);

const getUrl = function (name: string) {
  return `/content/twitter.html?text=${name}`;
};

const onLoad = function () {
  setTimeout(() => {
    loading.value = false;
  }, 1000 * 2);
};
const onError = function () {
  error.value = true;
};
</script>

<template>
  <div>
    <div v-if="name && !error" class="relative">
      <iframe :src="getUrl(name)" allowfullscreen="" class="h-200 w-full rounded-md border border-solid border-global-highTitle border-opacity-6" frameborder="0" @load="onLoad" @error="onError"></iframe>
      <div v-show="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <IconFont size="32" suffix="png" type="loading" />
      </div>
    </div>
    <ui-empty v-else></ui-empty>
  </div>
</template>
