<script setup lang="ts">
import DAppAirdropItem from "src/pages/dapp/airdrop/content/item.vue";
import { Model } from "src/logic/dapp";

const status = "ongoing";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
  skin: {
    type: Boolean,
    default: () => false,
  },
});

const request = function (query: object) {
  const model = new Model();
  return model.getAirdropList({ status, ...query });
};
</script>

<template>
  <ui-pagination :skin="skin ? 'pagination' : ''" :limit="limit > 0 ? limit : 6" :show-loading="limit < 1" :request="request">
    <template #default="scope">
      <div v-if="scope.list.length > 0" class="airdrop-list">
        <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data" />
      </div>
    </template>
  </ui-pagination>
</template>
