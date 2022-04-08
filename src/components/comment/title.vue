<script setup lang="ts">
import I18n from "src/utils/i18n";
const i18n = I18n();
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center h-8.5">
      <IconFont class="text-global-numGreen mr-1.5" size="24" type="icon-pingce" />
      <div class="text-16-24 font-medium text-global-highTitle text-opacity-85">{{ i18n.comment.test }}</div>
    </div>
  </div>
</template>
