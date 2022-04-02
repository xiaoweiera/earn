<script lang="ts" setup>
import { onMounted } from "vue";
import { getValue } from "src/utils/root/data";
import * as track from "src/logic/track";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { detail } from "src/types/home";
import { Model } from "src/logic/home";
import HomeDetailTopic from "./topic.vue";
import HomeDetailTop from "./top.vue";
import HomeDetailTable from "./table.vue";
import HomeDetailInfo from "./info.vue";

const data = createReactive<detail>("API.home.getDetail", {} as any);
onMounted(() => {
  const id = getValue<string>("query.id", "");

  // 上报数据
  track.push(track.Origin.gio, track.event.subject.detail, {
    subject_detail_id: id,
  });

  // 得到数据汇总
  if (id) {
    onLoadReactive(data, () => {
      const api = new Model();
      return api.getDetail(id);
    });
  }
});
</script>
<template>
  <div class="md:max-w-360 md:py-8 md:pb-30 md:px-20 mx-auto px-3 flex">
    <div class="w-full md:mr-12">
      <HomeDetailInfo :data="data" class="mt-6 md:mt-0 min-h-37.5" />
      <HomeDetailTable v-if="data.id" :info="data" class="mt-8" />
    </div>
    <div class="min-w-65 xshidden">
      <HomeDetailTop />
      <HomeDetailTopic class="mt-8" />
    </div>
  </div>
</template>
