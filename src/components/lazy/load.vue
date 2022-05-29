<script setup lang="ts">
/**
 * @file Loading
 * @auth svon.me@gmail.com
 */
import { uuid } from "src/utils/";
import * as scroll from "src/plugins/browser/scroll";
import { onMounted, ref, getCurrentInstance } from "vue";
import document from "src/plugins/browser/document";

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
const instance = getCurrentInstance();

const getCurlRect = function () {
  const vNode = instance?.vnode;
  if (vNode) {
    const node = vNode.el as HTMLDivElement;
    return node.getBoundingClientRect();
  }
};

const unbind = function () {
  // 删除事件
  scroll.unbind(id);
};
const app = function () {
  const rect = getCurlRect();
  if (rect) {
    const height = document.documentElement.clientHeight;
    const top = rect.y - 100;
    if (top < height) {
      load.value = true;
      unbind();
    }
  } else {
    unbind();
  }
};

onMounted(function () {
  // 绑定事件
  scroll.bind(id, app);
  setTimeout(app);
});
</script>

<template>
  <client-only>
    <div v-if="load">
      <slot></slot>
    </div>
    <div v-else :style="{ height: height, width: width }">
      <div class="invisible">&nbsp;</div>
    </div>
  </client-only>
</template>
