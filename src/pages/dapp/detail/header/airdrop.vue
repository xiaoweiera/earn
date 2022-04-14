<script lang="ts" setup>
/**
 * @file Airdrop
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { Progress } from "src/types/dapp/data";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import type { PropType } from "vue";
import { toNumberFormat, dateYMDFormat, isAfter } from "src/utils/";
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

const isFooterEmpty = function (data: DAppData) {
  if (!data.airdrop.airdrop_status || data.airdrop.airdrop_status === Progress.no) {
    return true;
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <Price :value="project.type" label="Status" :progress="data.airdrop.airdrop_status" />
      <div>
        <div v-if="isAfter(data.airdrop.airdrop_start_at)" class="p-1">
          <ui-time-blue :value="data.airdrop.airdrop_start_at" />
        </div>
        <div v-else-if="isAfter(data.airdrop.airdrop_end_at)" class="p-1">
          <ui-time-blue :value="data.airdrop.airdrop_end_at" />
        </div>
        <v-router v-if="data.website" :href="data.website" class="block mt-2" target="_blank">
          <client-only>
            <el-button class="text-16-20 w-full" type="primary">
              <span>Claim It</span>
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
        <!--Number of Winners 获奖人数-->
        <Td v-if="data.airdrop.airdrop_winner_count">
          <label class="text-12-18 text-global-highTitle text-opacity-65">
            <span>Number of Winners</span>
            <!--            <span>{{ i18n.airdrop.content.quota }}</span>-->
          </label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.airdrop.airdrop_winner_count) }}</b>
          </p>
        </Td>
        <!--Total Airdrop Amount-->
        <Td v-if="data.airdrop.airdrop_amount">
          <label class="text-12-18 text-global-highTitle text-opacity-65">Total Airdrop Amount</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.airdrop.airdrop_amount) }}</b>
          </p>
        </Td>
        <!--Airdrop Time-->
        <Td v-if="data.airdrop.airdrop_start_at || data.airdrop.airdrop_end_at">
          <label class="text-12-18 text-global-highTitle text-opacity-65">Airdrop Time</label>
          <p class="text-14-18 text-global-highTitle">
            <b v-if="isAfter(data.airdrop.airdrop_start_at)" class="font-m">
              <span>{{ dateYMDFormat(data.airdrop.airdrop_start_at) }}</span>
            </b>
            <b v-else class="font-m">
              <span>{{ dateYMDFormat(data.airdrop.airdrop_end_at) }}</span>
            </b>
          </p>
        </Td>
      </template>
    </Table>
  </div>
</template>
