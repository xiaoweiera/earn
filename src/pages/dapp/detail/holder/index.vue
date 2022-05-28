<script lang="ts" setup>
import HolderHeader from "src/pages/dapp/detail/holder/header.vue";
// import HolderChart from "src/pages/dapp/detail/holder/chart/index.vue";

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
    <HolderHeader :data="data" />
    <!--    <HolderChart :data="data" />-->
  </div>
</template>

<style lang="scss" scoped></style>
