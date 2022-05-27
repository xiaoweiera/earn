<script setup lang="ts">
import { config as routerConfig } from "src/router/config";
import I18n from "src/utils/i18n";
import { PropType } from "vue";
import type { Chart } from "src/types/quota/";
import { toNumberCash } from "src/utils";
import OnFollow from "../follow/on.vue";
defineProps({
  data: {
    type: Object as PropType<Chart>,
    required: true,
  },
});

const i18n = I18n();
</script>

<template>
  <div class="shadow-base py-4 px-3 rounded-md">
    <div class="flex justify-between items-center">
      <!-- 标题 -->
      <v-router :href="`${routerConfig.quota}/${data.id}`" target="_blank" class="flex flex-1 w-1 items-center text-global-black-title">
        <h3 class="text-14-18 font-m truncate">{{ data.name }}</h3>
        <icon-vip class="ml-1" :type="data.chart_type" />
      </v-router>
      <div class="ml-2">
        <OnFollow :id="data.id" v-model:status="data.followed" />
      </div>
    </div>
    <div v-if="data.desc" class="mt-1">
      <ui-description :line="3" line-height="20px">
        <ui-markdown class="text-12-20" :value="data.desc" />
      </ui-description>
    </div>
    <!--    <div class="mt-1.5 flex items-center text-global-text-grey">-->
    <!--      <IconFont type="icon-users" size="16" />-->
    <!--      <span class="ml-1 text-12-16">{{ toNumberCash(data.follow_count) }}{{ i18n.news.detail.follow }}</span>-->
    <!--      <IconFont class="ml-3" type="icon-view" size="16" />-->
    <!--      <span class="ml-1 text-12-16">{{ toNumberCash(data.view_count) }}</span>-->
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
.markdown-container {
  ::v-deep(p) {
    @apply p-0;
  }
}
</style>
