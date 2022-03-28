<script lang="ts" setup>
import I18n from "src/utils/i18n";

const i18n = I18n();
</script>

<template>
  <div class="py-8">
    <h2 class="text-kd32px32px text-global-highTitle">
      <b class="font-b font-kdBarlow">{{ i18n.airdrop.title }}</b>
    </h2>
    <p class="text-kd13px18px md:text-kd14px18px mt-3 text-global-highTitle text-opacity-45 font-kdInter" v-html="i18n.airdrop.desc"></p>
  </div>
</template>
