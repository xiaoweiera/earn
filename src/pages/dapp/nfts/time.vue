<script setup lang="ts">
import DappNftsCutdown from './cutdown.vue'
import {getParam} from "src/utils/router";
import safeGet from "@fengqiaogang/safe-get";
 import { config } from "src/router/config";
import I18n from "src/utils/i18n";
defineProps({
  value: {
    type: Object,
  }
})
const i18n = I18n();
const detailUrl = function (data: object) {
  const category=getParam<string>('category', '') as string
  const id = safeGet<number>(data, 'dapp_id');
  if (id) {
    return `${config.dapp}/rank/${id}?category=${category}`;
  }
  return safeGet<string>(data, 'website');
};
</script>
<template>
  <div>
    <div class="w-full h-13 flex justify-between items-center">
      <div class="min-w-22.5 mr-1.25">
        <DappNftsCutdown :value="value.mint_start_at"></DappNftsCutdown>
      </div>
      <v-router target="_blank" :href='value.url'>
        <div class="w-18 h-6 bg-global-darkblue md:bg-global-white md:bg-opacity-0 go-part md:border-1 border-global-white border-opacity-45 rounded-md py-1.5 px-3 flex items-center justify-center">
          <span class="text-kd12px16px text-global-white font-medium font-kdFang">{{ i18n.home.nftProject.mint }}</span>
        </div>
      </v-router>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.go-part {
  &:hover {
    @apply bg-global-darkblue border-global-darkblue;
    span {
      @apply text-global-white;
    }
  }
}
</style>