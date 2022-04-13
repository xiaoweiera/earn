<script lang="ts" setup>
import I18n from "src/utils/i18n/";
import { isFunction, isString, toBoolean } from "src/utils";
import { copyTxt, messageSuccess } from "src/lib/tool";

const props = defineProps({
  alert: {
    type: Boolean,
    default: () => true,
  },
  message: {
    type: Boolean,
    default: () => false,
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
    if (toBoolean(props.message)) {
      if (copyTxt(content)) {
        const i18n = I18n();
        messageSuccess(i18n.common.message.copyAlert);
      }
    } else {
      copyTxt(content, toBoolean(props.alert));
    }
  }
};
</script>

<template>
  <div class="inline-block" @click.stop.prevent="copy">
    <slot></slot>
  </div>
</template>
