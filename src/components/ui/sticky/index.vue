<script setup lang="ts">
/**
 * @file 吸顶特效
 * @author svon.me@gmail.com
 */
import { toInteger, uuid } from "src/utils";
import * as scroll from "src/plugins/browser/scroll";
import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  // 触发吸顶时激活样式
  activeClass: {
    type: String,
    required: false,
    default: "",
  },
});

const key = uuid();
const stickyRef = ref<any>(null);
const active = ref<string>("");

const getDom = function () {
  if (stickyRef.value && stickyRef.value) {
    const dom = stickyRef.value;
    if (dom && dom.getBoundingClientRect) {
      return dom;
    }
  }
};

const isActive = function () {
  const dom = getDom();
  if (dom) {
    const rect = dom.getBoundingClientRect();
    const y = toInteger(rect.y);
    const top = toInteger(getComputedStyle(dom).top);
    if (y > top) {
      active.value = "";
    } else {
      active.value = props.activeClass;
    }
  } else {
    if (active.value) {
      active.value = "";
    }
  }
};

onMounted(() => {
  if (props.activeClass) {
    scroll.bind(key, isActive);
    setTimeout(isActive);
  }
});

onBeforeUnmount(() => {
  scroll.unbind(key);
});
</script>

<template>
  <div ref="stickyRef" class="sticky top-header" :class="active">
    <slot />
  </div>
</template>
