<script lang="ts" setup>
/**
 * @file NFT 数据
 * @auth svon.me@gmail.com
 */

import { toUpper } from "ramda";
import UiPercent from "src/components/ui/percent/index.vue";
import I18n from "src/utils/i18n/";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import type { PropType } from "vue";
import { ElButton } from "element-plus";
import Price from "./price.vue";
import Table from "./table.vue";
import Td from "./td.vue";
import Not from "./not.vue";
import { toNumberFormat } from "src/utils/";

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
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <template v-if="data.nft.floor_price || data.nft.floor_price === 0">
        <Price :label="i18n.dapp.priceData.floorPrice" :unit="data.nft.price_unit" :value="data.nft.floor_price" />
      </template>
      <template v-else>
        <Not />
      </template>
      <div>
        <v-router v-if="data.website" :href="data.website" class="block" target="_blank">
          <client-only>
            <el-button class="text-16-20" type="primary">Buy Now</el-button>
          </client-only>
        </v-router>
      </div>
    </div>
    <Table v-if="data.nft.mint_price || data.ticker.mcap || data.ticker.h24volume || data.nft.owners" class="mt-4">
      <!-- Mint price -->
      <Td v-if="data.nft.mint_price">
        <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.mintPrice }}</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.nft.mint_price) }}</b>
          <b v-if="data.nft.price_unit" class="ml-0.5 font-m">{{ toUpper(data.nft.price_unit) }}</b>
        </p>
        <!--占位-->
        <ui-percent class="invisible" />
      </Td>
      <!--Market 市值-->
      <Td v-if="data.ticker.mcap">
        <label class="text-12-18 text-global-highTitle text-opacity-65">Market Cap(24H)</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.ticker.mcap) }}</b>
        </p>
        <ui-percent :value="data.ticker.mcap_change_percent" />
      </Td>
      <!--Volume 发行总量-->
      <Td v-if="data.ticker.h24volume">
        <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.count }}</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.ticker.h24volume) }}</b>
        </p>
        <ui-percent :value="data.ticker.h24volume_change_percent" />
      </Td>
      <!--Owners 拥有者数量-->
      <Td v-if="data.nft.owners">
        <label class="text-12-18 text-global-highTitle text-opacity-65">Owners(24H)</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.nft.owners) }}</b>
        </p>
        <ui-percent :value="data.nft.user_change_percent" />
      </Td>
    </Table>
    <template v-else>
      <Not />
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
