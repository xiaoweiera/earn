<script lang="ts" setup>
/**
 * @file 下载
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import Hover from "src/pages/layout/footer/hover.vue";
import type { Invite } from "src/types/common/activity";
import type { PropType } from "vue";
import { computed } from "vue";

const props = defineProps({
  detail: {
    required: true,
    type: Object as PropType<Invite>,
  },
});

const env = getEnv();
const i18n = computed(function () {
  return I18n(props.detail.language);
});

const getLinkUrl = function (type: string, id?: string | number): string | object {
  if (id) {
    const i18n = I18n(props.detail.language);
    const query = {
      lang: i18n.getLang(),
      utm_source: `activity_${id}_${type}`,
    };
    return {
      query,
      path: env.appDownload,
    };
  }
  return env.appDownload;
};
</script>

<template>
  <div class="border border-solid border-global-highTitle border-opacity-10 text-center">
    <div class="md:flex text-14-22 text-global-highTitle text-opacity-45 p-6">
      <div class="md:flex-1 w-full md:w-1 pb-8 md:pb-0">
        <p>{{ i18n.activity.prize.title }}</p>
        <div class="mt-4 flex justify-center">
          <ui-share-circle :text="detail.name" />
        </div>
      </div>
      <div class="md:flex-1 w-full md:w-1 pt-8 md:pt-0 border-t md:border-0 md:border-l border-solid border-global-highTitle border-opacity-10">
        <p>{{ i18n.activity.download.title }}</p>
        <div class="mt-4 flex items-center justify-center">
          <Hover :click="true" :desc="i18n.menu.hover.app" :href="getLinkUrl('ios', detail.id)">
            <ui-image :src="`${env.VITE_oss}/common/download_apple.jpg`" class="block w-28 h-10" fit="none" />
            <template #desc>
              <span class="hidden"></span>
            </template>
          </Hover>
          <Hover :click="true" :desc="i18n.menu.hover.app" :href="getLinkUrl('android', detail.id)" class="ml-4">
            <ui-image :src="`${env.VITE_oss}/common/download_android.jpg`" class="block w-28 h-10" fit="none" />
            <template #desc>
              <span class="hidden"></span>
            </template>
          </Hover>
        </div>
      </div>
    </div>
  </div>
</template>
