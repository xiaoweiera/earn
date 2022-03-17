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
});

const emitEvent = defineEmits(["update:status"]);
const tooltipStatus = ref<boolean>(false);

const onClick = async function () {
  const env = getEnv();
  const id: string | number = props.id;
  // 未关注时
  if (!toBoolean(props.status)) {
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
    <span class="block">指标关注成功</span>
    <span class="block">请下载 App 接收异动</span>
  </p>`;
  const option = {
    center: true,
    showClose: false,
    customClass: "follow-custom",
    distinguishCancelAndClose: false,
    dangerouslyUseHTMLString: true,
    buttonSize: "medium",
    cancelButtonText: "关闭",
    confirmButtonText: "下载 APP",
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
  <client-only>
    <v-login v-if="!toBoolean(status)" class="inline-block">
      <div class="cursor-pointer text-xs" @click="onClick">
        <span class="inline-flex items-center py-1 px-3 bg-global-darkblue text-white follow-btn">
          <IconFont type="icon-plus" class="text-white align-middle" size="16"></IconFont>
          <span class="ml-1 inline-block">关注</span>
        </span>
      </div>
    </v-login>
  </client-only>
</template>

<style scoped lang="scss">
.follow-btn {
  border-radius: 34px;
}
</style>
