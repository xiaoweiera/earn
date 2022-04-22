<script setup lang="ts">
/**
 * @file 活动底部
 * @auth svon.me@gmail.com
 */

import VRouter from "src/components/v/router.vue";
import type { Invite } from "src/types/common/activity";
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";
import { computed } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  detail: {
    required: true,
    type: Object as PropType<Invite>,
  },
});

const env = getEnv();
const i18n = computed(function () {
  return I18n(props.detail?.language);
});
</script>

<template>
  <div class="md:flex justify-between items-end">
    <v-router :href="env.dashboard" class="flex items-end justify-between md:justify-start">
      <div class="w-28">
        <ui-image src="/images/common/logo.svg" />
      </div>
      <div class="md:ml-6">
        <span class="text-12-20 text-global-highTitle text-opacity-65">{{ i18n.menu.footer.desc }}</span>
      </div>
    </v-router>
    <v-router class="mt-6 md:mt-0 flex items-center justify-center md:justify-start" :href="i18n.activity.footer.link" target="_blank">
      <span class="text-14-20 text-global-highTitle text-opacity-65">{{ i18n.activity.footer.about }}</span>
      <IconFont class="mx-1 flex text-global-darkblue" type="icon-telegram" size="16" />
      <span class="text-14-18 text-global-darkblue">{{ i18n.activity.footer.name }}</span>
    </v-router>
  </div>
</template>
