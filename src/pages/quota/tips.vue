<script setup lang="ts">
import I18n from "src/utils/i18n";

const i18n = I18n();
</script>
<template>
  <div class="p-2.5 tips rounded-md mb-6 hidden md:block">
    <p class="text-12-16 text-white">{{ i18n.news.tips }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "src/styles/function.scss";
.tips {
  background: static("/images/news/news_tips.png"), linear-gradient(90.79deg, #489aff 0%, #1f84ff 100%);
}
</style>
