<script lang="ts" setup>
/**
 * @file IDO/IGO/Airdrop
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import type { PropType } from "vue";
import { toNumberFormat, getNotEmptySize } from "src/utils/";
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

const isHeaderEmpty = function (data: DAppData): boolean {
  return getNotEmptySize(data.ido.ido_price) <= 0;
};

const isFooterEmpty = function (data: DAppData): boolean {
  const list = [data.ticker.mcap_tvl, data.ticker.tvl, data.ticker.h24volume, data.ticker.users];
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
        <template v-if="isHeaderEmpty(data)">
          <Not />
        </template>
        <template v-else>
          <Price :value="data.ido.ido_price" label="Token Price (ASDF)" unit="$" />
        </template>
        <div>
          <v-router v-if="data.website" :href="data.website" class="block" target="_blank">
            <client-only>
              <el-button class="text-16-20 bg-transparent" plain type="primary">
                <span>Go To DApp</span>
              </el-button>
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
          <!--TVL/MCap-->
          <Td v-if="data.ticker.mcap_tvl">
            <label class="text-12-18 text-global-highTitle text-opacity-65">TVL/MCap</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.ticker.mcap_tvl) }}</b>
            </p>
            <!--占位-->
            <ui-percent class="invisible" />
          </Td>
          <!--TVL-->
          <Td v-if="data.ticker.tvl">
            <label class="text-12-18 text-global-highTitle text-opacity-65">TVL</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.ticker.tvl, "$") }}</b>
            </p>
            <ui-percent :value="data.ticker.tvl_change_percent" />
          </Td>
          <!--Volume 发行总量-->
          <Td v-if="data.ticker.h24volume">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.count }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.ticker.h24volume) }}</b>
            </p>
            <ui-percent :value="data.ticker.h24volume_change_percent" />
          </Td>
          <!--Users 发行总量-->
          <Td v-if="data.ticker.users">
            <label class="text-12-18 text-global-highTitle text-opacity-65">User</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.ticker.users) }}</b>
            </p>
            <ui-percent :value="data.ticker.user_change_percent" />
          </Td>
        </template>
      </Table>
    </template>
  </div>
</template>
