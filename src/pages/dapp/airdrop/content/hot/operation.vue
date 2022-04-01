<script setup lang="ts">
import DAppAirdropItem from "src/pages/dapp/airdrop/content/item.vue";
// import DAppAirdropEmpty from "src/pages/dapp/airdrop/content/empty.vue";
import { Model } from "src/logic/dapp";
import { scrollGoToDom } from "src/plugins/browser/scroll";
import { getValue } from "src/utils/root/data";
import { alias } from "src/utils/ssr/ref";

const potential = true;

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
    return getValue(alias.airdrop.operation, []);
  }
  return [];
};
const request = function (query: object) {
  const model = new Model();
  return model.getOperationList({ potential, ...query });
};
const changeView = function () {
  scrollGoToDom(".j-operation-title", 40);
};
</script>

<template>
  <ui-pagination skin="pagination" :limit="limit > 0 ? limit : 6" :init-value="initValue()" :show-loading="limit < 1" :request="request" @next="changeView" @prev="changeView">
    <template #default="scope">
      <div class="airdrop-list">
        <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data" />
      </div>
    </template>
    <template #empty>
      <div class="operation-empty">
        <ui-empty />
      </div>
    </template>
  </ui-pagination>
</template>
