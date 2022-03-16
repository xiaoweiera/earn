<script lang="ts" setup>
/**
 * @file 指标列表
 * @auth svon.me@gmail.com
 */

import { ref } from "vue";
import DBList from "@fengqiaogang/dblist";
import { forEach, sort } from "src/utils/";
import API from "src/api/";
import type { Data, DataMap } from "src/types/quota/";
import { getValue } from "src/utils/root/data";
import { alias } from "src/utils/ssr/ref";
import Calendar from "../calendar/index.vue";
import Item from "./item.vue";

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

const quotaList = ref<DataMap[]>([]);
const db = new DBList([], "id", "date");

const onChange = function (result: Data[][]) {
  const [, list] = result;
  db.insert(list);
  // 从对象中获取所有的键
  // @ts-ignore
  const keys: string[] = [...db.data.keys()];
  // 过滤正确的分组数据
  const ids: string[] = [];
  forEach(function (value: string) {
    if (/^[\d]+$/.test(value)) {
      ids.push(value);
    }
  }, keys);
  //
  const array: DataMap[] = [];
  forEach(function (date: string) {
    const value: Data[] = db.select({ date });
    array.push({
      date,
      list: value,
    });
  }, sort(ids, void 0, true));
  // 更新数据
  quotaList.value = array;
};
</script>

<template>
  <ui-pagination :init-value="initValue" :limit="100" :request="getList" @change="onChange">
    <template #default>
      <div>
        <Calendar v-for="data in quotaList" :key="data.date" :data="data">
          <template #default="{ data }">
            <ui-ad v-if="data.type" :data="data" />
            <Item v-else :data="data"></Item>
          </template>
        </Calendar>
      </div>
    </template>
  </ui-pagination>
</template>
