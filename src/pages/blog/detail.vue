<script setup lang="ts">
import * as API from "src/api";
import {onMounted} from "vue";
import I18n from "src/utils/i18n";
import {useRoute} from "vue-router";
import {BlogDetail} from "src/types/blog/";
import {createReactive} from "src/utils/ssr/ref";

const detail = createReactive<BlogDetail>("API.blog.getDetail", {} as BlogDetail);

const $router = useRoute();

const init = async function () {
  console.log($router.query.value, $router.params.value)
};

onMounted(init);

</script>

<template>
  <div class="blog-detail">
    <div v-if="detail && detail.id">
      <!-- 标题 -->
      <div class="py-3 border-0 border-b border-dotted border-global-highTitle border-opacity-10">
        <h3 class="text-24 font-m text-global-highTitle">{{ detail.name }}</h3>
        <p class="mt-3 text-14-18 text-global-highTitle text-opacity-65">KingData ·
          {{ detail.release_date }}</p>
      </div>
      <!-- 博客内容 -->
      <div class="py-8">
        <!-- <div class="blog-content whitespace-pre-line text-global-highTitle" v-html="detail.body"></div> -->
        <div class="blog-content whitespace-pre-line text-global-highTitle">
          <ui-markdown :value="detail.body"/>
        </div>
        <div class="mt-14 text-center text-12-16">
          <p class="inline-block text-global-highTitle text-opacity-45">{{ I18n.blog.copyright }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


