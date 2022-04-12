<script setup lang="ts">
import Introduction from "src/pages/dapp/detail/dashboard/introduction.vue";
import News from "src/pages/dapp/detail/dashboard/news.vue";
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
    <Information v-if="data.rank" :value="data" />
    <Introduction />
    <News />
  </div>
</template>
