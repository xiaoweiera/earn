<script setup lang="ts">
/**
 * @file 邀请
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
import { routerConfig } from "src/router/config";
import { ElDialog, ElButton } from "element-plus";
import { createHref } from "src/plugins/router/pack";
import I18n from "src/utils/i18n";

const props = defineProps({
  code: {
    type: [String, Number],
    default: "",
  },
});
const i18n = I18n();
const visible = ref<boolean>(false);

const getShareText = () => {
  const text1 = `${i18n.user.share.dec}`;
  const text2 = props.code
    ? routerConfig.common.download({
      code: props.code,
    })
    : routerConfig.common.download();
  return `${text1}
${createHref(text2)}`;
};

const onHidden = () => {
  setTimeout(() => {
    visible.value = false;
  });
  return true;
};
</script>

<template>
  <div>
    <div @click="visible = true">
      <slot></slot>
    </div>
    <el-dialog v-model="visible" :append-to-body="true" custom-class="dialog-user-wrap">
      <template #title>
        <span class="text-16-22 font-m text-global-highTitle">{{ i18n.user.share.title }}</span>
      </template>
      <div class="pt-2.5">
        <div class="bg-global-bg-grey px-4 rounded border border-solid border-global-highTitle border-opacity-4">
          <div class="py-2.5 text-14-18 font-m">
            <p class="text-global-highTitle whitespace-pre-line">{{ getShareText() }}</p>
          </div>
        </div>
        <client-only class="mt-5">
          <v-copy class="w-full" :value="getShareText()">
            <el-button class="w-full" type="primary" size="large" @click="onHidden">复制分享链接</el-button>
          </v-copy>
        </client-only>
      </div>
    </el-dialog>
  </div>
</template>
