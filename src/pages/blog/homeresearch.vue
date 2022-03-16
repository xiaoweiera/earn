<script setup lang="ts">
/**
 * @file 博客 Reaearch 模块
 * @author 18234114804@163.com
 */
import BlogResearchHeader from "src/pages/blog/research/header.vue";
import BlogResearchItem from "src/pages/blog/research/item.vue";

import { Model } from "src/logic/blog";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { BlogData } from "src/types/blog/";
import * as alias from "src/utils/root/alias";
import { onMounted } from "vue";

// 创建列表对象并获取缓存数据
const BlogList = createRef<BlogData[]>(alias.blog.list, [] as any);

// 即将上线列表
const getBlogList = async function () {
  const model = new Model();
  return model.getBlogProjects();
};

onMounted(() => {
  // 判断列表数据是否为空，如果为空则获取最新数据
  onLoadRef(BlogList, getBlogList);
});
</script>
<template>
  <div>
    <!-- 头部 -->
    <div>
      <BlogResearchHeader />
    </div>
    <!-- 列表内容 -->
    <div class="w-full overflow-hidden mt-4">
      <BlogResearchItem v-if="BlogList" :list="BlogList" />
    </div>
  </div>
</template>
