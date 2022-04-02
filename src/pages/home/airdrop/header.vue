<script lang="ts" setup>
import I18n from "src/utils/i18n";
import { config } from "src/router/config";

const i18n = I18n();

defineProps({
  title: {
    type: String,
    default: () => "",
  },
  tips: {
    type: String,
    default: () => "",
  },
});
</script>
<template>
  <div>
    <div class="hidden md:block">
      <div class="flex justify-between items-center">
        <div class="flex items-end">
          <p class="text-kd32px32px text-global-highTitle font-semibold font-kdSemiBold">{{ title }}</p>
          <p class="text-kd14px18px text-global-highTitle text-opacity-45 font-kdFang ml-4">{{ tips }}</p>
        </div>
        <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
          <v-router :href="`${config.airdrop}/list/`" target="_blank">
            <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.idoIgoProject.all }}</span>
          </v-router>
        </div>
      </div>
    </div>
    <div class="block md:hidden">
      <div class="">
        <div class="flex items-center justify-between">
          <p class="text-kd24px24px text-global-highTitle font-semibold font-kdSemiBold">{{ title }}</p>
          <v-router :href="`${config.airdrop}/list/`" target="_blank" class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
            <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.more }}</span>
          </v-router>
        </div>
        <div class="mt-4">
          <p class="text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">{{ tips }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
