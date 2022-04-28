<script setup lang="ts">
/**
 * @file 提示
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { copyTxt } from "src/lib/tool";
import { ref } from "vue";

const props = defineProps({
  id: {
    type: [Number, String],
    default() {
      return "";
    },
  },
  status: {
    type: Boolean,
  },
});
const i18n = I18n();
const messageValue = function (): string {
  return i18n.template(i18n.apply.tips.message, {
    id: props.id,
  });
};

const confirmStatus = ref<boolean>(true);
const onHideConfirm = function () {
  confirmStatus.value = false;
  if (props.id) {
    copyTxt(messageValue());
  }
};
</script>

<template>
  <div v-if="status">
    <ui-dialog-confirm-tip v-if="id" customClass="342px" :show="confirmStatus" type="message" :button-text="i18n.common.button.share" :content="messageValue()" :tip="i18n.apply.tips.title" @close="onHideConfirm" />
    <ui-dialog-confirm-tip v-else customClass="342px" :show="confirmStatus" type="message" :button-text="i18n.apply.tips.confirm" :content="i18n.apply.tips.content" :tip="i18n.apply.tips.title" @close="onHideConfirm" />
  </div>
</template>
