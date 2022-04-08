<script setup lang="ts">
import { alias, createReactive } from "src/utils/ssr/ref";
import { DAppData } from "src/types/dapp/data";

const detail = createReactive<DAppData>(alias.dApp.detail, {} as DAppData);
</script>
<template>
  <div>News</div>
</template>
