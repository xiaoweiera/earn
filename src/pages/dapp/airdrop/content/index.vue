<script lang="ts" setup>
import DAppAirdropOngoing from "./ongoing.vue";
import DAppAirdropPotential from "./potential.vue";
import DAppAirdropUpcoming from "./upcoming.vue";
import DAppAirdropEnded from "./ended.vue";
import DAppAirdropHotOperation from "./hot/hot.vue";
import DAppAirdropHot from "./hot/index.vue";
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
    <div class="mt-3">
      <DAppAirdropHotOperation :limit="limit" />
    </div>
    <!-- 进行中 -->
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
      <div class="mt-3">
        <DAppAirdropOngoing :limit="limit * 2" />
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
        <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.potential)" name="router-link">
          <span>{{ i18n.common.button.viewAll }}</span>
          <IconFont class="ml-1" type="icon-right" size="12" />
        </v-router>
      </div>
      <div class="mt-3">
        <DAppAirdropPotential :limit="limit" />
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
        <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.upcoming)" name="router-link">
          <span>{{ i18n.common.button.viewAll }}</span>
          <IconFont class="ml-1" type="icon-right" size="12" />
        </v-router>
      </div>
      <div class="mt-3">
        <DAppAirdropUpcoming :limit="limit" />
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
        <v-router class="text-14-18 see-all link" :href="getAllHref(TabTypes.ended)" name="router-link">
          <span>{{ i18n.common.button.viewAll }}</span>
          <IconFont class="ml-1" type="icon-right" size="12" />
        </v-router>
      </div>
      <div class="mt-3">
        <DAppAirdropEnded :limit="limit" />
      </div>
    </div>
  </div>
  <div v-else class="airdrop-wrap">
    <DAppAirdropOngoing v-if="active === TabTypes.ongoing" />
    <DAppAirdropHot v-else-if="active === TabTypes.hot" />
    <DAppAirdropPotential v-else-if="active === TabTypes.potential" />
    <DAppAirdropUpcoming v-else-if="active === TabTypes.upcoming" />
    <DAppAirdropEnded v-else-if="active === TabTypes.ended" />
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
  ::v-deep(.airdrop-list) {
    @screen md {
      @apply grid grid-cols-2 gap-6;
    }
    @screen lg {
      @apply grid-cols-4;
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
