<script setup lang="ts">
import { uuid } from "src/utils/";
import { ref, onMounted } from "vue";
import I18n from "src/utils/i18n";
import { createRef } from "src/utils/ssr/ref";
import { setScrollTop, scrollTop, bodyHeight, viewHeight, bind } from "src/plugins/browser/scroll";

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

const show = ref(false);
const ideaState = ref(false);

const cancel = () => (ideaState.value = !ideaState.value);

const shareText = function (title: string, keywords: string) {
  return `${title}\n${keywords}`;
};

const uid = uuid();
const topShow = ref<boolean>(false);

const onScrollTop = function () {
  const height = bodyHeight();
  const top = scrollTop();
  const value = height - top - 400;
  topShow.value = value <= viewHeight();
};

onMounted(() => {
  bind(uid, onScrollTop);
  onScrollTop();
});
</script>
<template>
  <div>
    <div class="xshidden relative">
      <div v-if="!show" class="w-11 fixed right-5 bottom-5 lg:bottom-20 z-1999">
        <div class="hidden lg:block">
          <v-router v-if="applyUrl" :href="applyUrl" class="w-full h-9 block" target="_blank">
            <ui-hover class="tool-hover w-full h-full flex items-center justify-center rounded-kd24px tagShadow hand" :append-to-body="false" :offset="32" placement="left">
              <template #label>
                <IconFont class="flex items-center justify-center text-global-highTitle text-opacity-65" size="20" type="icon-shangchuan" />
              </template>
              <template #content>
                <div class="text-kd14px18px text-global-white font-medium font-kdInter">
                  {{ i18n.common.apply }}
                </div>
              </template>
            </ui-hover>
          </v-router>
          <div v-if="isIdea" class="w-full h-9 mt-3.5 hand">
            <ui-hover class="tool-hover w-full h-full flex items-center justify-center rounded-kd24px tagShadow hand" :append-to-body="false" :offset="32" placement="left" @click="cancel()">
              <template #label>
                <IconFont class="flex items-center justify-center text-global-highTitle text-opacity-65" size="20" type="icon-editFix" />
              </template>
              <template #content>
                <div class="text-kd14px18px text-global-white font-medium font-kdInter">{{ i18n.common.idea }}</div>
              </template>
            </ui-hover>
            <div v-if="ideaState" class="fixed z-1005 w-90 right-17 bottom-20 transform -translate-x-4">
              <client-only>
                <UiFeedback class="w-full" @cancel="cancel" />
              </client-only>
            </div>
          </div>
          <!-- 分享 -->
          <div class="w-full h-9 rounded-kd24px mt-3.5 tagShadow hand">
            <ui-share :value="shareText(title, description)" class="w-full h-full block flex items-center justify-center">
              <ui-hover class="tool-hover w-full h-full flex items-center justify-center rounded-kd24px tagShadow hand" :append-to-body="false" :offset="32" placement="left">
                <template #label>
                  <IconFont class="text-global-highTitle text-opacity-65 flex items-center" size="20" type="icon-fenxiang1" />
                </template>
                <template #content>
                  <div class="text-kd14px18px text-global-white font-medium font-kdInter">{{ i18n.dapp.share.label }}</div>
                </template>
              </ui-hover>
            </ui-share>
          </div>
          <div class="w-full h-35 block rounded-kd24px flex flex-col items-center justify-between py-3.5 mt-3.5 tagShadow hand">
            <ui-hover class="telegram-hover w-full h-5 flex items-center justify-center" placement="left" :append-to-body="false" :offset="32">
              <template #label>
                <v-router class="h-5" :href="i18n.chat.telegram" target="_blank">
                  <IconFont class="flex items-center justify-center text-global-primary" size="20" type="icon-telegram" />
                </v-router>
              </template>
              <template #content>
                <div class="w-20 w-fit text-center">
                  <UiQrcode width="80" height="80" href :value="i18n.chat.telegram" />
                </div>
              </template>
            </ui-hover>
            <v-router key="1" class="h-5" :href="i18n.chat.twitter" target="_blank">
              <IconFont class="text-global-primary" size="20" type="icon-twitter" />
            </v-router>
            <v-router class="h-5" :href="i18n.chat.discord" target="_blank">
              <IconFont class="text-global-darkblue" size="20" type="icon-discord2" />
            </v-router>
            <v-router class="h-5" :href="i18n.chat.medium" target="_blank">
              <IconFont class="text-global-darkblue" size="20" type="icon-medium1" />
            </v-router>
          </div>
        </div>
        <div :class="{ invisible: !topShow }" class="w-full h-9 block flex items-center justify-center rounded-kd24px mt-3.5 tagShadow hand" @click="setScrollTop">
          <IconFont class="h-full flex items-center justify-center text-global-highTitle text-opacity-65" size="20" type="icon-fixedBackTop" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.tool-hover {
  ::v-deep(.el-popper) {
    background-color: #111316;
    word-break: keep-all;
    @apply min-w-14 border-0 rounded-kd6px flex items-center justify-center p-2;
    .el-popper__arrow::before {
      background-color: #111316;
      @apply border-0;
    }
  }
}

.telegram-hover {
  ::v-deep(.el-popper) {
    @apply min-w-23 p-1.5;
  }
}

.tagShadow {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1);
  @apply bg-white;
}
</style>
