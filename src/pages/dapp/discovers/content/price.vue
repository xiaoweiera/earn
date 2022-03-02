<script setup lang="ts">
import { toNumberCashFormat } from 'src/utils/convert/to';
import I18n from "src/utils/i18n";
defineProps({
  data: {
    type: Object,
  }
})
const i18n = I18n();
</script>
<template>
  <div v-if="data">
    <div class="w-full h-15 mt-2.5 py-2.5 border-t border-b border-global-highTitle border-opacity-6">
      <div class="w-full h-full flex justify-around items-center">
        <div class="text-center">
          <p class="text-kd16px20px text-global-highTitle font-medium font-kdBarlow">{{toNumberCashFormat(data.ido_price,'$','','Not Set')}}</p>
          <p class="text-kd12px16px text-global-highTitle text-opacity-65 font-normal">
            <span>{{ i18n.home.topList.idoPrice}}</span>
          </p>
        </div>
        <div class="h-6">
          <span class="h-6 border-l border-global-highTitle border-opacity-6"></span>
        </div>
        <div class="text-center">
          <p class="text-kd16px20px text-global-highTitle font-medium font-kdBarlow">{{toNumberCashFormat(data.ido_fundraising_goal,'$','','Not Set')}}</p>
          <p class="text-kd12px16px text-global-highTitle text-opacity-65 font-normal">{{ i18n.home.idoIgoProject.totalRaised}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
