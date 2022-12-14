<script setup lang="ts">
/**
 * @file 谷歌人机校验
 * @author svon.me@gmail.com
 */
import * as console from "src/plugins/log/";
import type { Language } from "src/types/language";
import type { PropType } from "vue";
import { onBeforeMount } from "vue";
import { getEnv } from "src/config/";
import { isFunction } from "src/utils";
import I18n from "src/utils/i18n/index";
import safeGet from "@fengqiaogang/safe-get";
import window from "src/plugins/browser/window";
import document from "src/plugins/browser/document";

type Callback = () => void;

type GRecaptcha = Record<string, Callback>;

const props = defineProps({
  before: {
    type: Function as PropType<Callback | undefined>,
    default: function () {
      return void 0;
    },
  },
  value: {
    type: String,
    default: "",
  },
  language: {
    type: String as PropType<Language>,
    default: "",
  },
});

const emitEvent = defineEmits(["click"]);

const execute = async function () {
  const option = {
    action: "submit",
  };
  const env = getEnv();
  try {
    const recaptcha = safeGet<GRecaptcha>(window, "grecaptcha");
    if (recaptcha) {
      // @ts-ignore
      const value: string = await recaptcha.execute(env.google.captcha, option);
      emitEvent("click", value);
    } else {
      emitEvent("click", void 0);
    }
  } catch (e) {
    // todo
    emitEvent("click", void 0);
  }
};

const onSendCode = async function (e: Event) {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  console.log("captcha");
  try {
    if (props.before && isFunction(props.before)) {
      await props.before();
    }
    console.info("captcha ready");
    const recaptcha = safeGet<GRecaptcha>(window, "grecaptcha");
    if (recaptcha) {
      // @ts-ignore
      recaptcha.ready(execute);
    } else {
      console.error("no GRecaptcha");
    }
  } catch (ee) {
    emitEvent("click", null);
    console.error("captcha - error");
    console.info(ee);
  }
};

const text = function () {
  if (props.value) {
    return props.value;
  }
  const i18n = I18n(props.language);
  return i18n.common.message.verification;
};

onBeforeMount(() => {
  const env = getEnv();
  // 人机教验
  if (env.google && env.google.captcha) {
    const head = document.querySelector("head");
    const src = `https://www.recaptcha.net/recaptcha/api.js?render=${env.google.captcha}`;
    const script = document.createElement("script");
    script.src = src;
    head.appendChild(script);
  }
});
</script>

<template>
  <span @click="onSendCode">
    <slot>
      <span class="link cursor-pointer">{{ text() }}</span>
    </slot>
  </span>
</template>
