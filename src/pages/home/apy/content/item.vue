<script lang="ts" setup>
import { PropType } from "vue";
import { ElButton } from "element-plus";
import IconFont from "src/components/icon/font.vue";
import I18n from "src/utils/i18n";
import type { ApyItem, PoolsItem } from "src/types/home/apy";
import { valueFormat, toFixed, toNumberCashFormat } from "src/utils";
import { config } from "src/router/config";

const props = defineProps({
  data: {
    type: Object as PropType<ApyItem>,
    required: true,
  },
});
const i18n = I18n();
const getWidth = function (value: PoolsItem, index: number) {
  if (value) {
    if (index === 0) {
      return 100;
    } else {
      let num = toFixed(props.data.pools[index].apy, 2) / toFixed(props.data.pools[0].apy, 2);
      return toFixed(num * 100, 2);
    }
  }
};
const getUrl = function (name: string) {
  if (name) {
    return `${config.apyToken}?symbol=${name}&category=mining`;
  }
};
</script>

<template>
  <div>
    <v-router class="block" :href="getUrl(data.symbol_name)" target="_blank">
      <div class="apy-item">
        <!-- 头像部分 -->
        <div class="flex items-center justify-between">
          <div class="flex items-center text-global-highTitle text-18-24 font-medium font-kdFang">
            <ui-image rounded class="w-10 h-10" :src="data.symbol_logo" :title="data.symbol_name" />
            <span class="ml-2 font-medium font-kdFang">{{ data.symbol_name }}</span>
          </div>
          <div class="flex flex-col items-end">
            <p class="flex items-center font-medium">
              <span class="text-global-highTitle text-12-16 item-font">{{ data.pools[0].project }} APY</span>
              <span class="text-global-numGreen text-18-24 font-kdFang ml-1 item-font">{{ valueFormat(toFixed(data.pools[0].apy, 2), "%") }}</span>
            </p>
            <p class="text-12-16 text-global-highTitle text-opacity-65">
              <span>TVL</span>
              <span>{{ toNumberCashFormat(data.pools[0].tvl, "$") }}</span>
            </p>
          </div>
        </div>
        <!-- 排行 -->
        <div class="mt-4.25">
          <p class="text-14-18 text-global-highTitle font-medium item-font">{{ i18n.home.apy.top }}</p>
          <div class="flex">
            <!-- 左侧图标 -->
            <div>
              <div v-for="(item, index) in data.pools" :key="index" class="mt-2.5 flex items-center" :class="index !== 0 ? 'opacity-60' : ''">
                <div class="w-6.5 h-6.5 relative">
                  <ui-image rounded class="w-full item-font" :src="item.project_logo" :title="item.project" />
                  <IconFont class="absolute -right-1 bottom-0 w-3.5 h-3.5 bg-global-white rounded-full text-global-highTitle text-opacity-25" type="icon-V" size="14" />
                </div>
                <IconFont class="mx-1.5" :type="item.chain" size="16" />
                <p class="w-23.5 text-14-18 text-global-highTitle font-medium item-font">{{ item.project }}</p>
              </div>
            </div>
            <!-- 右侧进度条 -->
            <div class="w-full ml-1.5">
              <template v-for="(item, index) in data.pools" :key="index">
                <div class="mt-2.5 h-6.5 py-0.5 relative">
                  <p class="w-full h-5.5 px-1 py-0.5 flex rounded justify-end text-14-18 font-semibold item-font" :class="index === 0 ? 'back text-global-numGreen' : 'backdrop text-global-highTitle'" :style="`--wv:${getWidth(item, index)}%`">
                    <span v-if="index === 0">BEST APY</span>
                    <span :class="index === 0 ? 'ml-1' : ''">{{ valueFormat(toFixed(item.apy, 2), "%") }}</span>
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
        <!-- 按钮 -->
        <div class="w-full h-11 flex items-center justify-center mt-4">
          <v-router class="w-full block text-16-22 text-global-darkblue font-kdFang font-medium" target="_blank">
            <client-only>
              <el-button class="text-16-22 w-full border-0" plain type="primary" size="large">
                <span>{{ i18n.home.apy.deposit }}</span>
              </el-button>
            </client-only>
          </v-router>
        </div>
      </div>
    </v-router>
  </div>
</template>

<style lang="scss" scoped>
.apy-item {
  @apply w-full min-h-69 border-1 border-global-highTitle border-opacity-6 p-4 rounded-md;
  background: linear-gradient(180deg, rgba(0, 111, 247, 0.05) 0%, rgba(250, 251, 252, 0) 100%, rgba(0, 111, 247, 0) 100%);
}
.back::before {
  content: "";
  z-index: 1;
  width: var(--wv);
  @apply absolute left-0 bottom-0.5 top-0.5 bg-global-numGreen bg-opacity-12;
  @apply rounded-kd6px;
}
.backdrop::before {
  content: "";
  z-index: 1;
  width: var(--wv);
  @apply absolute left-0 bottom-0.5 top-0.5 bg-global-highTitle bg-opacity-6;
  @apply rounded-kd6px;
}
.item-font {
  ::v-deep(.back-color) {
    @apply text-12-16;
  }
}
.item-font {
  font-family: "PingFang SC" !important;
}
</style>
