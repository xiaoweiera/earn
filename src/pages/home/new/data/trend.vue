<script setup lang="ts">
import { onMounted } from "vue";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { Model } from "src/logic/home";
import { dataToTimestamp, formatDefaultTime, timeago } from "src/lib/tool";
import I18n from "src/utils/i18n";

const i18n = I18n();

const trend = createRef("API.home.getTrend", []);

onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(trend, () => api.getTrend());
});
</script>
<template>
  <div class="w-full h-full">
    <template v-for="(item, i) in trend.slice(0, 1)" :key="i">
      <v-router :href="item['url']" target="_blank" class="rounded-kd6px w-full h-full relative cursor-pointer">
        <div class="trend-blog">
          <div class="blog-name w-full font-kdSemiBold font-semibold">
            <span>Daily Trending</span>
            <span class="ml-1">({{ formatDefaultTime(item["release_date"], "MM/DD") }})</span>
          </div>
          <div v-if="item['label'].length > 0" class="blog-label w-full mt-1.5 font-kdFang">
            <span>{{ i18n.home.todayTrend.key }}:</span>
            <template v-for="(label, i) in item['label']" :key="i">
              <span>{{ label }}</span>
              <span v-if="i + 1 < item['label'].length">、</span>
            </template>
          </div>
          <div class="blog-label viewers">
            <span>{{ item["viewers"] ? item["viewers"] : 0 }} {{ i18n.home.todayTrend.read }}</span>
            <span v-if="item['release_date']" class="mx-1 gang text-kd12px16px">|</span>
            <span v-if="item['release_date']">{{ i18n.home.todayTrend.updateTime }}: {{ timeago(dataToTimestamp(item["release_date"])) }}</span>
          </div>
        </div>
        <ui-image class="trend-img" :src="item.cover" fit="cover" />
        <div class="blog-jian" />
      </v-router>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.trend-time {
  @apply text-kd12px18px md:text-kd14px18px;
}
.viewers {
  @apply absolute bottom-1 md:bottom-2.5;
}

.trend-img {
  @apply rounded-kd6px h-full  w-full;
}
.trend-blog {
  @apply absolute z-3 w-full h-full px-2 md:px-3;
}

.blog-jian {
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  @apply w-full h-full absolute left-0 top-0  z-2 rounded-kd6px;
}
.gang {
  opacity: 0.4;
}
.blog-name {
  @apply pt-1.5 md:pt-2.5 text-kd18px18px md:text-kd20px20px font-semiBold text-global-white;
}

.blog-label {
  @apply text-kd12px16px font-medium text-global-white;
}
</style>
