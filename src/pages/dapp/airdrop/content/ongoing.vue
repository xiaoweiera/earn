<script setup lang="ts">
import DAppAirdropItem from "./item.vue";
import { Model } from "src/logic/dapp";
import { getValue } from "src/utils/root/data";
import { alias } from "src/utils/ssr/ref";
import { TabTypes } from "src/types/dapp/airdrop";

const status = TabTypes.ongoing;

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
</script>

<template>
  <ui-pagination :limit="limit > 0 ? limit : 20" :init-value="initValue()" :show-loading="limit < 1" :request="request">
    <template #default="scope">
      <div class="airdrop-list">
        <DAppAirdropItem v-for="(data, index) in scope.list" :key="index" :data="data" />
      </div>
    </template>
  </ui-pagination>
</template>
