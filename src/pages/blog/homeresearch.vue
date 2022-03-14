<script setup lang="ts">
/**
 * @file 博客Reaearch模块
 * @author 18234114804@163.com
 */
import BlogResearchHeader from "src/pages/blog/research/header.vue"
import BlogResearchItem from "src/pages/blog/research/item.vue"

import I18n from "src/utils/i18n";


const i18n = I18n();
</script>
<template>
  <div>
    <!-- 头部 -->
    <div>
      <BlogResearchHeader/>
    </div>
    <!-- 列表内容 -->
    <div class="mt-4">
      <BlogResearchItem/>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>