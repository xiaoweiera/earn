<script setup lang="ts">
import I18n from "src/utils/i18n";

const i18n = I18n();
</script>
<template>
  <div class="mb-6" style="line-height: 22px">
    <div class="inline-block align-middle">
      <ui-image class="w-14 h-5.5" src="/images/news/7x24.png" />
    </div>
    <span class="mx-3 inline-block text-global-darkblue font-m">{{ i18n.menu.data.news }}</span>
    <p class="inline text-global-black-desc text-14-18">{{ i18n.news.tips }}</p>
  </div>
</template>
