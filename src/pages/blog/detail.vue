<script setup lang="ts">
/**
 * @file 博客详情
 * @author svon.me@gmail.com
 */

import { onMounted } from "vue";
import I18n from "src/utils/i18n";
import type { BlogDetail } from "src/types/blog/";
import safeGet from "@fengqiaogang/safe-get";
import * as alias from "src/utils/root/alias";
import { getValue } from "src/utils/root/data";
import { createReactive, onLoadReactive, onUpdateReactive } from "src/utils/ssr/ref";
import { dateFormat, isObject } from "src/utils";
import { getStatus } from "src/logic/ui/lock";
import { Type } from "src/types/common/lock";
import Item from "./item.vue";
import DApp from "./dapp.vue";

const i18n = I18n();

// 详情数据
const detail = createReactive<BlogDetail>(alias.blog.detail, {} as BlogDetail);

const onUpdate = onUpdateReactive(detail, async function () {
  const data = await getStatus(Type.blog, detail.id);
  if (data && isObject(data)) {
    return data;
  }
  return {};
});

// 分享文案
const getShareText = function (data: BlogDetail) {
  const colon = i18n.common.symbol.colon;
  return `${data.name}
空投总量${colon}100
空投名额${colon}100
空投时间${colon}100
教程链接${colon}`;
};

onMounted(() => {
  // 如果博客详情数据为空，同时 url 中有博客 id
  const params = getValue<object>("query", {});
  const id = safeGet<string>(params, "id");
  if (id) {
    onLoadReactive(detail, alias.blog.detail, id);
  }
});
</script>

<template>
  <div class="pt-5 pb-15 px-4 md:px-0 max-w-180 mx-auto">
    <div class="blog-detail">
      <div v-if="detail && detail.id">
        <template v-for="(item, index) in detail.tutorial_dapps" :key="index">
          <DApp v-if="index < 1 && item" :data="item" />
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
                <ui-lock :id="detail.id" type="blog" :text="getShareText(detail)" :data="detail" @sync="onUpdate" />
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
              <Item v-for="(item, index) in detail.relevant" :key="index" class="relevant-item" :data="item" />
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
