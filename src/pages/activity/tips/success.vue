<script setup lang="ts">
/**
 * @file 奖品领取成功提示
 * @auth svon.me@gmail.com
 */

import { getEnv } from "src/config";
import { getUA } from "src/plugins/browser/ua";
import I18n from "src/utils/i18n";
import { computed } from "vue";
import { ElButton } from "element-plus";

const emitEvent = defineEmits(["click"]);

const props = defineProps({
  lang: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  id: {
    type: [String, Number],
    default: "",
  },
});

const i18n = computed(function () {
  return I18n(props.lang);
});

const getDownloadUrl = function (id: string | number) {
  const env = getEnv();
  const ua = getUA();
  let type = "web";

  if (ua.isAndroid) {
    type = "android";
  }
  if (ua.isiPhone || ua.isiPad || ua.isiPod) {
    type = "ios";
  }

  const query = {
    utm_source: `activity_${id || 0}_${type}`,
  };
  return {
    query,
    path: env.appDownload,
  };
};

const onClick = function (e: Event) {
  emitEvent("click", e);
};
</script>

<template>
  <div>
    <div class="text-center">
      <div class="w-30 mx-auto">
        <ui-image :oss="true" class="h-30" fit="none" src="/static/images/activity/success.jpg" />
      </div>
      <div class="py-4">
        <div class="text-14-24 text-global-highTitle">
          <div class="rich-text" v-html="text"></div>
        </div>
      </div>
      <div class="w-30 mx-auto">
        <v-router :href="getDownloadUrl(id)" class="block" target="_blank">
          <el-button class="w-full" type="primary" @click="onClick">
            <span>{{ i18n.common.nav.download2 }}</span>
          </el-button>
        </v-router>
      </div>
    </div>
  </div>
</template>
