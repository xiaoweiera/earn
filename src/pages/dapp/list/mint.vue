<script setup lang="ts">
/**
 * @file NFT
 * @auth svon.me@gmail.com
 */
import List from "./list.vue";
import { DAppType } from "src/types/dapp/dapp";
</script>

<template>
  <List :name="DAppType.mint" />
</template>
