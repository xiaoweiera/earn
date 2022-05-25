<script setup lang="ts">
import I18n from "src/utils/i18n";
import { PropType } from "vue";
import type { Data } from "src/types/quota/";
import { toNumberCash } from "src/utils";
import OnFollow from "../follow/on.vue";
defineProps({
  data: {
    type: Object as PropType<Data>,
    required: true,
  },
});

const i18n = I18n();
</script>

<template>
  <div class="content-wrap p-4 rounded-md">
    <div class="flex justify-between items-center">
      <!-- 标题 -->
      <div>
        <h3 class="text-24 text-global-black-title">{{ data.chart.name }}</h3>
      </div>
      <div>
        <OnFollow v-if="data.chart" :id="data.chart.id" v-model:status="data.chart.followed" />
      </div>
    </div>
    <div v-if="data.chart.desc" class="mt-3">
      <div class="pt-3 border-t border-dashed text-global-black-desc">
        <h4 class="text-12-16">{{ i18n.news.detail.caption }}</h4>
        <div class="mt-1">
          <ui-description :line="3" line-height="20px" view-all-bg="bg-global-topBg">
            <ui-markdown class="text-12-20" :value="data.chart.desc" />
          </ui-description>
        </div>
      </div>
    </div>
    <div class="mt-3 flex items-center text-global-text-grey">
      <IconFont type="icon-users" size="16" />
      <span class="ml-1 text-12-16">{{ toNumberCash(data.chart.follow_count) }}{{ i18n.news.detail.follow }}</span>
      <IconFont class="ml-3" type="icon-view" size="16" />
      <span class="ml-1 text-12-16">{{ toNumberCash(data.chart.view_count) }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-wrap {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
}
.markdown-container {
  ::v-deep(p) {
    @apply p-0;
  }
}
</style>
