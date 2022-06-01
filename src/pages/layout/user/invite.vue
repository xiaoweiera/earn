<script setup lang="ts">
/**
 * @file 邀请
 * @auth svon.me@gmail.com
 */
import { ref } from "vue";
import { routerConfig } from "src/router/config";
import { ElDialog, ElButton } from "element-plus";
import { createHref } from "src/plugins/router/pack";

const props = defineProps({
  code: {
    type: [String, Number],
    default: "",
  },
});

const visible = ref<boolean>(false);

const getShareText = () => {
  const text1 = "有用才分享，好用才推荐。区块链数据监控分析必备平台，快来和我一起快人一步，遇见财富吧！";
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
        <span class="text-16-22 font-m text-global-highTitle">邀请好友</span>
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
