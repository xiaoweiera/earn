<script lang="ts" setup>
/**
 * @file 博客详情
 * @author svon.me@gmail.com
 */

import safeGet from "@fengqiaogang/safe-get";
import { getDAppData } from "src/logic/blog/dapp";
import { getStatus } from "src/logic/ui/lock";
import type { BlogDetail } from "src/types/blog/";
import { Type } from "src/types/common/lock";
import type { DAppData } from "src/types/dapp/data";
import { dateFormat, isObject } from "src/utils";
import I18n from "src/utils/i18n";
import * as alias from "src/utils/root/alias";
import { getValue } from "src/utils/root/data";
import { createReactive, createRef, onLoadReactive, onLoadRef, onUpdateReactive } from "src/utils/ssr/ref";
import { onMounted } from "vue";
import DApp from "./dapp.vue";
import Item from "./item.vue";

const i18n = I18n();

// 详情数据
const detail = createReactive<BlogDetail>(alias.blog.detail, {} as BlogDetail);
const dApps = createRef<DAppData[]>(alias.blog.dApp, []);

const onUpdate = onUpdateReactive(detail, async function () {
  const data = await getStatus(Type.blog, detail.id);
  if (data && isObject(data)) {
    return data;
  }
  return {};
});

// 分享文案
const getShareText = function (list: DAppData[]): string {
  const text: string[] = [];
  const colon = i18n.common.symbol.colon;
  for (const item of list) {
    if (item) {
      const data = getDAppData(item);
      if (data) {
        text.push(data.name); // 项目名称
        text.push(`${data.totalText}${colon}${data.total}`); // 总量
        text.push(`${data.peopleText}${colon}${data.people}`); // 名额
        text.push(`${data.timeText}${colon}${data.time}`); // 时间
      }
    }
  }
  if (text.length > 0) {
    text.push(`${i18n.dapp.share.tutorial}${colon}`);
  }
  return text.join("\n");
};

onMounted(() => {
  // 如果博客详情数据为空，同时 url 中有博客 id
  const params = getValue<object>("query", {});
  const id = safeGet<string>(params, "id");
  if (id) {
    onLoadReactive(detail, alias.blog.detail, id);
    onLoadRef(dApps, alias.blog.dApp, id);
  }
});
</script>

<template>
  <div class="pt-5 pb-15 px-4 md:px-0 max-w-180 mx-auto">
    <div class="blog-detail">
      <div v-if="detail && detail.id">
        <template v-for="(item, index) in dApps" :key="index">
          <DApp :class="{ 'mt-4': index > 0 }" :data="getDAppData(item)" />
        </template>
        <!-- 标题 -->
        <div class="text-center mt-8">
          <div class="py-3 border-0 border-b border-dotted border-global-highTitle border-opacity-10">
            <h3 class="text-24 font-m text-global-highTitle">{{ detail.name }}</h3>
            <p class="mt-3 text-14-18 text-global-highTitle text-opacity-65">
              <span>KingData ·</span>
              <span>{{ dateFormat(detail.release_date, "YYYY-MM-DD") }}</span>
            </p>
          </div>
        </div>

        <!-- 博客内容 -->
        <div class="py-8">
          <div class="blog-content text-global-highTitle">
            <ui-markdown :value="detail.body" />

            <template v-if="detail.hidden_body">
              <template v-if="detail.share_required && !detail.share_unlocked">
                <ui-lock :id="detail.id" :data="detail" :text="getShareText(dApps)" type="blog" @sync="onUpdate" />
              </template>
              <ui-markdown v-else :value="detail.hidden_body" />
            </template>
          </div>

          <div class="mt-14 text-center text-12-16">
            <p class="inline-block text-global-highTitle text-opacity-45">{{ i18n.blog.copyright }}</p>
          </div>
          <div v-if="detail.label && detail.label.length > 0" class="text-center text-12-16 text-global-highTitle text-opacity-85">
            <span class="inline-block mt-4">{{ i18n.blog.label }}</span>
            <span v-for="(value, index) in detail.label" :key="index" class="ml-4 mt-4 inline-block py-1 px-2 rounded-kd30px bg-global-highTitle bg-opacity-4">{{ value }}</span>
          </div>
        </div>

        <!-- 相关推荐 -->
        <div v-if="detail.relevant && detail.relevant.length > 0">
          <h4 class="text-18">{{ i18n.blog.share }}</h4>
          <div class="mt-3">
            <div class="md:grid grid-cols-3 gap-6">
              <Item v-for="(item, index) in detail.relevant" :key="index" :data="item" class="relevant-item" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <ui-empty />
      </div>
    </div>
  </div>
</template>
