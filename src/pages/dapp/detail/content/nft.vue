<script lang="ts" setup>
import DAppDetailDate from "src/pages/dapp/detail/content/date.vue";
import DAppDetailState from "src/pages/dapp/detail/content/state.vue";
import I18n from "src/utils/i18n";
import { toNumberFormat, isAfter } from "src/utils";
import { toUpper } from "ramda";
import { timeValue, timeFormat } from "src/logic/dapp/index";
import VRouter from "src/components/v/router.vue";
import { ref } from "vue";
import { Progress } from "src/types/dapp/data";

const i18n = I18n();

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const show_content = ref(false);
const showClick = function () {
  show_content.value = !show_content.value;
};
</script>

<template>
  <div>
    <div class="mt-3 p-4 bg-global-topBg rounded-md">
      <!-- 标题 -->
      <div class="flex items-center justify-between">
        <div class="flex flex-col md:flex-row">
          <div class="flex items-center">
            <DAppDetailState :start="data.nft.mint_start_at" :ended="data.nft.mint_end_at" />
            <p class="text-kd16px22px text-global-highTitle font-medium font-kdFang ml-3">Mint</p>
          </div>
          <div class="flex items-center mt-1.5 md:mt-0">
            <p v-if="data.nft.mint_start_at || data.nft.mint_end_at" class="hidden md:block h-4 mx-3 border-l border-sold border-global-highTitle border-opacity-6"></p>
            <p class="flex items-center">
              <IconFont type="icon-rili" class="text-global-highTitle text-opacity-45" size="16" />
              <span class="ml-3 text-kd14px18px text-global-highTitle text-opacity-85 font-kdFang">{{ timeValue(data.nft.mint_start_at, data.nft.mint_end_at) }}</span>
            </p>
          </div>
        </div>
        <div class="w-6 h-6 bg-global-highTitle bg-opacity-6 rounded-md flex items-center justify-center cursor-pointer" @click="showClick()">
          <IconFont :type="show_content ? 'icon-arrow-down' : 'icon-arrow-up'" class="text-global-highTitle text-opacity-85" size="16" />
        </div>
      </div>
      <!-- 内容 -->
      <div class="flex flex-col md:flex-row justify-between overflow-hidden" :class="show_content ? 'h-0' : 'mt-5'">
        <!-- 描述 -->
        <div class="text-global-highTitle text-kd14px24px font-normal">
          <ui-description class="airdrop-des" :line="isAfter(data.nft.mint_start_at) || isAfter(data.nft.mint_end_at) ? 10 : 6">
            <ui-markdown :value="data.participation" />
          </ui-description>
        </div>
        <!-- 倒计时/数据/按钮 -->
        <div class="flex flex-col md:flex-row" :class="isAfter(data.nft.mint_start_at) || isAfter(data.nft.mint_end_at) ? 'md:h-65' : 'md:h-36'">
          <!-- 间隔线 -->
          <div class="my-4 md:my-0 mx-0 md:mx-8 h-0 md:h-full w-full md:w-0 border-t md:border-l border-sold border-global-highTitle border-opacity-6"></div>
          <!-- 倒计时 -->
          <div>
            <DAppDetailDate :start="data.nft.mint_start_at" :ended="data.nft.mint_end_at" />
            <!-- 间隔线 -->
            <div v-if="isAfter(data.nft.mint_start_at) || isAfter(data.nft.mint_end_at)" class="w-87 my-5 border-b border-sold border-global-highTitle border-opacity-6"></div>
            <!-- 数据 -->
            <ul class="w-full md:w-87">
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
                <label class="airdrop-title">{{ i18n.dapp.detail.mintTime }}</label>
                <p class="airdrop-num">
                  <span>{{ timeFormat(data.nft.mint_start_at, data.nft.mint_end_at) }}</span>
                </p>
              </li>
            </ul>
            <!-- 按钮 -->
            <div class="w-full flex mt-5 justify-between">
              <v-router v-if="data.tutorial_blog_url" class="block h-11 bg-global-white border-1 border-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :class="(data.participation_url || data.website) && data.nft.mint_status !== Progress.finished ? 'w-42.5' : 'w-87'" :href="data.tutorial_blog_url" target="_blank">
                <span class="text-kd16px22px text-global-darkblue font-medium font-kdFang">{{ i18n.dapp.detail.tutorial }}</span>
              </v-router>
              <v-router v-if="(data.participation_url || data.website) && data.nft.mint_status !== Progress.finished" class="block h-11 bg-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :class="data.tutorial_blog_url ? 'w-42.5' : 'w-87'" :href="data.participation_url || data.website" target="_blank">
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
.airdrop-des {
  ::v-deep(.view-all) {
    @apply bg-global-topBg;
  }
}
</style>
