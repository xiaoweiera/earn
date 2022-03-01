<script setup lang="ts">
import DappNftsTime from './time.vue';

import { valueFormat } from 'src/utils/convert/to'
import { getLog } from 'src/logic/dapp'
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
      <div class="flex items-center">
        <span class="text-kd20px20px text-global-white font-semibold font-kdBarlow">{{ data.name }}</span>
        <IconFont :type="data.logo" size="16" class="ml-2"/>
      </div>
      <!-- 价格总量 -->
      <div class="h-11 flex justify-between items-center border-b-1 border-global-white border-opacity-15">
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">价格：</span>
          <span class="text-kd16px20px font-kdBarlow font-medium">{{valueFormat(data.mint_price)}}</span>
          <IconFont v-if="data.chain" :type="getLog(data.chain)" size="12" class="ml-2 text-global-white"/>
        </p>
        <p class="h-4 border-l-1 border-global-white border-opacity-15"></p>
        <p class="flex items-center">
          <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">总量：</span>
          <span class="text-kd16px20px font-kdBarlow font-medium">{{ valueFormat(data.issue_volume) }}</span>
        </p>
      </div>
      <!-- 时间 -->
      <div>
        <DappNftsTime :value="data.mint_start_at"></DappNftsTime>
      </div>
    </div>
  </div>
</template>
