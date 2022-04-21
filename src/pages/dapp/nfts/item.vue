<script setup lang="ts">
import { toFixed } from "src/utils";
import { toNumberCashFormat } from "src/utils/convert/to";
import { getLog } from "src/logic/dapp";
import I18n from "src/utils/i18n";

import DAppNftsTime from "./time.vue";

const i18n = I18n();
defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const getUrl = function (data: any) {
  if (data) {
    return `${data}/nft`;
  }
};
</script>
<template>
  <div v-if="data" class="w-full h-full">
    <v-router :href="getUrl(data.url)" target="_blank" class="block w-full h-full">
      <div v-if="data" class="w-full h-full relative">
        <div v-if="data.gallery.length > 0" class="w-full h-full">
          <div v-for="(item, index) in data.gallery" :key="index" class="w-full h-full rounded-md">
            <ui-image v-if="index === 0" class="w-full min-h-58 h-58" fit="cover" :src="item" :lazy="true" />
            <ui-image v-if="index === 0" class="w-full min-h-58 h-58 image-transform" fit="cover" :src="item" :lazy="true" />
          </div>
        </div>
        <div v-else class="is-flater w-full h-full">
          <ui-image class="w-full h-full" fit="cover" :src="data.logo" :lazy="true" />
        </div>
        <div class="w-full absolute top-4 left-0 z-1">
          <div class="w-full flex justify-between px-4">
            <p v-if="data.category" class="h-5.5 flex items-center bg-global-bgBlack px-2 border border-global-white border-opacity-25 rounded-2xl">
              <span class="text-kd12px14px text-global-white font-kdFang font-medium">{{ data.category }}</span>
            </p>
            <p v-else />
            <p class="h-5.5 bg-global-gemstone px-2 text-global-white border border-global-white border-opacity-25 rounded-2xl flex items-center">
              <IconFont type="icon-star" size="12" class="is-star" />
              <span class="ml-0.5 text-kd16px18px text-number font-semibold">{{ toFixed(data.overall_score, 1) }}</span>
            </p>
          </div>
        </div>
        <!-- footer -->
        <div class="nft-footer w-full absolute bottom-0 left-0">
          <div class="w-full h-39.5 px-4 pt-7 text-global-white">
            <!-- 项目名称 -->
            <div class="flex items-end max-h-9 h-9">
              <span class="max-w-full inline-flex items-end h-full text-kd16px16px text-global-white font-semibold font-kdBarlow">{{ data.name }}</span>
              <IconFont v-if="data.chain" :type="getLog(data.chain)" size="16" class="h-full items-end ml-2" />
            </div>
            <!-- 价格总量 -->
            <div class="nft-price h-10 flex justify-between items-center border-b-1 border-global-white border-opacity-15">
              <p class="flex items-center">
                <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">{{ i18n.home.nftProject.price }}</span>
                <span class="text-kd14px20px font-kdBarlow ml-1 font-medium">{{ toNumberCashFormat(data.mint_price, "", "", "--") }}</span>
                <IconFont v-if="data.chain" :type="getLog(data.chain)" size="14" class="ml-2 text-global-white" />
              </p>
              <p class="h-4 border-l-1 border-global-white border-opacity-15" />
              <p class="flex items-center">
                <span class="text-kd12px16px text-global-white text-opacity-65 font-kdFang">{{ i18n.home.nftProject.supply }}</span>
                <span class="text-kd14px20px font-kdBarlow ml-1 font-medium">{{ toNumberCashFormat(data.issue_volume, "", "", "--") }}</span>
              </p>
            </div>
            <!-- 时间 -->
            <div class="relative z-1">
              <DAppNftsTime :value="data" />
            </div>
          </div>
        </div>
      </div>
    </v-router>
  </div>
</template>
<style lang="scss" scoped>
.is-star {
  ::v-deep(.bright) {
    @apply text-global-white;
  }
}

.nft-footer {
  background: linear-gradient(180deg, rgba(45, 45, 45, 0) 0%, rgba(45, 45, 45, 0.931356) 80%);
}
.is-flater {
  @apply bg-global-hei;
  filter: blur(16px);
  -webkit-filter: blur(16px);
  -moz-filter: blur(16px);
  -ms-filter: blur(16px);
  -o-filter: blur(16px);
}
.image-transform {
  transform: matrix(1, 0, 0, -1, 0, 0);
  -ms-transform: matrix(1, 0, 0, -1, 0, 0);
  -moz-transform: matrix(1, 0, 0, -1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, -1, 0, 0);
  -o-transform: matrix(1, 0, 0, -1, 0, 0);
}
.nft-price {
  filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.24));
}
</style>
