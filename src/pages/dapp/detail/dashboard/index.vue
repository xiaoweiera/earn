<script setup lang="ts">
import Introduction from "src/pages/dapp/detail/dashboard/introduction.vue";
import News from "src/pages/dapp/detail/dashboard/news.vue";
</script>
<template>
  <div>
    <div>
      <h class="title">Introduction</h>
      <Introduction />
    </div>
    <div class="mt-14">
      <p class="title">News</p>
      <News />
    </div>
  </div>
</template>
<style scoped lang="scss">
.title {
  @apply text-global-highTitle text-kd24px28px font-medium;
}
</style>
