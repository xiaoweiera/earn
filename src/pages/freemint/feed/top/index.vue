<script setup lang="ts">
import Chain from "../chain.vue";
import Tag from "src/pages/freemint/tool/ui/tag.vue";
import Table from "./table.vue";
const filter = [
  { name: "Free", value: "free" },
  { name: "All", value: "all" },
];
const dataTime = ["5M", "30M", "1H", "1", "all"];
let testTime = 0;
const changeTime = (time: any) => {
  // todo
  testTime = time;
};
</script>
<template>
  <div class="top-page">
    <div class="state justify-between">
      <div class="text-kd16px22px font-medium text-global-highTitle">Top Mint list</div>
      <div class="state">
        <Tag class="mr-6" :data="filter" />
        <ui-date-day class="mr-6" :shortcuts="dataTime" @change="changeTime" />
        <Chain />
      </div>
    </div>
    <!--    表格-->
    <Table />
  </div>
</template>
<style lang="scss">
.top-page {
  @apply max-w-240 mx-auto pt-6;
}
</style>
