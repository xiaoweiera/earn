<script lang="ts" setup>
import DAppUserData from "src/pages/dapp/detail/content/chain/userdata.vue";

defineProps({
  value: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>

<template>
  <div class="p-10">
    <DAppUserData :id="value.id" />
  </div>
</template>
