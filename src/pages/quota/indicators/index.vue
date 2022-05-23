<script setup lang="ts">
/**
 * @file 推荐指标
 * @auth svon.me@gmail.com
 */

import API from "src/api";
import { onMounted } from "vue";
import IndicatorItem from "./item.vue";
import safeGet from "@fengqiaogang/safe-get";
import { getValue } from "src/utils/root/data";
import { IndicatorResult } from "src/types/quota/";
import { alias } from "src/utils/ssr/ref";
import * as track from "src/logic/track";

let initValue = true;
const getInitValue = function () {
  if (initValue) {
    initValue = false;
    return getValue<IndicatorResult[]>(alias.quota.indicator, []);
  }
};

// 获取 融资 列表
const requestList = function (data: object) {
  const api = new API();
  return api.quota.getIndicator(data);
};

const getClass = function (data: object) {
  const type = safeGet<string>(data, "chart_type");
  return {
    "vip-40": type === "vip",
    "vip-pro-40": type === "vip_pro",
  };
};

onMounted(function () {
  // 上传数据
  track.push(track.Origin.gio, track.event.quota.indicator);
});
</script>

<template>
  <div class="pb-6 md:pb-12 px-4 pt-6">
    <!-- 推荐指标 -->
    <div class="w-250 max-w-full mx-auto">
      <ui-pagination :limit="20" skin="pagination" :init-value="getInitValue()" :request="requestList">
        <template #default="scope">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <template v-for="(item, index) in scope.list" :key="index">
              <div :class="getClass(item)">
                <IndicatorItem :data="item" />
              </div>
            </template>
          </div>
        </template>
      </ui-pagination>
    </div>
  </div>
</template>
