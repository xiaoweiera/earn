<script setup lang="ts">
/**
 * @file
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";

const i18n = I18n();
</script>

<template>
  <div class="py-3 border-t border-global-highTitle border-opacity-6">
    <div class="py-4">
      <div class="w-25 h-30 mx-auto">
        <ui-image class="w-full h-full" :oss="true" src="/static/images/search-empty.png" fit="contain" />
      </div>
      <p class="mt-4 text-global-highTitle text-opacity-45 text-center">
        <span class="text-14-18">{{ i18n.common.message.searchEmpty }}</span>
      </p>
    </div>
  </div>
</template>
