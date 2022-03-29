<script setup lang="ts">
/**
 * @file
 * @auth svon.me@gmail.com
 */

import window from "src/plugins/browser/window";
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  // 跳转链接
  href: {
    type: [String, Object],
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  // icon 大小
  size: {
    type: Number,
    default: 36,
  },
});

const link = ref<string>("");

const shareLink = computed(function () {
  const query = [];
  if (props.text) {
    query.push(`text=${props.text}`);
  }
  query.push(`url=${link.value}`);
  return `https://twitter.com/share?${query.join("&")}`;
});

onMounted(function () {
  link.value = props.href || window.location.href;
});
</script>

<template>
  <v-router :href="shareLink" target="_blank">
    <slot>
      <IconFont bright :size="size" type="twitter" />
    </slot>
  </v-router>
</template>
