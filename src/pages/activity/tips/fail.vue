<script lang="ts" setup>
/**
 * @file 奖品领取失败
 * @auth svon.me@gmail.com
 */

import I18n from "src/utils/i18n";
import { computed } from "vue";
import { ElButton } from "element-plus";

const emitEvent = defineEmits(["click"]);

const props = defineProps({
  lang: {
    type: String,
    default: "",
  },
});

const i18n = computed(function () {
  return I18n(props.lang);
});

const onClick = function (e: Event) {
  emitEvent("click", e);
};
</script>

<template>
  <div>
    <div class="text-center">
      <div class="w-30 mx-auto">
        <ui-image :oss="true" class="h-30" fit="none" src="/static/images/activity/fail.jpg" />
      </div>
      <div class="py-4">
        <p class="text-14-24 text-global-highTitle whitespace-pre-wrap">{{ i18n.activity.tips.fail }}</p>
      </div>
      <div class="w-30 mx-auto">
        <el-button class="w-full" type="primary" @click="onClick">
          <span>{{ i18n.activity.label.ok }}</span>
        </el-button>
      </div>
    </div>
  </div>
</template>
