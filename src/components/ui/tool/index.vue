<script setup lang="ts">
import { ref, computed } from "vue";
import { ElPopover } from "element-plus";
import document from "src/plugins/browser/document";
import I18n from "src/utils/i18n";
import { createRef } from "src/utils/ssr/ref";

const i18n = I18n();

defineProps({
  applyUrl: {
    type: String,
    default: "", //申请收入地址
  },
  isIdea: {
    type: Boolean,
    default: false,
  },
});

const title = createRef<string>("title", {} as any);
const description = createRef<string>("description", {} as any);

const current = computed(() => {
  return i18n.getLang();
});

const show = ref(false);
const ideaState = ref(false);
const back = () => {
  if (document.body) {
    document.body.scrollTop = 0;
  }
  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }
};
const cancel = () => (ideaState.value = !ideaState.value);

const shareText = function (title: string, keywords: string) {
  return `${title}\n${keywords}`;
};
</script>
<template>
  <div>
    <div class="xshidden relative">
      <div v-if="!show" class="w-12 fixed right-5 bottom-5 lg:bottom-20 z-1999">
        <div class="hidden lg:block">
          <v-router v-if="applyUrl" :href="applyUrl" class="w-full block text-center rounded-kd4px py-3 tagShadow hand" target="_blank">
            <IconFont class="text-global-highTitle text-opacity-65" size="20" type="icon-shangchuan" />
            <div :class="current === 'cn' ? ' w-6 ' : ''" class="text-12-14 text-global-highTitle text-opacity-65 mx-auto">
              {{ i18n.common.apply }}
            </div>
          </v-router>
          <div v-if="isIdea" class="w-full rounded-kd4px py-3 mt-3 tagShadow hand">
            <div v-if="ideaState" class="fixed z-1005 w-90 right-17 bottom-20 transform -translate-x-4">
              <client-only>
                <UiFeedback class="w-full" @cancel="cancel" />
              </client-only>
            </div>
            <div class="text-center" @click="cancel()">
              <IconFont class="text-global-highTitle text-opacity-65" size="20" type="icon-editFix" />
              <div :class="current === 'cn' ? ' w-6 ' : ''" class="text-12-14 text-global-highTitle text-opacity-65 mx-auto">
                {{ i18n.common.idea }}
              </div>
            </div>
          </div>
          <!-- 分享 -->
          <div class="w-full rounded-kd4px py-3 mt-3 tagShadow hand">
            <ui-share :value="shareText(title, description)" class="w-full block text-center rounded-kd4px hand">
              <IconFont class="text-global-highTitle text-opacity-65" size="20" type="icon-fenxiang1" />
              <div class="text-12-14 text-global-highTitle text-opacity-65">{{ i18n.dapp.share.label }}</div>
            </ui-share>
          </div>
          <div class="w-full block rounded-kd4px flex flex-col items-center justify-between py-3 mt-3 tagShadow hand">
            <v-router :href="i18n.chat.medium" target="_blank">
              <IconFont class="text-global-primary" size="26" type="medium" />
            </v-router>
            <v-router :href="i18n.chat.discord" target="_blank">
              <IconFont class="text-global-primary" size="28" type="discord" />
            </v-router>
            <el-popover placement="left" :width="50" trigger="hover" :append-to-body="false">
              <template #reference>
                <v-router :href="i18n.chat.telegram" target="_blank">
                  <IconFont class="text-global-primary" size="24" type="icon-telegram" />
                </v-router>
              </template>
              <div class="w-20 w-fit text-center">
                <UiQrcode width="80" height="80" href :value="i18n.chat.telegram" />
              </div>
            </el-popover>
            <v-router key="1" :href="i18n.chat.twitter" target="_blank">
              <IconFont class="text-global-primary" size="24" type="icon-twitter" />
            </v-router>
          </div>
        </div>
        <div class="w-full block border-1 text-center rounded-kd4px pt-3 pb-1 mt-3 tagShadow hand" @click="back">
          <IconFont class="text-global-highTitle text-opacity-65" size="24" type="icon-fixedBackTop" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
::v-deep(.el-popover.el-popper.is-light) {
  min-width: 105px !important;
}
.tagShadow {
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  @apply bg-white;
}
</style>
