<script setup lang="ts">
/**
 * @file DApp twitter
 * @auth svon.me@gmail.com
 */
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const src = computed(function () {
  return `/content/twitter.html?text=${props.name}`;
});
</script>

<template>
  <div>
    <iframe class="h-200 w-full rounded-md border border-solid border-global-highTitle border-opacity-6" frameborder="0" allowfullscreen="" :src="src"></iframe>
  </div>
</template>
