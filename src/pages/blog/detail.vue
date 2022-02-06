<script setup lang="ts">
/**
 * @file 博客详情
 * @author svon.me@gmail.com
 */

import _ from "lodash";
import Item from "./item.vue";
import * as API from "src/api";
import I18n from "src/utils/i18n";
import {useRoute} from "vue-router";
import {onMounted, toRaw} from "vue";
import {BlogDetail} from "src/types/blog/";
import safeGet from "@fengqiaogang/safe-get";
import {createReactive} from "src/utils/ssr/ref";

// 详情数据
const detail = createReactive<BlogDetail>("API.blog.getDetail", {} as BlogDetail);

const $router = useRoute();

const init = async function () {
  const params = toRaw($router.params);
  const id = safeGet<string>(params, "id");
  // 如果博客详情数据为空，同时 url 中有博客 id
  if (id && !detail.id) {
    const data = await API.blog.getDetail<BlogDetail>(id);
    if (data) {
      _.each(data, function (value: any, key: string) {
        // @ts-ignore
        detail[key] = value;
      });
    }
  }
};

onMounted(init);

</script>

<template>
  <div class="pt-5 pb-15 px-4 md:px-0 max-w-180 mx-auto">
    <div class="blog-detail">
      <div v-if="detail && detail.id">
        <!-- 标题 -->
        <div class="text-center">
          <div class="py-3 border-0 border-b border-dotted border-global-highTitle border-opacity-10">
            <h3 class="text-24 font-m text-global-highTitle">{{ detail.name }}</h3>
            <p class="mt-3 text-14-18 text-global-highTitle text-opacity-65">KingData ·
              {{ detail.release_date }}</p>
          </div>
        </div>

        <!-- 博客内容 -->
        <div class="py-8">
          <div class="blog-content text-global-highTitle">
            <ui-markdown :value="detail.body"/>
          </div>
          <div class="mt-14 text-center text-12-16">
            <p class="inline-block text-global-highTitle text-opacity-45">{{ I18n.blog.copyright }}</p>
          </div>
          <div class="text-center text-12-16 text-global-highTitle text-opacity-85" v-if="detail.label && detail.label.length > 0">
            <span class="inline-block mt-4">{{ I18n.blog.label }}</span>
            <span class="ml-4 mt-4 inline-block py-1 px-2 rounded-kd30px bg-global-highTitle bg-opacity-4" v-for="(value, index) in detail.label" :key="index">{{ value }}</span>
          </div>
        </div>


        <!-- 相关推荐 -->
        <div v-if="detail.relevant && detail.relevant.length > 0">
          <h4 class="text-18">{{ I18n.blog.share }}</h4>
          <div class="mt-3">
            <div class="md:grid grid-cols-3 gap-6">
              <Item class="relevant-item" v-for="(item, index) in detail.relevant" :key="index" :data="item"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


