<script lang="ts" setup>
/**
 * @file NFT 数据
 * @auth svon.me@gmail.com
 */

import { toUpper } from "ramda";
import I18n from "src/utils/i18n/";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import type { PropType } from "vue";
import { ElButton } from "element-plus";
import Price from "./price.vue";
import Table from "./table.vue";
import Td from "./td.vue";
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
      <Price :label="i18n.dapp.priceData.floorPrice" :unit="data.nft.price_unit" :value="data.nft.floor_price" />
      <div>
        <v-router v-if="data.website" :href="data.website" class="block" target="_blank">
          <client-only>
            <el-button class="text-16-20" type="primary">Buy Now</el-button>
          </client-only>
        </v-router>
      </div>
    </div>
    <Table class="mt-4">
      <!-- Mint price -->
      <Td v-if="data.nft.mint_price">
        <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.mintPrice }}</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.nft.mint_price) }}</b>
          <b v-if="data.nft.price_unit" class="ml-0.5 font-m">{{ toUpper(data.nft.price_unit) }}</b>
        </p>
      </Td>
      <!--Volume 交易量-->
      <Td v-if="data.nft.market">
        <label class="text-12-18 text-global-highTitle text-opacity-65">Market Cap(24H)</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.nft.market) }}</b>
        </p>
      </Td>
      <!--Volume 发行总量-->
      <Td v-if="data.nft.issue_volume">
        <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.count }}</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.nft.issue_volume) }}</b>
        </p>
      </Td>
      <!--Owners-->
      <Td v-if="data.nft.owners">
        <label class="text-12-18 text-global-highTitle text-opacity-65">Owners(24H)</label>
        <p class="text-14-18 text-global-highTitle">
          <b class="font-m">{{ toNumberFormat(data.nft.owners) }}</b>
        </p>
      </Td>
    </Table>
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
