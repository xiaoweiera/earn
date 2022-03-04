<script setup lang="ts">
import DappNftsTime from './time.vue';

import { valueFormat } from 'src/utils/convert/to'
import { getLog } from 'src/logic/dapp'
import I18n from "src/utils/i18n";
const i18n = I18n();

defineProps({
  data: {
    type: Object,
  }
})
</script>
<template>
  <div v-if="data">
    <div class="h-29 px-4 bg-global-textBlack text-global-white">
      <!-- 项目名称 -->
      <div class="flex items-center h-6">
        <span class="max-w-40 w-40 items-center h-full text-kd20px20px short text-global-white font-semibold font-kdBarlow">{{ data.name }}</span>
        <IconFont v-if="data.chain" :type="getLog(data.chain)" size="16" class="h-full items-center ml-2"/>
      </div>
      <!-- 价格总量 -->
      <div class="h-10 flex justify-between items-center border-b-1 border-global-white border-opacity-15">
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">{{ i18n.home.nftProject.price }}</span>
          <span class="text-kd16px20px font-kdBarlow ml-1 font-medium">{{valueFormat(data.mint_price)}}</span>
          <IconFont v-if="data.chain" :type="getLog(data.chain)" size="12" class="ml-2 text-global-white"/>
        </p>
        <p class="h-4 border-l-1 border-global-white border-opacity-15"></p>
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">{{ i18n.home.nftProject.supply }}</span>
          <span class="text-kd16px20px font-kdBarlow ml-1 font-medium">{{ valueFormat(data.issue_volume) }}</span>
        </p>
      </div>
      <!-- 时间 -->
      <div>
        <DappNftsTime :value="data"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.small {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
