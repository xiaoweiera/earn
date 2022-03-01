<script setup lang="ts">

import { getTegLog, getLog } from 'src/logic/dapp'
defineProps({
  data: {
    type: Object,
  }
})
</script>
<template>
  <div v-if="data">
    <div class="w-full flex justify-items-start -mt-7.5 items-center">
      <div class="w-15 h-15 border-2 border-global-white rounded-md">
        <!-- <ui-image class="w-full h-full" fit="cover" :src="data.cover" :lazy="true"/> -->
        <ui-image class="w-full h-full" fit="cover" :src="data.logo" :lazy="true"/>
      </div>
      <div class="flex-1 h-15 pl-2.5">
        <div class="flex justify-between items-center">
          <p class="items-center">
            <span class="text-kd18px18px text-global-white font-semibold font-kdBarlow">{{data.name}}</span>
            <span class="text-kd14px18px text-global-white text-opacity-65 font-kdBarlow font-medium ml-1.5">{{data.symbol}}</span>
          </p>
          <p class="flex items-center">
            <IconFont v-if="data.chain" class="text-global-gemstone" :type="getLog(data.chain)" size="16"/>
          </p>
        </div>
        <div class="mt-3.5">
          <ul class="flex">
            <li class="flex items-center mr-3" v-if="data.tge_platform" v-for="( item, index ) in data.tge_platform" :key="index">
              <IconFont class="text-global-gemstone" :type="getTegLog(item)" size="16"/>
              <span class="text-kd12px16px ml-1.5 text-global-highTitle text-opacity-85 font-kdFang">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
