<script lang="ts" setup>
/**
 * @file DApp
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import type { ProjectItem, DAppProject } from "src/types/dapp/detail";
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
    type: Object as PropType<ProjectItem>,
  },
});

const isHeaderEmpty = function (data: ProjectItem): boolean {
  return getNotEmptySize(data.price) <= 0;
};

const isFooterEmpty = function (data: ProjectItem): boolean {
  const list = [data.increment.mcapWithMaxSupplyTvl_7d, data.increment.tvl_24h, data.increment.volume_24h, data.increment.users_24h];
  return getNotEmptySize(list) <= 0;
};

const showTable = function (data: ProjectItem) {
  if (isHeaderEmpty(data) && isFooterEmpty(data)) {
    if (getNotEmptySize(data.website) > 0) {
      return false;
    }
  }
  return true;
};

const isAllEmpty = function (data: ProjectItem) {
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
          <Price :value="data.price" :label="i18n.dapp.detail.price" :symbol="data.ido_symbol" unit="$" />
        </template>
        <div>
          <v-router v-if="data.website" :href="data.website" class="block" target="_blank">
            <client-only>
              <el-button class="text-16-20 bg-transparent" plain type="primary">
                <span>{{ i18n.dapp.detail.go }}</span>
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
          <Td v-if="data.increment.mcapWithMaxSupplyTvl_7d">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.mcapTvl }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.increment.mcapWithMaxSupplyTvl_7d) }}</b>
            </p>
            <!--占位-->
            <ui-percent class="invisible" />
          </Td>
          <!--TVL-->
          <Td v-if="data.increment.tvl_24h">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.tvl }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.increment.tvl_24h, "$") }}</b>
            </p>
            <ui-percent :value="data.increment.tvl_24h_radio" />
          </Td>
          <!--Volume 发行总量-->
          <Td v-if="data.increment.volume_24h">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.priceData.count }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.increment.volume_24h) }}</b>
            </p>
            <!--占位-->
            <ui-percent class="invisible" />
            <!--            <ui-percent :value="data.increment.h24volume_change_percent" />-->
          </Td>
          <!--Users 发行总量-->
          <Td v-if="data.increment.users_24h">
            <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.rank.table.user }}</label>
            <p class="text-14-18 text-global-highTitle">
              <b class="font-m">{{ toNumberFormat(data.increment.users_24h) }}</b>
            </p>
            <ui-percent :value="data.increment.users_24h_radio" />
          </Td>
        </template>
      </Table>
    </template>
  </div>
</template>
