<script lang="ts" setup>
/**
 * @file NFT 数据
 * @auth svon.me@gmail.com
 */
import { toUpper } from "ramda";
import safeGet from "@fengqiaogang/safe-get";
import UiPercent from "src/components/ui/percent/index.vue";
import I18n from "src/utils/i18n/";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import type { PropType } from "vue";
import { ElButton } from "element-plus";
import Price from "./price.vue";
import Table from "./table.vue";
import Td from "./td.vue";
import Not from "./not.vue";
import { getNotEmptySize, formatCash } from "src/utils/";

const i18n = I18n();

defineProps({
  project: {
    required: true,
    type: Object as PropType<DAppProject>,
  },
  data: {
    required: true,
    type: Object as PropType<DAppData>,
  },
});

const isHeaderEmpty = function (data: DAppData): boolean {
  const price = safeGet<number>(data, "nft.floor_price");
  return getNotEmptySize(price) <= 0;
};

const isFooterEmpty = function (data: DAppData): boolean {
  const keys = ["nft.mint_price", "ticker.mcap", "ticker.h24volume", "nft.owners"];
  const list = keys.map(function (value: string) {
    return safeGet<number>(data, value);
  });
  return getNotEmptySize(list) <= 0;
};

const showTable = function (data: DAppData) {
  if (isHeaderEmpty(data) && isFooterEmpty(data)) {
    if (getNotEmptySize(data.website) > 0) {
      return false;
    }
  }
  return true;
};

const isAllEmpty = function (data: DAppData) {
  if (getNotEmptySize(data.website) > 0) {
    return false;
  }
  return isHeaderEmpty(data) && isFooterEmpty(data);
};
</script>

<template>
  <div>
    <div v-if="isAllEmpty(data)">
      <Not />
    </div>
    <template v-else>
      <div class="flex items-center justify-between">
        <template v-if="isHeaderEmpty(data) && isFooterEmpty(data)">
          <div></div>
        </template>
        <template v-else-if="isHeaderEmpty(data)">
          <Not />
        </template>
        <template v-else>
          <Price :label="i18n.dapp.priceData.floorPrice" :unit="data.nft.price_unit" :value="data.nft.floor_price" />
        </template>
        <div>
          <v-router v-if="data.website" :href="data.website" class="block" target="_blank">
            <client-only>
              <el-button class="text-16-20" type="primary">{{ i18n.dapp.detail.buy }}</el-button>
            </client-only>
          </v-router>
        </div>
      </div>
      <Table v-show="showTable(data)" class="mt-4">
        <template v-if="isFooterEmpty(data)">
          <Td>
            <Not />
          </Td>
        </template>
        <template v-else>
          <!-- Mint price -->
          <Td v-if="data.nft.mint_price">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.mintPrice }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ formatCash(data.nft.mint_price) }}</b>
              <b v-if="data.nft.price_unit" class="ml-0.5 font-m">{{ toUpper(data.nft.price_unit) }}</b>
            </p>
            <!--占位-->
            <ui-percent class="invisible" />
          </Td>
          <!--Market 市值-->
          <Td v-if="data.ticker.mcap">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.mcap }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ formatCash(data.ticker.mcap) }}</b>
            </p>
            <ui-percent :value="data.ticker.mcap_change_percent" />
          </Td>
          <!--Volume 发行总量-->
          <Td v-if="data.ticker.h24volume">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.count }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ formatCash(data.ticker.h24volume) }}</b>
            </p>
            <ui-percent :value="data.ticker.h24volume_change_percent" />
          </Td>
          <!--Owners 拥有者数量-->
          <Td v-if="data.nft.owners">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.owners }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ formatCash(data.nft.owners) }}</b>
            </p>
            <ui-percent :value="data.nft.owners_change_percent" />
          </Td>
        </template>
      </Table>
    </template>
    <!--图集-->
    <div class="clearfix">
      <div class="flex flex-wrap justify-end">
        <template v-for="(value, index) in data.gallery" :key="index">
          <div class="pt-4 ml-3 first:ml-0">
            <ui-image :preview="data.gallery" :src="value" class="w-20 h-20 rounded-md" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
