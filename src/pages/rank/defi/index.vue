<script lang="ts" setup>
import Table from "src/pages/home/topic/table.vue";
import Ad from "src/pages/home/ad.vue";
import CommonTopics from "src/pages/home/recommend.vue";
import { onMounted } from "vue";
import * as track from "src/logic/track";
onMounted(() => {
  track.push(track.Origin.gio, track.event.rank.defi);
});
</script>
<template>
  <div class="py-4">
    <div class="md:max-w-360 mx-auto px-4 md:px-20">
      <div class="max-w-315 mx-auto">
        <CommonTopics class="mb-4 md:mb-6" :is-show-title="false" />
        <client-only>
          <Ad :position="24" class="my-4 md:my-6" />
          <!--          <Table :id="3"  />-->
        </client-only>
      </div>
    </div>
  </div>
</template>
