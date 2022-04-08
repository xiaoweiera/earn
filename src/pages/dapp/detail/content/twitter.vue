<script lang="ts" setup>
/**
 * @file DApp twitter
 * @auth svon.me@gmail.com
 */
defineProps({
  name: {
    type: String,
    default: "",
  },
});

const getUrl = function (name: string) {
  return `/content/twitter.html?text=${name}`;
};
</script>

<template>
  <div>
    <div v-if="name">
      <iframe :src="getUrl(name)" allowfullscreen="" class="h-200 w-full rounded-md border border-solid border-global-highTitle border-opacity-6" frameborder="0"></iframe>
    </div>
    <ui-empty v-else></ui-empty>
  </div>
</template>
