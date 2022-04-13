<script setup lang="ts">
import Introduction from "src/pages/dapp/detail/dashboard/introduction.vue";
import News from "src/pages/dapp/detail/dashboard/news.vue";
import Token from "src/pages/dapp/detail/token/index.vue";
import Information from "src/pages/dapp/detail/content/chain/index.vue";
import CommonTopics from "src/pages/home/recommend.vue";
import I18n from "src/utils/i18n";
const i18n = I18n();
defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
</script>
<template>
  <div>
    <div>
      <Token :value="data" />
    </div>
    <Information v-if="data.rank" :value="data" />
    <Introduction />
    <News />
    <div class="mt-4 md:mt-14 flex items-center justify-between">
      <div class="title font-kdFang">{{ i18n.home.hotRecommend }}</div>
      <div class="flex items-center">
        <span class="more">{{ i18n.home.lookMore }}</span>
        <iconFont class="text-global-highTitle text-opacity-65 ml-1" type="rightNo" size="12" />
      </div>
    </div>
    <CommonTopics :isShowTitle="false" />
  </div>
</template>
<style scoped lang="scss">
.title {
  @apply mb-3;
  @apply text-kd24px28px text-global-highTitle font-medium;
}
.more {
  @apply text-global-primary text-kd14px18px font-medium;
}
</style>
