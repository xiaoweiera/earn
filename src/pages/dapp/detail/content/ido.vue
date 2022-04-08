<script lang="ts" setup>
import { ref } from "vue";
import DAppDetailDate from "src/pages/dapp/detail/content/date.vue";
import DAppDetailState from "src/pages/dapp/detail/content/state.vue";
import I18n from "src/utils/i18n";
import { timeValue, timeFormat, getClassColor } from "src/logic/dapp/index";
import { toNumberCashFormat } from "src/utils";
import IconFont from "src/components/icon/font.vue";

const i18n = I18n();

defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const price_unit = "$";
const show_content = ref(false);
const showClick = function () {
  show_content.value = !show_content.value;
};
</script>

<template>
  <div>
    <div v-if="data" class="mt-3 p-4 bg-global-topBg rounded-md">
      <!-- 标题 -->
      <div v-if="data.ido" class="flex items-center justify-between">
        <div class="flex flex-col md:flex-row">
          <div class="flex items-center">
            <DAppDetailState :start="data.ido.ido_start_at" :ended="data.ido.ido_end_at" />
            <p class="text-kd16px22px text-global-highTitle font-medium font-kdFang ml-3">IDO</p>
          </div>
          <div class="flex items-center mt-1.5 md:mt-0">
            <p v-if="data.ido.ido_start_at || data.ido.ido_end_at" class="hidden md:block h-4 mx-3 border-l border-sold border-global-highTitle border-opacity-6"></p>
            <p class="flex items-center">
              <IconFont type="icon-rili" class="text-global-highTitle text-opacity-45" size="16" />
              <span class="ml-3 text-kd14px18px text-global-highTitle text-opacity-85 font-kdFang">{{ timeValue(data.ido.ido_start_at, data.ido.ido_end_at) }}</span>
            </p>
          </div>
        </div>
        <div class="w-6 h-6 bg-global-highTitle bg-opacity-6 rounded-md flex items-center justify-center cursor-pointer" @click="showClick()">
          <IconFont :type="show_content ? 'icon-arrow-up' : 'icon-arrow-down'" class="text-global-highTitle text-opacity-85" size="16" />
        </div>
      </div>
      <!-- 内容 -->
      <div class="flex flex-col md:flex-row justify-between overflow-hidden" :class="show_content ? 'h-0' : 'mt-5'">
        <!-- 描述 -->
        <div class="text-global-highTitle text-kd14px24px font-normal">
          <ui-markdown :value="data.participation" />
        </div>
        <!-- 倒计时/数据/按钮 -->
        <div class="flex flex-col md:flex-row">
          <div class="my-4 md:my-0 mx-0 md:mx-8 h-0 md:min-h-38 w-full md:w-0 border-t md:border-l border-sold border-global-highTitle border-opacity-6"></div>
          <div>
            <!-- 倒计时 -->
            <DAppDetailDate :start="data.ido.ido_start_at" :ended="data.ido.ido_end_at" />
            <!-- 间隔线 -->
            <div class="w-87 my-5 border-b border-sold border-global-highTitle border-opacity-6"></div>
            <!-- 数据 -->
            <ul>
              <!-- IDO价格 -->
              <li class="flex justify-between">
                <label class="airdrop-title">{{ i18n.dapp.project.idoPrice }}</label>
                <p class="airdrop-num">{{ toNumberCashFormat(data.ido.ido_price, price_unit, "", "TBA") }}</p>
              </li>
              <!-- 自IDO以来收益 -->
              <li v-if="data.ido.ath_since_ido" class="flex justify-between mt-3">
                <label class="airdrop-title">{{ i18n.home.topList.idoAth }}</label>
                <p class="airdrop-num" :class="getClassColor(data.ido.ath_since_ido)">{{ toNumberCashFormat(data.ido.ath_since_ido, "x", "", "N/A") }}</p>
              </li>
              <!-- 筹款目标 -->
              <li class="flex justify-between mt-3">
                <label class="airdrop-title">{{ i18n.dapp.project.fundraising }}</label>
                <p class="airdrop-num">{{ toNumberCashFormat(data.ido.ido_fundraising_goal, price_unit, "", "TBA") }}</p>
              </li>
              <!-- 代币出售 -->
              <li class="flex justify-between mt-3">
                <label class="airdrop-title">{{ i18n.dapp.project.symbolSale }}</label>
                <p class="airdrop-num">
                  <span>{{ toNumberCashFormat(data.ido.ido_sale_amount, price_unit, "", "TBA") }}</span>
                  <span v-if="data.ido.ido_symbol" class="ml-0.5">{{ data.ido.ido_symbol }}</span>
                </p>
              </li>
              <!-- 来源平台 -->
              <li class="flex justify-between mt-3">
                <label class="airdrop-title">{{ i18n.home.topList.plat }}</label>
                <p class="airdrop-num">DAO Maker</p>
              </li>
              <!-- 活动时间 -->
              <li class="flex justify-between mt-3">
                <label class="airdrop-title">活动时间</label>
                <p class="airdrop-num">{{ timeFormat(data.ido.ido_start_at, data.ido.ido_end_at) }}</p>
              </li>
            </ul>
            <!-- 按钮 -->
            <div class="flex mt-5 justify-between">
              <v-router class="block h-11 bg-global-white border-1 border-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :class="(data.participation_url || data.website) && data.logo ? 'w-42.5' : 'w-87'" :href="data.participation_url || data.website" target="_blank">
                <span class="text-kd16px22px text-global-darkblue font-medium font-kdFang">参与教程</span>
              </v-router>
              <v-router v-show="data.participation_url || data.website" class="block w-42.5 h-11 ml-2 bg-global-primary rounded-md py-1.5 px-3 flex items-center justify-center" :href="data.participation_url || data.website" target="_blank">
                <span class="text-kd16px22px text-global-white font-medium font-kdFang">{{ i18n.home.idoIgoProject.join }}</span>
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
