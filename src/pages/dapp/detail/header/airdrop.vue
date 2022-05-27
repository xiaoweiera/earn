<script lang="ts" setup>
/**
 * @file Airdrop
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { Progress } from "src/types/dapp/data";
import type { ProjectItem, DAppProject } from "src/types/dapp/detail";
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
    type: Object as PropType<ProjectItem>,
  },
});

const isFooterEmpty = function (data: ProjectItem) {
  if (!data.airdrop_status || data.airdrop_status === Progress.no) {
    return true;
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <Price :value="i18n.dapp.detail.airdrop" :label="i18n.dapp.detail.status" :progress="data.airdrop_status" />
      <div>
        <div v-if="isAfter(data.airdrop_start_at)" class="p-1">
          <ui-time-blue :value="data.airdrop_start_at" />
        </div>
        <div v-else-if="isAfter(data.airdrop_end_at)" class="p-1">
          <ui-time-blue :value="data.airdrop_end_at" />
        </div>
        <v-router v-if="data.website" :href="data.website" class="block mt-2" target="_blank">
          <client-only>
            <el-button class="text-16-20 w-full" type="primary">
              <span>{{ i18n.dapp.detail.claimIt }}</span>
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
        <Td v-if="data.airdrop_winner_count">
          <label class="text-12-18 text-global-highTitle text-opacity-65">
            <span>{{ i18n.dapp.detail.winNumber }}</span>
          </label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.airdrop_winner_count) }}</b>
          </p>
        </Td>
        <!--Total Airdrop Amount-->
        <Td v-if="data.airdrop_amount">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.airdropAmount }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.airdrop_amount) }}</b>
          </p>
        </Td>
        <!--Airdrop Time-->
        <Td v-if="data.airdrop_start_at || data.airdrop_end_at">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.airdropTime }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b v-if="isAfter(data.airdrop_start_at)" class="font-m">
              <span>{{ dateYMDFormat(data.airdrop_start_at) }}</span>
            </b>
            <b v-else class="font-m">
              <span>{{ dateYMDFormat(data.airdrop_end_at) }}</span>
            </b>
          </p>
        </Td>
      </template>
    </Table>
  </div>
</template>
