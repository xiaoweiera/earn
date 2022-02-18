<script setup lang="ts">
/**
 * @file 验证码
 * @author svon.me@gmail.com
 */
import API from "src/api/index";
import {PropType, ref} from "vue";
import I18n from "src/utils/i18n";
import {messageError} from "src/lib/tool";
import { Query } from "src/types/browser/location";
import {ValidateType, maxTimeValue} from "./config";

const props = defineProps({
  type: {
    required: true,
    type: String as PropType<ValidateType>,
    default: () => ValidateType.create,
  },
  before: {
    type: Function
  },
  query: {
    type: Object as PropType<Query>,
    default () {
      return {};
    }
  }
});


let _timeTask: any;
const times = ref<number>(0);

const countDownTime = function (value: number) {
  clearTimeout(_timeTask);
  times.value = value - 1;
  if (times.value > 0) {
    _timeTask = setTimeout(function () {
      countDownTime(value - 1);
    }, 1000);
  }
}

// 获取验证码
const onSeadCode = async function (value: string | undefined) {
  if (value) {
    countDownTime(maxTimeValue); // 开始倒计时
    const data = Object.assign({}, props.query || {}, {
      token: value,
    });
    try {
      const api = new API();
      // 发送验证码
      await api.user.getEmailCaptcha(data, props.type);
    } catch (e: any) {
      const { message } = e || {};
      if (message) {
        messageError(message);
      } else {
        const i18n = I18n();
        messageError(i18n.apply.tips.error);
      }
      countDownTime(0); // 取消倒计时
    }
  }
};

</script>

<template>
  <div class="min-w-10 text-center">
    <span v-if="times > 0">{{times}}s</span>
    <ui-captcha v-else  @click="onSeadCode" :before="before"/>
  </div>
</template>