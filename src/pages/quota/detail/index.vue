<script setup lang="ts">
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted, computed } from "vue";
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

const detail = createReactive<Data>(alias.quota.detail, {} as Data);

const detailId = computed<string>(function () {
  if (detail && detail.id) {
    return detail.id as string;
  }
  return "";
});

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
            <template v-if="detailId">
              <div>
                <h3 class="text-32 text-global-black-title font-b">{{ getTitle(detail) }}</h3>
              </div>
            </template>
            <!--推荐-->
            <div v-if="detailId">
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
