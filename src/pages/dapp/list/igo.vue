<script setup lang="ts">
/**
 * @file IGo
 * @auth svon.me@gmail.com
 */
import List from "./list.vue";
import { DAppType } from "src/types/dapp/dapp";
</script>

<template>
  <List :name="DAppType.igo" />
</template>
