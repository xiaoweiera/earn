<script lang="ts" setup>
/**
 * @file 活动未开始
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { computed } from "vue";

const props = defineProps({
  lang: {
    type: String,
    default: "",
  },
  time: {
    type: [String, Number],
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
      <span class="text-12-16 text-global-highTitle text-opacity-85">{{ i18n.activity.label.startSoon }}</span>
    </p>
    <div class="mt-3 text-center">
      <div class="inline-block">
        <ui-time-countdown :lang="lang" :value="time" />
      </div>
    </div>
  </div>
</template>
