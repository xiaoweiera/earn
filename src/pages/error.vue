<script setup lang="ts">
import { getEnv } from "src/config/";

const env = getEnv();
</script>
<template>
  <div class="text-3xl text-center">
    <v-router class="block" :href="env.home">
      <ui-empty/>
    </v-router>
  </div>
</template>
