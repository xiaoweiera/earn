<script setup lang="ts">
import DAppAirdropItem from "src/pages/dapp/airdrop/content/item.vue";
import { Model } from "src/logic/dapp";
import { setScrollTop } from "src/logic/dapp/airdrop";
import { getValue } from "src/utils/root/data";
import { alias } from "src/utils/ssr/ref";

const status = "ongoing";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
});
let initStatus = true;
const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return getValue(alias.airdrop.list, []);
  }
  return [];
};
const request = function (query: object) {
  const model = new Model();
  return model.getAirdropList({ status, ...query });
};
const changeView = function () {
  setScrollTop();
};
</script>

<template>
  <ui-pagination skin="pagination" :limit="limit > 0 ? limit : 6" :init-value="initValue()" :show-loading="limit < 1" :request="request" @change="changeView()">
    <template #default="scope">
      <div class="airdrop-list">
        <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data" />
      </div>
    </template>
  </ui-pagination>
</template>
