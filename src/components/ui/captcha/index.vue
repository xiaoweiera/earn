<script setup lang="ts">
/**
 * @file 谷歌人机校验
 * @author svon.me@gmail.com
 */

import {PropType} from "vue";
import {getEnv} from "src/config/";
import {isFunction} from "src/utils";
import I18n from "src/utils/i18n/index";
import safeGet from "@fengqiaogang/safe-get";
import window from "src/plugins/browser/window";


type Callback = () => void

interface GRecaptcha {
  [key: string]: Function
}

const props = defineProps({
  before: {
    type: Function as PropType<Callback>
  },
  value: {
    type: String
  }
});

const emitEvent = defineEmits([ "click" ]);

const execute = async function () {
  const option = {
    action: "submit"
  };
  const env = getEnv();
  try {
    const recaptcha = safeGet<GRecaptcha>(window, "grecaptcha");
    if (recaptcha) {
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
  try {
    if (props.before && isFunction(props.before)) {
      await props.before();
    }
    const recaptcha = safeGet<GRecaptcha>(window, "grecaptcha");
    if (recaptcha) {
      recaptcha.ready(execute);
    }
  } catch (e) {
    // todo
  }
}

const text = function () {
  if (props.value) {
    return props.value;
  }
  const i18n = I18n();
  return i18n.common.message.verification;
}

</script>

<template>
  <div @click="onSendCode">
    <slot>
      <span class="link cursor-pointer">{{ text() }}</span>
    </slot>
  </div>
</template>