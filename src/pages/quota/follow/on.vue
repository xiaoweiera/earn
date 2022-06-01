<script setup lang="ts">
/**
 * @file 关注
 * @author svon.me@gmail.com
 */

import API from "src/api/";
import { getEnv } from "src/config/";
import window from "src/plugins/browser/window";
import { ref } from "vue";
import { toBoolean } from "src/utils";
import { ElMessageBox } from "element-plus";
import I18n from "src/utils/i18n/";
import * as track from "src/logic/track";

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  // 默认状态
  status: {
    type: Boolean,
    default: () => false,
  },
  title: {
    type: String,
    default: "",
  },
});

const i18n = I18n();
const emitEvent = defineEmits(["update:status"]);
const tooltipStatus = ref<boolean>(false);

const onClick = async function () {
  const env = getEnv();
  const id: string | number = props.id;
  // 未关注时
  if (!toBoolean(props.status)) {
    // 上报数据
    track.push(track.Origin.gio, track.event.quota.followIndicators, {
      indicator_title: props.title,
      indicator_ID: props.id,
    });

    // 关注
    try {
      const api = new API();
      await api.quota.onFollow(id);
      tooltipStatus.value = true;
      emitEvent("update:status", true);
    } catch (e) {
      // todo
    }
  }
  const html = `<p class="text-global-highTitle text-16-24 text-center">
    <span class="block">${i18n.news.share.success}</span>
    <span class="block">${i18n.news.share.download}</span>
  </p>`;
  const option = {
    center: true,
    showClose: false,
    customClass: "follow-custom",
    distinguishCancelAndClose: false,
    dangerouslyUseHTMLString: true,
    buttonSize: "medium",
    cancelButtonText: i18n.common.button.shut,
    confirmButtonText: i18n.common.nav.download2,
    cancelButtonClass: "text-14-18",
    confirmButtonClass: "text-14-18",
    callback: function (value: string) {
      if (value === "confirm") {
        window.open(env.appDownload);
      }
    },
  };
  await ElMessageBox.confirm(html, "", option);
};
</script>

<template>
  <client-only @click.prevent>
    <v-login v-if="!toBoolean(status)" class="inline-block">
      <div class="cursor-pointer text-xs" @click="onClick">
        <slot>
          <span class="inline-flex items-center py-1 px-3 bg-global-darkblue text-white rounded-kd34px">
            <IconFont type="icon-plus" class="text-white align-middle" size="16"></IconFont>
            <span class="ml-1 inline-block">{{ i18n.common.follow }}</span>
          </span>
        </slot>
      </div>
    </v-login>
  </client-only>
</template>
