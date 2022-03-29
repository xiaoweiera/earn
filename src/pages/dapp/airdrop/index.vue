<script lang="ts" setup>
import DAppAridropContentTitle from "./content/title.vue";
import DAppAirdropAd from "./ad/index.vue";
import HomeAd from "src/pages/home/ad.vue";
import DAppAirdropContent from "./content/index.vue";

// import { uuid } from "src/utils";
import { tabs } from "src/logic/dapp/airdrop";
import { ref } from "vue";
import { TabItem } from "src/types/dapp/airdrop";
import { useRoute } from "vue-router";

// const key = ref<string>(uuid());
// const onChangeView = function (data: object) {
//
// }

const route = useRoute();
const getValue = function () {
  if (route && route.path) {
    return route.path.split("/")[3];
  }
  return "all";
};
const active = ref<string | number>(getValue());

const className = function (data: TabItem): string {
  let value: string = data.className ? data.className : "";
  if (data.id === active.value) {
    value = value ? `${value} active` : "active";
  }
  return value;
};
</script>

<template>
  <div class="bg-global-topBg pb-20 px-4 lg:px-0">
    <div class="max-w-300 mx-auto">
      <!-- 标题 -->
      <DAppAridropContentTitle class="w-full h-full" />
      <!-- 广告 -->
      <HomeAd class="w-full h-full mb-6" :position="24" />
      <!-- 分类 -->
      <ui-sticky active-class="table-box-title" class="is-tab bg-global-topBg">
        <div class="max-w-full showX flex items-end h-8.5 cursor-pointer">
          <div v-for="(item, index) in tabs()" :key="index" class="mr-14">
            <v-router :href="item.href" class="block whitespace-nowrap tab-item p-2" :class="className(item)">
              <div v-if="item.logo" class="flex items-center">
                <IconFont class="mr-1.5" :type="item.logo" size="24" />
                <span class="text-18-24 font-m">{{ item.name }}</span>
              </div>
              <span v-else class="text-18-24 font-m">{{ item.name }}</span>
            </v-router>
          </div>
        </div>
        <!--        <ui-tab :key="key" :list="tabs" @change="onChangeView"/>-->
      </ui-sticky>
      <!-- 广告 -->
      <DAppAirdropAd class="mt-8" />
      <!-- 内容 -->
      <DAppAirdropContent class="mt-8" :active="active" />
      <!--      <div>-->
      <!--      <div>-->
      <!--        &lt;!&ndash;      <UiFixTipApyFixed :apply="config.dappApply" :isApply="false" :isIdea="true"/>&ndash;&gt;-->
      <!--        &lt;!&ndash;      <UiHeaderTitle :value="I18n.menu.airdrop.title"/>&ndash;&gt;-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}
.is-tab {
  box-shadow: 0px 1px 0px rgba(3, 54, 102, 0.06);
  ::v-deep(.icon-font) {
    @apply text-kd24px24px;
  }
  .tab-item {
    @apply ml-8 text-global-highTitle text-opacity-45;
    @extend %first-ml0;

    &:after {
      @apply absolute left-0 right-0 bottom-0;
      @apply h-0.5 rounded-sm bg-global-darkblue;
    }
    &.active {
      @apply relative text-global-darkblue text-opacity-100;
      &:after {
        content: "";
      }
    }
    &:not(a) {
      &:not([href]) {
        @apply cursor-pointer ml-9;
        @extend %first-ml0;
      }
    }
  }
}
</style>
