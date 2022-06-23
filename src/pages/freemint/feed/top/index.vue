<script setup lang="ts">
import Chain from "../chain.vue";
import Tag from "src/pages/freemint/tool/ui/tag.vue";
import Table from "./table.vue";
import { data } from "src/pages/freemint/lib/testData";
import { Nft } from "src/pages/freemint/lib/nft.js";
import { ref, onMounted } from "vue";
const NFT = ref();
const filter = [
  { name: "Free", value: "free" },
  { name: "All", value: "all" },
];
const dataTime = ["5M", "30M", "1H", "all"];
const list = ref<any>([]);
const getInit = async () => {
  // const data=await NFT.value.get_lastest_mint_tx(30)
  list.value = NFT.value.group_by_collection(data);
};

onMounted(async () => {
  // @ts-ignore
  NFT.value = new Nft(window["AlchemyWeb3"]);
  getInit();
});

// let testTime = 0;
// const changeTime = (time: any) => {
//   // todo
//   testTime = time;
// };
</script>
<template>
  <div class="top-page">
    <div class="state justify-between">
      <div class="text-kd16px22px font-medium text-global-highTitle">Top Mint list</div>
      <div class="state">
        <Tag class="mr-6" :data="filter" />
        <ui-date-day class="mr-6" :shortcuts="dataTime" />
        <Chain />
      </div>
    </div>
    <!--    表格-->
    <Table v-if="list.length" :data="list" />
  </div>
</template>
<style lang="scss">
.top-page {
  @apply max-w-240 mx-auto pt-6 mb-20;
}
</style>
