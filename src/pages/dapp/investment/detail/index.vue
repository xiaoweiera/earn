<script setup lang="ts">
import Card from "./card.vue";
import Table from "./table.vue";
</script>
<template>
  <div class="md:max-w-360 px-3 pt-3 md:px-22.5 md:pt-8 md:pb-30 mx-auto">
    <div class="md:flex w-full h-full">
      <Card class="md:min-w-101 w-full md:w-101" />
      <Table class="md:ml-8 flex-1 mt-6 md:mt-0" />
    </div>
  </div>
</template>
