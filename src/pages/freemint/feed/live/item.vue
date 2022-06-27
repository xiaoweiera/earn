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
  <div class="mt-1.5 flex min-h-22 relative">
    <div class="xian">
      <div class="yuan-hui"></div>
    </div>
    <!--      PC-->
    <div class="border-css xshidden ml-5.5 p-4 flex flex-1 items-start">
      <ui-image class="min-w-14 min-h-14 max-w-14 max-h-14 rounded-full mr-4" :src="data.image" />
      <div class="state w-full justify-between">
        <div>
          <div class="state">
            <div class="state">
              <span class="mr-1.5 text-kd16px22px text-global-balck-title font-medium">
                {{ data.name }}
                <small class="gray">({{ data.contract_address }})</small>
              </span>
              <span class="text-kd14px18px font-medium text-global-text-grey font-kdFang">{{ data.sumNumber ? `X${data.sumNumber}` : "" }}</span>
              <div class="gang mx-2" />
            </div>
            <div class="state">
              <a :href="'https://etherscan.io/address/' + data.contract_address" blank="_blank">
                <ui-image class="w-4 h-4 mr-1.5" oss src="/mint/scan.png" />
              </a>
            </div>
          </div>
          <div class="gray w-180 whitespace-pre-wrap">{{ data.description }}</div>

          <div class="state mt-3">
            <div class="state mr-12">
              <div class="des-title">Mint Price</div>
              <Tip v-if="!data.value" type="free" />
              <div v-else class="content-value">{{ toNumberCashFormat(data.value, "$") }}</div>
            </div>
            <div class="state mr-12">
              <div class="des-title">Avg Tx Fee</div>
              <div class="content-value">{{ toNumberCashFormat(data.gas) }} ETH</div>
            </div>
            <div class="state mr-12">
              <div class="des-title">Fomo Level</div>
              <Tip :type="data.sumNumber >= 5 ? 'high' : 'low'" />
            </div>
          </div>
        </div>
        <div>
          <!--          <div class="fast-mint">Fast Mint</div>-->
          <v-router class="copy-mint mt-2" :href="`/freemint/nft?contact=${data.contract_address}`">Copy Mint</v-router>
        </div>
      </div>
    </div>
    <!--      Mobile-->
    <div class="border-css ml-4.5 mdhidden p-4">
      <div class="state">
        <ui-image class="min-w-14 min-h-14 max-w-14 max-h-14 rounded-full mr-4" :src="data.image" />
        <div class="state">
          <div class="state flex-wrap">
            <span class="mr-1.5 text-kd16px22px text-global-balck-title font-medium flex flex-wrap break-txt">{{ data.name }}{{ data.name }}</span>
            <span class="text-kd14px18px font-medium text-global-text-grey font-kdFang flex flex-wrap break-txt">{{ data.sumNumber ? `X${data.sumNumber}` : "" }}</span>
            <div class="gang mx-2" />
            <ui-image class="w-4 h-4 mr-1.5" oss src="/mint/web.png" />
            <ui-image class="w-4 h-4 mr-1.5" oss src="/mint/scan.png" />
            <ui-image class="w-4 h-4" oss src="/mint/open.png" />
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="mt-3">
          <div class="state mt-2">
            <div class="des-title">Mint Price</div>
            <Tip v-if="!data.value" type="free" />
            <div v-else class="content-value">{{ toNumberCashFormat(data.value, "$") }}</div>
          </div>
          <div class="state mt-2">
            <div class="des-title">Avg Tx Fee</div>
            <div class="content-value">{{ toNumberCashFormat(data.gas) }} ETH</div>
          </div>
          <div class="state mt-2">
            <div class="des-title">Fomo Level</div>
            <Tip :type="data.sumNumber >= 5 ? 'high' : 'low'" />
          </div>
        </div>
      </div>
      <div class="flex items-center mt-3">
        <!-- <div class="fast-mint mr-2">Fast Mint</div> -->
        <v-router class="copy-mint" target="_blank" :href="`/freemint/nft?contact=${data.contract_address}`">Copy Mint</v-router>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.break-txt {
  word-break: break-word;
}

.gray {
  color: #999;
  font-wight: 300;
}

.yuan-hui {
  border: 2px solid rgba(211, 214, 219, 1);
  @apply absolute top-0;
  @apply w-3 h-3 rounded-full  flex justify-center items-center;
}
.xian {
  height: 100%;
  @apply w-3 absolute  mr-1.5 md:mr-0 md:ml-1.3  rounded-full  flex justify-center items-center;
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
  @apply md:w-18.75 w-full h-6 text-global-white;
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
