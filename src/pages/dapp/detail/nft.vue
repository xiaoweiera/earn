<script lang="ts" setup>
import DAppDetailDate from "src/pages/dapp/detail/date.vue";
import DAppDetailState from "src/pages/dapp/detail/state.vue";
import I18n from "src/utils/i18n";
import { toNumberFormat, isAfter } from "src/utils";
import { toUpper } from "ramda";
import { timeValue, timeFormat } from "src/logic/dapp/index";
import VRouter from "src/components/v/router.vue";

const i18n = I18n();

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>

<template>
  <div>
    <div class="mt-3 p-4 bg-global-topBg rounded-md">
      <!-- 标题 -->
      <div class="flex items-center">
        <DAppDetailState :start="data.nft.mint_start_at" :ended="data.nft.mint_end_at" />
        <p class="text-kd16px22px text-global-highTitle font-medium font-kdFang ml-3">Mint</p>
        <p class="h-4 mx-3 border-l border-sold border-global-highTitle border-opacity-6"></p>
        <p class="flex items-center">
          <IconFont type="icon-rili" class="text-global-highTitle text-opacity-45" size="16" />
          <span class="ml-3 text-kd14px18px text-global-highTitle text-opacity-85 font-kdFang">{{ timeValue(data.nft.mint_start_at, data.nft.mint_end_at) }}</span>
        </p>
      </div>
      <!-- 内容 -->
      <div class="mt-5 flex justify-between">
        <!-- 描述 -->
        <div class="text-global-highTitle text-kd14px24px font-normal">
          <ui-markdown :value="data.participation" />
        </div>
        <!-- 倒计时/数据/按钮 -->
        <div class="flex">
          <!-- 间隔线 -->
          <div class="h-65 mx-8 border-l border-sold border-global-highTitle border-opacity-6"></div>
          <!-- 倒计时 -->
          <div>
            <DAppDetailDate :start="data.nft.mint_start_at" :ended="data.nft.mint_end_at" />
            <!-- 间隔线 -->
            <div v-if="isAfter(data.nft.mint_start_at) || isAfter(data.nft.mint_end_at)" class="w-87 my-5 border-b border-sold border-global-highTitle border-opacity-6"></div>
            <!-- 数据 -->
            <ul>
              <li class="flex justify-between items-center">
                <!-- mint价格 -->
                <label class="airdrop-title">{{ i18n.dapp.priceData.mintPrice }}</label>
                <p class="airdrop-num">
                  <b class="airdrop-num">{{ toNumberFormat(data.nft.mint_price) }}</b>
                  <span v-if="data.nft.price_unit" class="airdrop-num ml-0.5">{{ toUpper(data.nft.price_unit) }}</span>
                </p>
              </li>
              <li class="flex justify-between items-center mt-3">
                <!-- 发行数量 -->
                <label class="airdrop-title">{{ i18n.dapp.priceData.count }}</label>
                <p class="airdrop-num">
                  <span>{{ toNumberFormat(data.nft.issue_volume) }}</span>
                </p>
              </li>
              <li class="flex justify-between items-center mt-3">
                <!-- Mint时间 -->
                <label class="airdrop-title">Mint时间</label>
                <p class="airdrop-num">
                  <span>{{ timeFormat(data.nft.mint_start_at, data.nft.mint_end_at) }}</span>
                </p>
              </li>
            </ul>
            <!-- 按钮 -->
            <div class="flex mt-5">
              <v-router class="block h-11 bg-global-white border-1 border-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :class="(data.participation_url || data.website) && data.logo ? 'w-42.5' : 'w-87'" :href="data.participation_url || data.website" target="_blank">
                <span class="text-kd16px22px text-global-darkblue font-medium font-kdFang">参与教程</span>
              </v-router>
              <v-router v-show="data.participation_url || data.website" class="block w-42.5 h-11 ml-2 bg-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :href="data.participation_url || data.website" target="_blank">
                <span class="text-kd16px22px text-global-white font-medium font-kdFang">Go To Mint</span>
              </v-router>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.airdrop-title {
  @apply text-kd14px18px text-global-highTitle text-opacity-65 font-kdInter;
}
.airdrop-num {
  @apply text-kd14px18px text-global-highTitle font-kdInter;
}
</style>
