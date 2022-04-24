<script lang="ts" setup>
/**
 * @file 活动已结束 (活动时间已到)
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { computed } from "vue";

const props = defineProps({
  lang: {
    type: String,
    default: "",
  },
});

const i18n = computed(function () {
  return I18n(props.lang);
});
</script>

<template>
  <div>
    <p class="text-center">
      <span class="text-14-18 text-global-darkblue text-opacity-85">{{ i18n.activity.label.endSoon }}</span>
    </p>
    <div class="mt-3 cursor-not-allowed w-60 mx-auto">
      <div class="bg-global-highTitle bg-opacity-6 h-11 flex items-center justify-center rounded-md">
        <span class="text-global-highTitle text-opacity-45 font-m">{{ i18n.activity.label.end }}</span>
      </div>
    </div>
  </div>
</template>
