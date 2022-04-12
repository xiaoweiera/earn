<script setup lang="ts">
import Introduction from "src/pages/dapp/detail/dashboard/introduction.vue";
import News from "src/pages/dapp/detail/dashboard/news.vue";
import Token from "src/pages/dapp/detail/token/index.vue";
import Information from "src/pages/dapp/detail/content/chain/index.vue";

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <div>
    <div>
      <Token :value="data" />
    </div>
    <Information v-if="data.rank" :value="data" />
    <div class="mt-14">
      <h class="title">Introduction</h>
      <Introduction class="mt-2" />
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
