<script setup lang="ts">
/**
 * @file 指标列表
 * @auth svon.me@gmail.com
 */

import API from "src/api/";
import Item from "./item.vue";
import type { Data } from "src/types/quota/";
import { alias } from "src/utils/ssr/ref";
import { getValue } from "src/utils/root/data";

let initStatus = true;

// 获取列表数据
const getList = function (query: object) {
  const model = new API();
  return model.quota.getSignals<Data>(query);
};

// 初始值
const initValue = function () {
  if (initStatus) {
    initStatus = false;
    const value = getValue(alias.quota.signals, []);
    if (value && value.length > 0) {
      return value;
    }
  }
  return null;
};
</script>

<template>
  <ui-pagination :init-value="initValue" :limit="100" :request="getList">
    <template #default="scope">
      <div v-for="data in scope.list" :key="data.id" class="mb-10">
        <ui-ad v-if="data.type" :data="data" />
        <Item v-else :data="data" />
      </div>
    </template>
  </ui-pagination>
</template>
