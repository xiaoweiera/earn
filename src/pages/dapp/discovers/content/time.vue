<script setup lang="ts">
import DappDiscoversCutdown from '../cutdown.vue'
import {getParam} from "src/utils/router";
import safeGet from "@fengqiaogang/safe-get";
 import { config } from "src/router/config";
defineProps({
  data: {
    type: Object,
  }
})
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
  <div v-if="data">
    <div class="w-full h-15.5 flex justify-between items-center">
      <div class="flex-1">
        <DappDiscoversCutdown :value="data.ido_start_at"></DappDiscoversCutdown>
      </div>
      <v-router target="_blank" :href='detailUrl(data)' class="ml-6.5">
        <div class="w-20 go-part border-1 border-global-darkblue rounded-md py-1.5 px-3 flex items-center justify-center">
          <span class="text-kd14px18px text-global-darkblue">去参与</span>
        </div>
      </v-router>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.go-part {
  &:hover {
    @apply bg-global-darkblue;
    span {
      @apply text-global-white;
    }
  }
}
</style>