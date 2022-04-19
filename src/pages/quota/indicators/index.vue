<script setup lang="ts">
/**
 * @file 推荐指标
 * @auth svon.me@gmail.com
 */

import Tips from "src/pages/quota/tips.vue";
import IndicatorItem from "src/pages/quota/indicators/item.vue";
import { getValue } from "src/utils/root/data";
import { IndicatorResult } from "src/types/quota/index";
import { Model } from "src/logic/quota/index";
import { alias } from "src/utils/ssr/ref";

let initValue = true;
const getInitValue = function () {
  if (initValue) {
    initValue = false;
    return getValue<IndicatorResult[]>(alias.quota.indicator, []);
  }
};

// 获取 融资 列表
const requestList = function (data: object) {
  const model = new Model();
  const query = { ...data };
  return model.getIndicator(query);
};
</script>

<template>
  <div>
    <!-- 推荐指标 -->
    <div class="w-full md:w-234 mx-auto pt-6 pb-4 md:pb-12 flex justify-between">
      <div class="flex-1 pr-6">
        <!-- 头部 -->
        <div class="px-4 hidden md:block">
          <Tips />
        </div>
        <!-- 内容 -->
        <div>
          <ui-pagination :limit="20" skin="pagination" :init-value="getInitValue()" :request="requestList">
            <template #default="scope">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div v-for="(item, index) in scope.list" :key="index">
                  <IndicatorItem :data="item" />
                </div>
              </div>
            </template>
          </ui-pagination>
        </div>
      </div>
      <!-- 下载-->
      <div>
        <ui-app-download />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
