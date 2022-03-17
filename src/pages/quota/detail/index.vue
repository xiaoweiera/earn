<script setup lang="ts">
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted } from "vue";
import Item from "../list/item.vue";
import Chart from "./chart.vue";
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

const detail = createReactive<Data>(alias.quota.detail, {} as Data);

onMounted(function () {
  onLoadReactive(detail, getDetail);
});
</script>

<template>
  <div class="bg-global-topBg pb-4 md:pb-12">
    <div class="md:max-w-235 mx-auto">
      <ui-box>
        <!--左侧详情-->
        <template #default>
          <div class="pl-4 lg:pl-0 pt-4 lg:pt-6 pr-4 lg:pr-6">
            <template v-if="detail && detail.id">
              <Chart :data="detail" />
              <Item class="mt-8" :data="detail" :is-list="false" />
            </template>
          </div>
        </template>
        <!--右侧 App 下载-->
        <template #right>
          <div class="pt-6">
            <Recommend class="mb-3" />
            <ui-app-download direction="horizontal" />
          </div>
        </template>
      </ui-box>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-box {
  --ui-box-right: 224px;
}
</style>
