<script setup lang="ts">
import { useRoute } from "vue-router";
const $router = useRoute();
</script>

<template>
  <div class="dapp-discover">
    {{ $router.fullPath }}
  </div>
</template>


