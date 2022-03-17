<script lang="ts" setup>
/**
 * @file 指标列表
 * @auth svon.me@gmail.com
 */

import DBList from "@fengqiaogang/dblist";
import { last } from "lodash";
import API from "src/api/";
import { notifyMe } from "src/plugins/webkit/notice";
import type { Data, DataMap } from "src/types/quota/";
import { forEach, sort, uuid } from "src/utils/";
import { getValue } from "src/utils/root/data";
import { alias } from "src/utils/ssr/ref";
import { onMounted, ref } from "vue";
import Calendar from "../calendar/index.vue";
import Item from "./item.vue";
import Tips from "../tips.vue";
import { ElAlert } from "element-plus";

let initStatus = true;

// 获取列表数据
const getList = function (query?: object) {
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
const diffTime = 1000 * 30;
const contentId = ref<string>(uuid());
const quotaList = ref<DataMap[]>([]);
const newCount = ref<number>(0);
const db = new DBList([], "id", "date");
const cacheDb = new DBList([], "id", "date");

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

// 从服务端获取新数据，比较是否需要提示用户有新咨询
const diff = async function () {
  const list = await getList(); // 获取最新的列表
  let diffCount = 0;
  // 过滤数据
  forEach(function (data: Data) {
    const where = { id: data.id };
    // 判断是否在历史数据中存在
    // 判断是否在新消息数据中
    if (db.selectOne(where) || cacheDb.selectOne(where)) {
      return;
    }
    cacheDb.insert(data);
    diffCount++;
  }, list);

  // 缓存中的列表数据
  // @ts-ignore
  newCount.value = cacheDb.size();

  if (diffCount > 0) {
    const item = last(cacheDb.select<Data>());
    if (item) {
      notifyMe({
        title: item.chart.name,
        options: {
          body: item.content,
          requireInteraction: true, // 不自动关闭通知
          icon: "https://res.kingdata.xyz/nav/kingdata.png",
        },
        callback: function () {
          onSync();
        },
      });
    }
  }
  // 准备下一次刷新
  setTimeout(diff, diffTime);
};

const onSync = function () {
  newCount.value = 0;
  // 清空数据
  db.clear();
  cacheDb.clear();
  contentId.value = uuid();
};

onMounted(function () {
  setTimeout(diff, diffTime);
});
</script>

<template>
  <div>
    <div v-show="newCount > 0" class="new-tips top-header">
      <div class="tips-content cursor-pointer" @click="onSync">
        <el-alert :title="`有 ${newCount} 条新播报，点击加载`" type="error" center :closable="false" />
      </div>
    </div>
    <ui-box>
      <!--左侧列表-->
      <div class="lg:pr-4 pt-4">
        <Tips />
        <ui-pagination :key="contentId" :init-value="initValue" :limit="100" :request="getList" @change="onChange">
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
      </div>
      <!--右侧 App 下载-->
      <template #right>
        <div class="pt-4">
          <ui-app-download />
        </div>
      </template>
    </ui-box>
  </div>
</template>

<style lang="scss" scoped>
.ui-box {
  --ui-box-right: 184px;
}
.new-tips {
  @apply fixed z-10020 left-0;
  .tips-content {
    @apply w-screen px-4;
    transition: all 0.3s;
    .el-alert {
      @apply px-8 rounded;
    }
  }
  @screen md {
    @apply left-1/2 transform -translate-x-1/2 translate-y-3;
    .tips-content {
      width: initial;
    }
  }
}
</style>
