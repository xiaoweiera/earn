<script lang="ts" setup>
import { chainPage } from "src/logic/rank/config";
import Chains from "src/pages/rank/chains.vue";
import Table from "src/pages/rank/dapp/table.vue";
import Chart from "src/pages/rank/chart.vue";
import Info from "src/pages/rank/info.vue";
import Ad from "src/pages/home/ad.vue";
import CommonTopics from "src/pages/home/recommend.vue";
import I18n from "src/utils/i18n";
import { onMounted } from "vue";
import { config as routerConfig } from "src/router/config";
const i18n = I18n();
import * as track from "src/logic/track";
onMounted(() => {
  track.push(track.Origin.gio, track.event.rank.dapp);
});
</script>
<template>
  <div class="md:pb-13.5 pb-8 min-h-100 bg-global-topBg">
    <div class="mx-auto">
      <div class="jian pb-6">
        <!-- 占位符 -->
        <div class="is-web h-4.5 md:h-8"></div>
        <div class="lg:flex lg:flex-row max-w-360 mx-auto md:px-20 items-end flex-col items-stretch px-4 items-center">
          <div class="flex-1 w-full">
            <Info class="is-web" :title="i18n.dapp.rank.title" />
            <div class="w-full flex justify-center flex-wrap mt-4 md:mt-8">
              <Chains :page="chainPage.dapp_rank" :base-url="routerConfig.rankDapp" />
            </div>
          </div>
          <client-only class="md:ml-6 mt-4 md:mt-1.5 md:w-129.75 w-full">
            <Chart />
          </client-only>
        </div>
      </div>
      <div class="md:max-w-360 mx-auto px-4 md:px-20">
        <div class="max-w-315 mx-auto">
          <CommonTopics class="mb-4 md:mb-6" :is-show-title="false" />
          <Ad :position="24" class="my-4 md:my-6" />
          <Table />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.jian {
  background-image: linear-gradient(white, #fafbfc);
}
</style>
