<script lang="ts" setup>
import Ongoing from "src/pages/dapp/airdrop/content/ongoing.vue";
import Potential from "src/pages/dapp/airdrop/content/potential.vue";
import Upcoming from "src/pages/dapp/airdrop/content/upcoming.vue";
import Ended from "src/pages/dapp/airdrop/content/ended.vue";
import Operation from "src/pages/dapp/airdrop/content/hot/operation.vue";
import Hot from "src/pages/dapp/airdrop/content/hot/index.vue";
import { computed, PropType, ref } from "vue";
import I18n from "src/utils/i18n";
import { TabTypes } from "src/types/dapp/airdrop";
import { AnyEquals } from "src/utils";
import { config } from "src/router/config";

const i18n = I18n();
const props = defineProps({
  active: {
    required: true,
    type: String as PropType<TabTypes>,
    default: () => TabTypes.all,
  },
});
const isAll = computed(() => {
  return AnyEquals(props.active, TabTypes.all);
});
const limit = ref<number>(4);

const getAllHref = function (key: string): string {
  return `${config.airdrop}/list/${key}`;
};
</script>

<template>
  <div v-if="isAll" class="content-wrap mt-8">
    <!-- 运营精选 -->
    <div class="flex items-center justify-between">
      <h3 class="text-16-24">
        <IconFont class="text-global-gemstone" type="icon-jiangbei" size="20" />
        <span class="ml-1.5">{{ i18n.airdrop.tabs.hot }}</span>
      </h3>
      <!-- 查看全部 -->
      <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.hot)">
        <span>{{ i18n.common.button.viewAll }}</span>
        <IconFont class="ml-1" type="icon-right" size="12" />
      </v-router>
    </div>
    <div class="mt-3 showX">
      <Operation :limit="limit" :show="false" />
    </div>
    <!--     进行中-->
    <div class="mt-16">
      <div class="flex items-center justify-between">
        <h3 class="text-16-24">
          <IconFont class="text-global-numGreen" type="icon-jinhangzhong" size="20" />
          <span class="ml-1.5">{{ i18n.airdrop.tabs.ongoing }}</span>
        </h3>
        <!-- 查看全部 -->
        <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.ongoing)">
          <span>{{ i18n.common.button.viewAll }}</span>
          <IconFont class="ml-1" type="icon-right" size="12" />
        </v-router>
      </div>
      <div class="mt-3 showX">
        <Ongoing :limit="limit" />
      </div>
    </div>
    <!--潜在优质空投-->
    <div class="mt-16">
      <div class="flex items-center justify-between">
        <h3 class="text-16-24">
          <IconFont class="text-global-gemstone" type="icon-recommend" size="20" />
          <span class="ml-1.5">{{ i18n.airdrop.tabs.potential }}</span>
        </h3>
        <!-- 查看全部 -->
        <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.potential)">
          <span>{{ i18n.common.button.viewAll }}</span>
          <IconFont class="ml-1" type="icon-right" size="12" />
        </v-router>
      </div>
      <div class="mt-3">
        <Potential :limit="limit" />
      </div>
    </div>
    <!-- 即将开始 -->
    <div class="mt-16">
      <div class="flex items-center justify-between">
        <h3 class="text-16-24">
          <IconFont class="text-global-numGreen" type="icon-online" size="20" />
          <span class="ml-1.5">{{ i18n.airdrop.tabs.upcoming }}</span>
        </h3>
        <!-- 查看全部 -->
        <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.upcoming)">
          <span>{{ i18n.common.button.viewAll }}</span>
          <IconFont class="ml-1" type="icon-right" size="12" />
        </v-router>
      </div>
      <div class="mt-3 showX">
        <Upcoming :limit="limit" />
      </div>
    </div>
    <!--已结束-->
    <div class="mt-16">
      <div class="flex items-center justify-between">
        <h3 class="text-16-24">
          <IconFont class="text-global-money" type="icon-history" size="20" />
          <span class="ml-1.5">{{ i18n.growthpad.status.closure }}</span>
        </h3>
        <!-- 查看全部 -->
        <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.ended)">
          <span>{{ i18n.common.button.viewAll }}</span>
          <IconFont class="ml-1" type="icon-right" size="12" />
        </v-router>
      </div>
      <div class="mt-3 showX">
        <Ended :limit="limit" />
      </div>
    </div>
  </div>
  <div v-else class="airdrop-wrap">
    <Ongoing v-if="active === TabTypes.ongoing" />
    <Hot v-else-if="active === TabTypes.hot" />
    <Potential v-else-if="active === TabTypes.potential" />
    <Upcoming v-else-if="active === TabTypes.upcoming" />
    <Ended v-else-if="active === TabTypes.ended" />
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  h3 {
    @apply flex items-center;
    @apply text-global-highTitle text-opacity-85;
  }
  .see-all {
    @apply flex items-center;
  }
  ::v-deep(.ui-pagination) {
    min-height: initial !important;
  }
  /* 隐藏加载更多 */
  ::v-deep(.page-more) {
    @apply hidden;
  }
  /* 空数据提示 */
  ::v-deep(.airdrop-empty) {
    @apply hidden;
  }
  /* 空数据提示 */
  ::v-deep(.operation-empty) {
    @apply hidden;
  }
  ::v-deep(.airdrop-list) {
    @apply inline-flex flex-nowrap;
    .airdrop-item {
      @apply w-78 mr-6 mb-0;
    }
    @screen md {
      @apply grid grid-cols-2 gap-6;
      .airdrop-item {
        @apply w-auto mr-0;
      }
    }
    @screen lg {
      @apply grid-cols-4;
      .airdrop-item {
        @apply w-auto mr-0;
      }
    }
  }
  ::v-deep(.categories-list) {
    .categories-item {
      &:first-child {
        @apply mr-0;
      }
      &:not(:first-child) {
        @apply hidden;
      }
    }
  }
  ::v-deep(.chain-list) {
    .chain-item {
      &:not(:first-child) {
        @apply hidden;
      }
    }
  }
}
.airdrop-wrap {
  ::v-deep(.airdrop-list) {
    @screen md {
      @apply grid grid-cols-2 gap-6;
    }
    @screen lg {
      @apply grid-cols-3;
    }
  }
}
</style>
