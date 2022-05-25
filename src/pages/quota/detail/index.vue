<script setup lang="ts">
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted } from "vue";
import { dateDiff } from "src/utils/";
import Item from "../list/item.vue";
import Chart from "./chart.vue";
import Vague from "../vague.vue";
import I18n from "src/utils/i18n/";
import Recommend from "./recommend.vue";
import safeGet from "@fengqiaogang/safe-get";
import type { Data } from "src/types/quota/";
import { getValue } from "src/utils/root/data";

import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";

const getDetail = function () {
  // 获取当前指标 id
  const query = getValue<object>("query", {});
  const id = safeGet<string | number>(query, "id");
  if (id) {
    const model = new API();
    return model.quota.getDetail(id);
  }
};

const getTitle = function (data: Data) {
  return data.title || data.chart.name;
};

const i18n = I18n();
const detail = createReactive<Data>(alias.quota.detail, {} as Data);

onMounted(function () {
  onLoadReactive(detail, getDetail);
});
</script>

<template>
  <div class="pb-4 md:pb-12">
    <div class="md:max-w-235 mx-auto">
      <ui-box>
        <!--左侧详情-->
        <template #default>
          <div class="pl-4 lg:pl-0 pt-4 lg:pt-6 pr-4 lg:pr-6">
            <template v-if="detail && detail.id">
              <div>
                <h3 class="text-32 text-global-black-title">{{ getTitle(detail) }}</h3>
              </div>
              <div class="mt-6 flex items-center justify-between">
                <span class="text-14-18 text-global-text-grey">{{ dateDiff(detail.published_at) }}</span>
                <ui-share :value="getTitle(detail)">
                  <span class="text-global-text-grey flex items-center">
                    <IconFont class="mr-1" size="16" type="icon-fenxiang1" />
                    <span class="font-m text-14-18">{{ i18n.dapp.share.label }}</span>
                  </span>
                </ui-share>
              </div>
              <Vague :data="detail">
                <Item class="mt-6" :data="detail" :is-list="false" />
              </Vague>
              <div class="py-8">
                <Chart :data="detail" />
              </div>
            </template>
            <!--推荐-->
            <div>
              <Recommend :pid="safeGet(detail, 'chart.id')" />
            </div>
          </div>
        </template>
        <!--右侧 App 下载-->
        <template #right>
          <div class="pt-4 md:pt-6">
            <ui-app-download />
          </div>
        </template>
      </ui-box>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-box {
  --ui-box-right: 184px;
}
</style>
