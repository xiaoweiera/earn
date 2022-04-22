<script lang="ts" setup>
/**
 * @file 验证码
 * @author svon.me@gmail.com
 */
import API from "src/api/index";
import type { PropType } from "vue";
import { ref } from "vue";
import I18n from "src/utils/i18n";
import { messageError } from "src/lib/tool";
import type { Query } from "src/types/browser/location";
import { ValidateType, maxTimeValue } from "./config";
import type { Language } from "src/types/language/";

const emitEvent = defineEmits(["click"]);

const props = defineProps({
  type: {
    required: true,
    type: String as PropType<ValidateType>,
    default: () => ValidateType.create,
  },
  // 是否发送手机验证码
  mobile: {
    type: Boolean,
    default: () => false,
  },
  before: {
    type: Function,
    default: () => null,
  },
  query: {
    type: Object as PropType<Query>,
    default() {
      return {};
    },
  },
  language: {
    type: String as PropType<Language>,
    default: "",
  },
});

let _timeTask: any;
const times = ref<number>(0);

const countDownTime = function (value: number) {
  clearTimeout(_timeTask);
  times.value = value - 1;
  if (times.value > 0) {
    _timeTask = setTimeout(() => {
      countDownTime(value - 1);
    }, 1000);
  }
};

// 获取验证码
const onSeadCode = async function (value: string | undefined) {
  if (value) {
    countDownTime(maxTimeValue); // 开始倒计时
    const data = Object.assign({}, props.query || {}, {
      token: value,
    });
    try {
      const api = new API();
      let res = {};
      // 发送验证码
      if (props.mobile) {
        res = await api.user.getMobileCaptcha(data, props.type);
      } else {
        res = await api.user.getEmailCaptcha(data, props.type);
      }
      emitEvent("click", { ...res, ...data });
    } catch (e: any) {
      const { message } = e || {};
      if (message) {
        messageError(message);
      } else {
        const i18n = I18n();
        messageError(i18n.apply.tips.error);
      }
      countDownTime(0); // 取消倒计时
      emitEvent("click", { token: "" });
    }
  }
};
</script>

<template>
  <div :class="{ 'validate-active': times > 0 }" class="min-w-10 text-center">
    <span class="time-wrap">{{ times }}s</span>
    <ui-captcha :before="before" :language="language" class="ui-captcha" @click="onSeadCode" />
  </div>
</template>

<style lang="scss" scoped>
.time-wrap {
  @apply hidden;
}

.validate-active {
  .ui-captcha {
    @apply hidden;
  }

  .time-wrap {
    @apply inline-block;
  }
}
</style>
