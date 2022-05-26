<script lang="ts" setup>
import { onMounted } from "vue";
import * as track from "src/logic/track";
import { createReactive, onLoadReactive } from "src/utils/ssr/ref";
import type { topicDetail } from "src/types/home";
import { Model } from "src/logic/home";
import HomeDetailTopic from "./topic.vue";
import HomeDetailTop from "./top.vue";
import HomeDetailTable from "src/pages/home/topic/table.vue";
import HomeDetailInfo from "./info.vue";
import { useRoute } from "vue-router";
import safeGet from "@fengqiaogang/safe-get";
const route = useRoute();
const data = createReactive<topicDetail>("API.home.getDetail", {} as any);
onMounted(() => {
  const id: string = safeGet(route, "params.id");
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
  <div class="md:max-w-360 md:py-8 md:pb-30 md:px-20 mx-auto px-3">
    <div class="w-full md:flex justify-between">
      <HomeDetailInfo :data="data" class="mt-6 md:mt-0 min-h-37.5 flex-1" />
      <HomeDetailTop class="min-w-65 md:mt-0 mt-3 xshidden" />
    </div>
    <div class="flex">
      <HomeDetailTable v-if="data.id" class="mt-8 md:mr-12 flex-1" />
      <HomeDetailTopic class="mt-8 w-65 xshidden" />
    </div>
  </div>
</template>
