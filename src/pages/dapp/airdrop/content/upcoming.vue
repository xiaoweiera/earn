<script setup lang="ts">
import DAppAirdropItem from "src/pages/dapp/airdrop/content/item.vue";
import DAppAirdropEmpty from "src/pages/dapp/airdrop/content/empty.vue";
import { Model } from "src/logic/dapp";
import { alias } from "src/utils/ssr/ref";
import { TabTypes } from "src/types/dapp/airdrop";
import { useRoute } from "vue-router";
import { getCacheList } from "src/logic/dapp/airdrop";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
});

const $route = useRoute();
const status = TabTypes.upcoming;

let initStatus = true;
const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return getCacheList($route, alias.airdrop.upcoming);
  }
  return [];
};
const request = function (query: object) {
  const model = new Model();
  return model.getUpcomingList({ status, ...query });
};
</script>

<template>
  <div>
    <ui-pagination :limit="limit > 0 ? limit : 20" :init-value="initValue()" :show-loading="limit < 1" :request="request">
      <template #default="scope">
        <div class="airdrop-list">
          <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data" />
        </div>
      </template>
      <template #empty>
        <DAppAirdropEmpty />
      </template>
    </ui-pagination>
  </div>
</template>
