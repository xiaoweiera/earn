<script lang="ts" setup>
/**
 * @file IDO
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import type { ProjectItem, DAppProject, Progress as ProjectProgress } from "src/types/dapp/detail";
import type { PropType } from "vue";
import { ProjectType } from "src/types/dapp/detail";
import { toNumberFormat, dateYMDFormat, isAfter, getNotEmptySize } from "src/utils/";
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
  progress: {
    type: String as PropType<ProjectProgress>,
    default: "",
  },
});

const isFooterEmpty = function (data: ProjectItem) {
  const list = [data.ido_price, data.ido_fundraising_goal, data.ido_start_at, data.ido_end_at];
  return getNotEmptySize(list) <= 0;
};

const getType = (data: DAppProject) => {
  if (data && data.type === ProjectType.igo) {
    return "IGO";
  } else {
    return "IDO";
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <Price label="Status" :value="getType(project)" :progress="data.ido_status"></Price>
      <div>
        <div v-if="isAfter(data.ido_start_at)" class="p-1">
          <ui-time-blue :value="data.ido_start_at" />
        </div>
        <div v-else-if="isAfter(data.ido_end_at)" class="p-1">
          <ui-time-blue :value="data.ido_end_at" />
        </div>
        <v-router v-if="data.website" :href="data.website" class="block mt-2" target="_blank">
          <client-only>
            <el-button class="text-16-20 w-full" type="primary">
              <span>{{ i18n.dapp.detail.participate }}</span>
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
        <!--IDO Price-->
        <Td v-if="data.ido_price">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.idoPrice }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.ido_price, "$") }}</b>
          </p>
        </Td>
        <!--Total Airdrop Amount 筹款目标-->
        <Td v-if="data.ido_fundraising_goal">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.project.fundraising }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b class="font-m">{{ toNumberFormat(data.ido_fundraising_goal, "$") }}</b>
          </p>
        </Td>
        <!--Airdrop Time-->
        <Td v-if="data.ido_start_at || data.ido_end_at">
          <label class="text-12-18 text-global-highTitle text-opacity-65">{{ i18n.dapp.detail.airdropTime }}</label>
          <p class="text-14-18 text-global-highTitle">
            <b v-if="isAfter(data.ido_start_at)" class="font-m">
              <span>{{ dateYMDFormat(data.ido_start_at) }}</span>
            </b>
            <b v-else class="font-m">
              <span>{{ dateYMDFormat(data.ido_end_at) }}</span>
            </b>
          </p>
        </Td>
      </template>
    </Table>
  </div>
</template>
