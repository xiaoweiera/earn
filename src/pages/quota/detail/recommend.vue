<script setup lang="ts">
import safeGet from "@fengqiaogang/safe-get";

/**
 * @file 相关推荐
 * @author svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted } from "vue";
import type { Data } from "src/types/quota/";
import { getValue } from "src/utils/root/data";
import { config as routerConfig } from "src/router/config";
import { alias, createRef, onLoadRef } from "src/utils/ssr/ref";

// 获取相关推荐数据
const getRecommend = function () {
  // 获取当前指标 id
  const query = getValue<object>("query", {});
  const id = safeGet<string | number>(query, "id");
  if (id) {
    const model = new API();
    return model.quota.getRecommend<Data[]>(id);
  }
};

const list = createRef<Data[]>(alias.quota.recommend, []);

onMounted(function () {
  onLoadRef(list, getRecommend);
});
</script>

<template>
  <div v-show="list.length" class="bg-white recommend-box rounded-md p-4">
    <h3 class="text-16-24 text-global-highTitle font-m">相关推荐</h3>
    <ul class="pt-4">
      <li v-for="data in list" :key="data.id" class="text-12-16">
        <v-router class="block" :href="`${routerConfig.news}/${data.id}`" target="_blank" name="a">
          <h4 class="text-global-highTitle font-m">{{ data.chart.name }}</h4>
          <p class="mt-1 text-global-highTitle text-opacity-65 line-clamp-4" v-text="data.content"></p>
        </v-router>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.recommend-box {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
}

li {
  @apply mb-4 pt-4;
  @apply border-t border-solid border-global-highTitle border-opacity-10;
  &:first-child {
    @apply pt-0 border-0;
  }
  &:last-child {
    @apply mb-0;
  }
}
</style>
