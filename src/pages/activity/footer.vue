<script setup lang="ts">
/**
 * @file 活动底部
 * @auth svon.me@gmail.com
 */

import VRouter from "src/components/v/router.vue";
import I18n from "src/utils/i18n";
import { getEnv } from "src/config/";

const i18n = I18n();
const env = getEnv();
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
    <v-router class="mt-6 md:mt-0 flex items-center justify-center md:justify-start" href="https://t.me/sue8639313" target="_blank">
      <span class="text-14-20 text-global-highTitle text-opacity-65">{{ i18n.menu.service.businessCooperation }}</span>
      <IconFont class="mx-1 flex text-global-darkblue" type="icon-telegram" size="16" />
      <span class="text-14-18 text-global-darkblue">@linimei</span>
    </v-router>
  </div>
</template>
