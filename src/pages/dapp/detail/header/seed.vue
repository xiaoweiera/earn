<script lang="ts" setup>
/**
 * @file Seed
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import type { DAppData, DAppProject } from "src/types/dapp/data";
import type { PropType } from "vue";
import { toNumberFormat, dateYMDFormat } from "src/utils/";
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
  return !data.latest_investment;
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <Price :label="i18n.dapp.project.fundraising" value="Seed" />
      <div>
        <v-router v-if="data.website" :href="data.website" class="block mt-2" target="_blank">
          <client-only>
            <el-button class="text-16-20 bg-transparent" plain type="primary">
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
        <!--Amount 筹款目标-->
        <Td v-if="data.latest_investment.amount">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.project.fundraising }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.latest_investment.amount, "$") }}</b>
          </p>
        </Td>
        <!--Valuation 估值-->
        <Td v-if="data.latest_investment.valuation">
          <label class="text-12-18 text-global-highTitle text-opacity-65">Valuation</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.latest_investment.valuation, "$") }}</b>
          </p>
        </Td>

        <!--Date-->
        <Td v-if="data.latest_investment.invested_at">
          <label class="text-12-18 text-global-highTitle text-opacity-65">Date</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ dateYMDFormat(data.latest_investment.invested_at) }}</b>
          </p>
        </Td>
      </template>
    </Table>
  </div>
</template>
