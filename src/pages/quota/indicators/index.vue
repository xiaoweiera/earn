<script setup lang="ts">
/**
 * @file 推荐指标
 * @auth svon.me@gmail.com
 */

import API from "src/api";
import I18n from "src/utils/i18n/";
import { getEnv } from "src/config";
import { onMounted } from "vue";
import Item from "./item.vue";
import safeGet from "@fengqiaogang/safe-get";
import { getValue } from "src/utils/root/data";
import type { IndicatorItem } from "src/types/quota/";
import { alias } from "src/utils/ssr/ref";
import * as track from "src/logic/track";
import { config as routerConfig } from "src/router/config";

const env = getEnv();
const i18n = I18n();

let initValue = true;
const getInitValue = function () {
  if (initValue) {
    initValue = false;
    return getValue<IndicatorItem[]>(alias.quota.indicator, []);
  }
};

// 获取列表
const requestList = function (data: object) {
  const api = new API();
  return api.quota.getIndicator<IndicatorItem>(data);
};

const getClass = function (data: object): object {
  const type = safeGet<string>(data, "chart_type");
  return {
    "vip-40": type === "vip",
    "vip-pro-40": type === "vip_pro",
  };
};

const getHref = function (data: object): string {
  const id = safeGet<string>(data, "id");
  return `${routerConfig.quota}/${id}`;
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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <template v-for="(item, index) in scope.list" :key="index">
              <v-router class="block" :class="getClass(item)" :href="getHref(item)">
                <Item :data="item" />
              </v-router>
            </template>
          </div>
        </template>
      </ui-pagination>
      <v-router class="mt-6 block" :href="env.appDownload" target="_blank">
        <div class="hidden md:block">
          <ui-image :oss="true" :src="i18n.news.download.pc" />
        </div>
        <div class="block md:hidden">
          <ui-image :oss="true" :src="i18n.news.download.mobile" />
        </div>
      </v-router>
    </div>
  </div>
</template>
