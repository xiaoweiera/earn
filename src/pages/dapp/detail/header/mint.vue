<script lang="ts" setup>
/**
 * @file Mint
 * @auth svon.me@gmail.com
 */
import { toUpper } from "ramda";
import type { PropType } from "vue";
import I18n from "src/utils/i18n";
import { Progress } from "src/types/dapp/data";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import { formatCash, dateYMDFormat, isAfter } from "src/utils/";
import { ElButton } from "element-plus";
import Price from "./price.vue";
import Table from "./table.vue";
import Td from "./td.vue";
import Not from "./not.vue";

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

const isFooterEmpty = function (data: DAppData): boolean {
  return !(data.nft.mint_status && data.nft.mint_status !== Progress.no);
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <Price :progress="data.nft.mint_status" label="Status" value="Mint" />
      <div>
        <div v-if="isAfter(data.nft.mint_start_at)" class="p-1">
          <ui-time-blue :value="data.nft.mint_start_at" />
        </div>
        <div v-else-if="isAfter(data.nft.mint_end_at)" class="p-1">
          <ui-time-blue :value="data.nft.mint_end_at" />
        </div>
        <v-router v-if="data.website" :href="data.website" class="block mt-2" target="_blank">
          <client-only>
            <el-button class="text-16-20 bg-transparent w-full" plain type="primary">
              <span>{{ i18n.dapp.detail.go }}</span>
            </el-button>
          </client-only>
        </v-router>
      </div>
    </div>

    <Table class="mt-4">
      <Td v-if="isFooterEmpty(data)">
        <Not />
      </Td>
      <template v-else>
        <!-- Mint price -->
        <Td v-if="data.nft.mint_price">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.mintPrice }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ formatCash(data.nft.mint_price) }}</b>
            <b v-if="data.nft.price_unit" class="ml-0.5 font-m">{{ toUpper(data.nft.price_unit) }}</b>
          </p>
        </Td>
        <!--Mint Supply-->
        <Td v-if="data.nft.issue_volume">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.info.supply }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ formatCash(data.nft.issue_volume) }}</b>
          </p>
        </Td>

        <!--Date-->
        <Td v-if="data.nft.mint_start_at || data.nft.mint_end_at">
          <label class="text-12-18 text-global-highTitle text-opacity-65">Mint Time (UTC)</label>
          <p class="text-14-18 text-global-highTitle">
            <b v-if="isAfter(data.nft.mint_start_at)" class="font-m">
              {{ dateYMDFormat(data.nft.mint_start_at) }}
            </b>
            <b v-else class="font-m">
              {{ dateYMDFormat(data.nft.mint_end_at) }}
            </b>
          </p>
        </Td>
      </template>
    </Table>
  </div>
</template>
