<script lang="ts" setup>
import Table from "src/pages/home/topic/table.vue";
import { asyncLoad } from "src/plugins/lazyload";
import Ad from "src/pages/home/ad.vue";
import CommonTopics from "src/pages/home/recommend.vue";
import I18n from "src/utils/i18n";
import { onMounted } from "vue";
const i18n = I18n();
import * as track from "src/logic/track";
const Chart = asyncLoad(() => import("src/pages/rank/chart.vue"));
onMounted(() => {
  track.push(track.Origin.gio, track.event.rank.dapp);
});
</script>
<template>
  <div class="py-4">
    <div class="md:max-w-360 mx-auto px-4 md:px-20">
      <div class="max-w-315 mx-auto">
        <CommonTopics class="mb-4 md:mb-6" :is-show-title="false" />
        <client-only>
          <Ad :position="24" class="my-4 md:my-6" />
          <Table :id="133" :limit="50" />
        </client-only>
      </div>
    </div>
  </div>
</template>
