<script lang="ts" setup>
import { chainPage } from "src/logic/rank/config";
import Chains from "src/pages/rank/chains.vue";
import Table from "src/pages/rank/dapp/table.vue";
const Chart = asyncLoad(() => import("src/pages/rank/chart.vue"));
import Info from "src/pages/rank/info.vue";
import Ad from "src/pages/home/ad.vue";
import CommonTopics from "src/pages/home/recommend.vue";
import I18n from "src/utils/i18n";
import { onMounted } from "vue";
import { config as routerConfig } from "src/router/config";
const i18n = I18n();
import * as track from "src/logic/track";
import { asyncLoad } from "src/plugins/lazyload";
onMounted(() => {
  track.push(track.Origin.gio, track.event.rank.dapp);
});
</script>
<template>
  <div class="md:pb-13.5 pb-8 min-h-100 bg-global-topBg">
    <Comment :discuss="true" project-id="50676" />
  </div>
</template>
<style lang="scss" scoped>
.jian {
  background-image: linear-gradient(white, #fafbfc);
}
</style>
