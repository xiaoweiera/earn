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
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import { dateFormat } from "src/utils";
import Item from "./item.vue";
import DApp from "./dapp.vue";

const i18n = I18n();

// 详情数据
const detail = createReactive<BlogDetail>(alias.blog.detail, {} as BlogDetail);

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
        <DApp />
        <!-- 标题 -->
        <div class="text-center mt-8">
          <div class="py-3 border-0 border-b border-dotted border-global-highTitle border-opacity-10">
            <h3 class="text-24 font-m text-global-highTitle">{{ detail.name }}</h3>
            <p class="mt-3 text-14-18 text-global-highTitle text-opacity-65">
              KingData ·
              {{ dateFormat(detail.release_date, "YYYY-MM-DD") }}
            </p>
          </div>
        </div>

        <!-- 博客内容 -->
        <div class="py-8">
          <div class="blog-content text-global-highTitle">
            <ui-markdown :value="detail.body" />
          </div>
          <div class="mt-14 text-center text-12-16">
            <p class="inline-block text-global-highTitle text-opacity-45">{{ i18n.blog.copyright }}</p>
          </div>

          <ui-lock>
            <div>
              <div v-if="detail.label && detail.label.length > 0" class="text-center text-12-16 text-global-highTitle text-opacity-85">
                <span class="inline-block mt-4">{{ i18n.blog.label }}</span>
                <span v-for="(value, index) in detail.label" :key="index" class="ml-4 mt-4 inline-block py-1 px-2 rounded-kd30px bg-global-highTitle bg-opacity-4">{{ value }}</span>
              </div>
            </div>
          </ui-lock>
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
    </div>
  </div>
</template>
