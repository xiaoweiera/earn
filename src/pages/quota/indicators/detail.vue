<script setup lang="ts">
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted, ref } from "vue";
import { getValue } from "src/utils/root/data";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { Data, IndicatorDetail, DataMap } from "src/types/quota/";
import { Classify } from "src/utils/convert/classify";

import Item from "../list/item.vue";
import Calendar from "../calendar/index.vue";

const classify = Classify("published_at", "date");
const quotaList = ref<DataMap[]>([]);
const detail = createReactive<IndicatorDetail>("quota.detail", {} as IndicatorDetail);

// 获取指标对应的快讯数据
const onUpdateList = function () {
  const id = getValue<string>("query.id");
  if (id) {
    const api = new API();
    return api.quota.indicatorNewList<Data>(id);
  }
  return [];
};

// 当分页组件有数据变化时
const onChange = function (result: Data[][]) {
  // 数据进行分类
  const [, list] = result;
  const value = classify<Data>(list);
  quotaList.value = value as DataMap[];
};

onMounted(function () {
  // 判断 detail 是否为空，如果为空时则进行数据重新获取
  onLoadReactive(detail, () => {
    const id = getValue<string>("query.id");
    if (id) {
      const api = new API();
      return api.quota.getIndicatorDetail<IndicatorDetail>(id);
    }
  });
});
</script>

<template>
  <div class="py-6 px-4 bg-global-topBg min-h-150">
    <div v-if="detail && detail.id" class="max-w-full w-250 mx-auto">
      <div class="shadow p-4 rounded-md">
        <div class="text-global-black-title">
          <h3 class="text-18-24 font-m">{{ detail.name }}</h3>
        </div>
        <div class="mt-2.5">
          <ui-description :line="3" line-height="20px" view-all-bg="bg-global-topBg">
            <p class="text-12-20 text-global-black-desc">{{ detail.desc }}</p>
          </ui-description>
        </div>
        <div class="mt-2 flex items-center text-global-text-grey text-opacity-65">
          <IconFont type="icon-users" size="16" />
          <span class="ml-1 text-12-16">{{ detail.follow_count }}</span>
          <IconFont class="ml-3" type="icon-view" size="16" />
          <span class="ml-1 text-12-16">{{ detail.view_count }}</span>
        </div>
      </div>
      <!--快讯列表-->
      <div class="pt-9">
        <h5 class="text-18-24 mb-5">异动播报</h5>
        <ui-pagination :limit="20" :request="onUpdateList" @change="onChange">
          <div>
            <Calendar v-for="data in quotaList" :key="data.date" :data="data">
              <template #default="{ data }">
                <ui-ad v-if="data && data.type" :data="data" />
                <Item v-else-if="data" :data="data" />
              </template>
            </Calendar>
          </div>
        </ui-pagination>
      </div>
    </div>
  </div>
</template>
