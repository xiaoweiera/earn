<script setup lang="ts">
import Card from "./card.vue";
import Table from "./table.vue";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import * as alias from "src/utils/root/alias";
import { useRoute } from "vue-router";
import { detailModel } from "src/types/invest";
import { onMounted } from "vue";
import API from "src/api";
import safeGet from "@fengqiaogang/safe-get";

const detail: detailModel = createReactive<detailModel>(alias.invest.detail.info, {} as detailModel);

const route = useRoute();
const investor_id: string | number = safeGet(route, "params.id");
onMounted(() => {
  onLoadReactive<detailModel>(detail, () => {
    const api = new API();
    return api.invest.getInvestInfo(investor_id);
  });
});
</script>
<template>
  <div class="md:max-w-360 px-3 pt-3 md:px-22.5 md:pt-8 pb-4 md:pb-30 mx-auto">
    <div class="md:flex w-full h-full">
      <Card class="xl:block md:hidden block md:min-w-101 w-full md:w-101" :data="detail" />
      <Table :detail="detail" class="md:ml-8 flex-1 mt-6 md:mt-0" />
    </div>
  </div>
</template>
