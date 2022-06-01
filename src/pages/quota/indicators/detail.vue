<script setup lang="ts">
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import I18n from "src/utils/i18n/";
import { onMounted, ref } from "vue";
import OnFollow from "../follow/on.vue";
import safeGet from "@fengqiaogang/safe-get";
import { getValue } from "src/utils/root/data";
import * as track from "src/logic/track";
import { alias, createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { Data, IndicatorDetail, DataMap } from "src/types/quota/";
import { Classify } from "src/utils/convert/classify";

import Item from "../list/item.vue";
import Calendar from "../calendar/index.vue";

const i18n = I18n();
const limit = ref<number>(20);
const classify = Classify("published_at", "date");
const quotaList = ref<DataMap[]>([]);
const detail = createReactive<IndicatorDetail>(alias.quota.indicatorDetail, {} as IndicatorDetail);

const trackPush = (data: IndicatorDetail) => {
  track.push(track.Origin.gio, track.event.quota.indicatorDetail, {
    indicator_title: data.name,
    indicator_ID: data.id,
  });
};

let initStatus = true;
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

// 获取指标对应的快讯数据
const onUpdateList = function (query: object) {
  const id = getValue<string>("query.id");
  if (id) {
    const api = new API();
    const page = safeGet<number>(query, "page");
    return api.quota.indicatorNewList<Data>(id, page, limit.value);
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
  const id = getValue<string>("query.id");
  if (id && detail && detail.id) {
    trackPush(detail);
  }
  // 判断 detail 是否为空，如果为空时则进行数据重新获取
  onLoadReactive(detail, async () => {
    if (id) {
      const api = new API();
      const data = await api.quota.getIndicatorDetail<IndicatorDetail>(id);
      trackPush(data);
      return data;
    }
  });
});
</script>

<template>
  <div class="py-6 px-4 min-h-150">
    <div v-if="detail && detail.id" class="max-w-full w-250 mx-auto">
      <div class="shadow-base-small p-4 rounded-md">
        <div class="text-global-black-title flex items-center justify-between">
          <div class="flex items-center w-1 flex-1">
            <h3 class="text-18-24 font-m truncate">{{ detail.name }}</h3>
            <icon-vip class="ml-1" :type="detail.chart_type" />
          </div>
          <OnFollow :id="detail.id" v-model:status="detail.followed" :title="detail.name" />
        </div>
        <div class="mt-2.5">
          <ui-description :line="3" line-height="20px">
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
        <div class="flex items-center justify-between mb-5">
          <h5 class="text-18-24">{{ i18n.news.signals }}</h5>
          <ui-share :value="detail.name">
            <span class="text-global-text-grey flex items-center">
              <IconFont class="mr-1" size="16" type="icon-fenxiang1" />
              <span class="font-m text-14-18">{{ i18n.dapp.share.label }}</span>
            </span>
          </ui-share>
        </div>
        <ui-pagination :limit="limit" :init-value="initValue()" :request="onUpdateList" @change="onChange">
          <div class="signal-quota-list indicators-quota-list">
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
