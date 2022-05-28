<script setup lang="ts">
import DAppAirdropItem from "./item.vue";
import { getAirdropList } from "src/logic/dapp";
import { alias } from "src/utils/ssr/ref";
import { ActivityStage } from "src/types/dapp/airdrop";
import { useRoute } from "vue-router";
import { getCacheList } from "src/logic/dapp/airdrop";
import { reactive } from "vue";

defineProps({
  limit: {
    type: Number,
    default: () => 0,
  },
});

const $route = useRoute();
const params = reactive({
  activity_type: "AIRDROP",
  activity_stage: ActivityStage.ended,
});

let initStatus = true;
const request = async function (query: object) {
  const { items } = await getAirdropList({ ...params, ...query });
  return items;
};

const initValue = function () {
  if (initStatus) {
    initStatus = false;
    return getCacheList($route, alias.airdrop.ended);
  }
  return [];
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
    </ui-pagination>
  </div>
</template>
