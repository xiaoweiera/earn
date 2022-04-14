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
      <Token :data="data" />
    </div>
    <Information :data="data" />
    <Introduction />
    <News />
  </div>
</template>
