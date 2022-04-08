<script lang="ts" setup>
import DAppDetailDate from "src/pages/dapp/detail/date.vue";
import DAppDetailState from "src/pages/dapp/detail/state.vue";
import I18n from "src/utils/i18n";
import { toNumberFormat, isAfter } from "src/utils";
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
      <div class="flex flex-col md:flex-row md:items-center">
        <div class="flex">
          <DAppDetailState :start="data.airdrop.airdrop_start_at" :ended="data.airdrop.airdrop_end_at" />
          <p class="text-kd16px22px text-global-highTitle font-medium font-kdFang ml-3">{{ i18n.dapp.project.airdrop }}</p>
        </div>
        <div class="flex items-center mt-1.5 md:mt-0">
          <p v-if="data.airdrop.airdrop_start_at || data.airdrop.airdrop_end_at" class="hidden md:block h-4 mx-3 border-l border-sold border-global-highTitle border-opacity-6"></p>
          <p class="flex items-center">
            <IconFont v-if="data.airdrop.airdrop_start_at || data.airdrop.airdrop_end_at" type="icon-rili" class="text-global-highTitle text-opacity-45" size="16" />
            <span class="ml-3 text-kd14px18px text-global-highTitle text-opacity-85 font-kdFang">{{ timeValue(data.airdrop.airdrop_start_at, data.airdrop.airdrop_end_at) }}</span>
          </p>
        </div>
      </div>
      <!-- 内容 -->
      <div class="mt-5 flex flex-col md:flex-row justify-between">
        <!-- 描述 -->
        <div class="text-global-highTitle text-kd14px24px font-normal">
          <ui-markdown :value="data.participation" />
        </div>
        <!-- 倒计时/数据/按钮 -->
        <div class="flex flex-col md:flex-row">
          <!-- 间隔线 -->
          <div class="my-4 md:my-0 mx-0 md:mx-8 h-0 md:h-65 w-full md:w-0 border-t md:border-l border-sold border-global-highTitle border-opacity-6"></div>
          <!-- 倒计时 -->
          <div>
            <DAppDetailDate :start="data.airdrop.airdrop_start_at" :ended="data.airdrop.airdrop_end_at" />
            <!-- 间隔线 -->
            <div v-if="isAfter(data.airdrop.airdrop_start_at) || isAfter(data.airdrop.airdrop_end_at)" class="w-87 my-5 border-b border-sold border-global-highTitle border-opacity-6"></div>
            <!-- 数据 -->
            <ul>
              <li class="flex justify-between items-center">
                <!-- 空投总量 -->
                <label class="airdrop-title">{{ i18n.airdrop.content.amount }}</label>
                <p class="airdrop-num">
                  <b class="airdrop-num">{{ toNumberFormat(data.airdrop.airdrop_amount) }}</b>
                </p>
              </li>
              <li class="flex justify-between items-center mt-3">
                <!-- 空投名额 -->
                <label class="airdrop-title">{{ i18n.airdrop.content.quota }}</label>
                <p class="airdrop-num">
                  <span>{{ toNumberFormat(data.airdrop.airdrop_winner_count) }}</span>
                </p>
              </li>
              <li class="flex justify-between items-center mt-3">
                <!-- 空投时间 -->
                <label class="airdrop-title">Mint时间</label>
                <p class="airdrop-num">
                  <span>{{ timeFormat(data.airdrop.airdrop_start_at, data.airdrop.airdrop_end_at) }}</span>
                </p>
              </li>
            </ul>
            <!-- 按钮 -->
            <div class="flex mt-5">
              <v-router class="block h-11 bg-global-white border-1 border-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :class="(data.participation_url || data.website) && data.logo ? 'w-42.5' : 'w-87'" :href="data.participation_url || data.website" target="_blank">
                <span class="text-kd16px22px text-global-darkblue font-medium font-kdFang">参与教程</span>
              </v-router>
              <v-router v-show="data.participation_url || data.website" class="block w-42.5 h-11 ml-2 bg-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :href="data.participation_url || data.website" target="_blank">
                <span class="text-kd16px22px text-global-white font-medium font-kdFang">CLAIM AIRDROP</span>
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
