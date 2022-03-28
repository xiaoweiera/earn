<script setup lang="ts">
import DAppAirdropItem from "./item.vue";
import { Model } from "src/logic/dapp";

const status = "upcoming";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
});

const request = function (query: object) {
  const model = new Model();
  return model.getAirdropList({ status, ...query });
};
</script>

<template>
  <ui-pagination :limit="limit > 0 ? limit : 20" :show-loading="limit < 1" :request="request">
    <template #default="scope">
      <div class="airdrop-list">
        <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data" />
      </div>
    </template>
  </ui-pagination>
</template>
