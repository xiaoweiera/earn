<script setup lang="ts">
import { isFunction, isString, toBoolean } from "src/utils";
import { copyTxt } from "src/lib/tool";

const props = defineProps({
  message: {
    type: Boolean,
    default: () => true,
  },
  value: {
    type: [Function, String],
    default: "",
  },
});

const copy = async function () {
  let content = "";
  if (isString(props.value)) {
    content = `${props.value}`;
  } else if (isFunction(props.value)) {
    try {
      // @ts-ignore
      content = await props.value();
    } catch (e) {
      // todo
    }
  }
  if (content) {
    copyTxt(content, toBoolean(props.message));
  }
};
</script>

<template>
  <div class="inline-block" @click.stop.prevent="copy">
    <slot></slot>
  </div>
</template>
