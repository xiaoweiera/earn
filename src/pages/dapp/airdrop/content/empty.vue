<script setup lang="ts">
import { computed } from "vue";
import I18n from "src/utils/i18n";
import { config } from "src/router/config";
import { TabTypes } from "src/types/dapp/airdrop";

const i18n = I18n();
const ongoingHref = computed<string>(function () {
  return `${config.airdrop}/list/${TabTypes.ongoing}`;
});
</script>

<template>
  <div class="airdrop-empty">
    <div class="text-center py-35">
      <p class="text-16-24 text-global-highTitle text-opacity-85">{{ i18n.dapp.empty.title }}</p>
      <p class="text-12-16 text-global-highTitle text-opacity-65 mt-2">
        <v-router class="text-global-darkblue" :href="ongoingHref">{{ i18n.airdrop.empty.text }}</v-router>
        <span>{{ i18n.dapp.empty.text2 }}</span>
        <v-router class="text-global-darkblue" :href="config.dappApply" target="_blank">{{ i18n.dapp.empty.text3 }}</v-router>
      </p>
    </div>
  </div>
</template>
