<script setup lang="ts">
import Tip from "./tip.vue";
import { toNumberCashFormat } from "src/utils/convert/to";
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="mt-1.5 flex h-min-22">
    <div class="xian">
      <div class="yuan-hui"></div>
    </div>
    <div class="border-css p-4 flex flex-1 items-start">
      <ui-image class="min-w-14 min-h-14 max-w-14 max-h-14 rounded-full mr-4" :src="data.image" />
      <div class="state w-full justify-between">
        <div>
          <div class="state">
            <div class="state">
              <span class="mr-1.5 text-kd16px22px text-global-balck-title font-medium">{{ data.name }}</span>
              <span class="text-kd14px18px font-medium text-global-text-grey font-kdFang">{{ data.sumNumber ? `X${data.sumNumber}` : "" }}</span>
              <div class="gang mx-2" />
            </div>
            <div class="state">
              <ui-image class="w-4 h-4 mr-1.5" oss src="/mint/web.png" />
              <ui-image class="w-4 h-4 mr-1.5" oss src="/mint/scan.png" />
              <ui-image class="w-4 h-4" oss src="/mint/open.png" />
            </div>
          </div>
          <div class="state mt-3">
            <div class="state mr-12">
              <div class="des-title">Avg Price</div>
              <Tip v-if="!data.value" type="free" />
              <div v-else class="content-value">{{ toNumberCashFormat(data.value, "$") }}</div>
            </div>
            <div class="state mr-12">
              <div class="des-title">Gas Cost</div>
              <div class="content-value">{{ toNumberCashFormat(data.gas) }} Gwei</div>
            </div>
            <div class="state mr-12">
              <div class="des-title">Fomo Level</div>
              <Tip :type="data.sumNumber >= 5 ? 'high' : 'low'" />
            </div>
          </div>
        </div>
        <div>
          <div class="fast-mint">Fast Mint</div>
          <div class="copy-mint mt-2">Copy Mint</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.yuan-hui {
  border: 2px solid rgba(211, 214, 219, 1);
  @apply absolute top-0;
  @apply w-3 h-3 rounded-full  flex justify-center items-center;
}
.xian {
  height: 95%;
  @apply w-3 relative  mr-1.5 ml-1.4 rounded-full relative flex justify-center items-center;
}
.xian:after {
  content: "";
  position: absolute;
  border-left: 1px solid rgba(3, 54, 102, 0.1);
  height: 100% !important;
  @apply top-4;
}
.gang {
  border-left: 1px solid rgba(3, 54, 102, 0.1);
  @apply h-3.2;
}

.des-title {
  @apply mr-1.5 text-kd12px16px text-global-text-grey;
}

.content-value {
  @apply text-kd13px18px text-global-black-title;
}

.button-live {
  @apply w-18.75 h-6 text-global-white;
  @apply flex items-center justify-center rounded-kd4px cursor-pointer;
  @apply text-kd12px16px font-medium;
}

.fast-mint {
  @extend .button-live;
  background: #35c25d;
}

.copy-mint {
  @extend .button-live;
  @apply bg-global-primary;
}
</style>
