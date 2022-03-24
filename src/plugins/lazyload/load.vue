<script setup lang="ts">
/**
 * @file Loading
 * @auth svon.me@gmail.com
 */
import { uuid } from "src/utils/";
import * as scroll from "src/plugins/browser/scroll";
import { onMounted, ref } from "vue";

defineProps({
  height: {
    type: String,
    default: "100px",
  },
  width: {
    type: String,
    default: "100%",
  },
});

const id = uuid();
const load = ref<boolean>(false);

onMounted(function () {
  scroll.bind(id, function () {
    // todo
  });
});
</script>

<template>
  <client-only>
    <template #load>
      <div :style="{ height: height, width: width }"></div>
    </template>
    <template #default>
      <div v-if="load">
        <slot></slot>
      </div>
    </template>
  </client-only>
</template>
