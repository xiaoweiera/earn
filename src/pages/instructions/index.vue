<script setup lang="ts">
import I18n from "src/utils/i18n";

const i18n = I18n();
</script>
<template>
  <div class="px-4">
    <div class="w-full text-center text-kd16px18px md:text-kd20px24px font-bold mt-3 md:my-4">{{ i18n.file.title }}</div>
    <pre class="text-kd14px20px font-kdFang whitespace-pre-wrap">{{ i18n.file.desc }}</pre>
  </div>
</template>
