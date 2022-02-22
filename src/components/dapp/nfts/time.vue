<script setup lang="ts">
import {getParam} from "src/utils/router";
import safeGet from "@fengqiaogang/safe-get";
 import { config } from "src/router/config";
defineProps({
  value: {
    type: Object,
  }
})
const detailUrl = function (data: object) {
  console.log('q1qqqq')
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
      <div>
        <DappNftsCutdown :value="value"></DappNftsCutdown>
      </div>
      <v-router target="_blank" :href='detailUrl(data)'>
        <div class="w-20 h-7 bg-global-darkblue md:bg-global-white md:bg-opacity-0 go-part md:border-1 border-global-white border-opacity-45 rounded-md py-1.5 px-3 flex items-center justify-center">
          <span class="text-kd14px18px text-global-white font-medium font-kdFang">Mint</span>
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