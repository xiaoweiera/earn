<script setup lang="ts">
/**
 * @file 二维码
 * @author svon.me@gmail.com
 */
import QrCode from "qrcode";
import { toNumber } from "src/utils";
import { createHref } from "src/plugins/router/pack";
import { getCurrentInstance, onMounted, watch } from "vue";

const instance = getCurrentInstance()

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  href: {
    type: Boolean,
    default: () => false
  },
  width: {
    type: [Number, String],
    required: true
  },
  height: {
    type: [Number, String],
    required: true
  },
  border: {
    type: Boolean,
    default: () => false
  }
})

const getContent = function() {
  const vNode = instance?.vnode
  if (vNode) {
    const dom: HTMLDivElement = vNode.el as any;
    return dom.querySelector("canvas");
  }
  return null;
}

const draw = function() {
  const dom = getContent()
  if (dom) {
    const value = props.href ? createHref(props.value) : props.value
    QrCode.toCanvas(dom, value, {
      margin: 0,
      // @ts-ignore
      width: props.border ? toNumber(props.width) - 8 : props.width,
      height: props.border ? toNumber(props.height) - 8 : props.height,
    })
  }
}

onMounted(function () {
  draw();
  watch(props, draw);
});

</script>

<template>
  <div class="inline-block" :class="{'border': border}">
    <canvas></canvas>
  </div>
</template>

<style scoped lang="scss">
.border {
  padding: 3px;
  @apply border-solid border-global-highTitle border-opacity-10;
}
</style>



