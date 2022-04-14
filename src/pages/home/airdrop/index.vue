<script lang="ts" setup>
import HomeAirdropsHeader from "src/pages/home/airdrop/header.vue";
import HomeAirdropsRow from "src/pages/home/airdrop/row.vue";
import HomeAridropsTutorial from "src/pages/home/airdrop/tutorial.vue";
import { config } from "src/router/config";
import I18n from "src/utils/i18n";

const i18n = I18n();
</script>

<template>
  <div>
    <!-- 头部 -->
    <div>
      <HomeAirdropsHeader :tips="i18n.home.airdrop.tips" :title="i18n.home.airdrop.title" />
    </div>
    <!-- 空投列表 -->
    <HomeAirdropsRow />
    <!-- 推文列表 -->
    <div class="mt-3 md:mt-6 mb-3 flex justify-between items-center">
      <p class="text-kd24px28px text-global-highTitle font-semibold font-kdBarlow">
        {{ i18n.home.airdrop.tutorial }}
      </p>
      <v-router :href="config.blog" target="_blank" class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
        <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.more }}</span>
      </v-router>
    </div>
    <HomeAridropsTutorial />
  </div>
</template>
