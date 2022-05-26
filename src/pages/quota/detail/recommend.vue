<script setup lang="ts">
/**
 * @file 相关推荐
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import API from "src/api/";
import { onMounted, PropType } from "vue";
import { toNumberCash, Equals } from "src/utils";
import { IndicatorItem } from "src/types/quota/";
import { config as routerConfig } from "src/router/config";
import { alias, createRef, onLoadRef } from "src/utils/ssr/ref";
import OnFollow from "../follow/on.vue";

const props = defineProps({
  pid: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
});

const i18n = I18n();

const list = createRef<IndicatorItem[]>(alias.quota.recommend, []);

// 获取相关推荐数据
const getRecommend = function () {
  const model = new API();
  return model.quota.getRecommend<IndicatorItem[]>();
};

const filter = function (list: IndicatorItem[]): IndicatorItem[] {
  const array: IndicatorItem[] = [];
  for (const item of list) {
    if (props.pid && Equals(item.id, props.pid)) {
      continue;
    }
    array.push(item);
  }
  return array.slice(0, 4);
};

onMounted(function () {
  onLoadRef(list, getRecommend);
});
</script>

<template>
  <div v-show="list.length" class="bg-global-bg-grey rounded-md p-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <icon-font class="mr-1.5 text-global-darkblue" type="icon-xiegang" size="16" />
        <h3 class="text-16-24 text-global-black-title font-m">{{ i18n.news.detail.recommend }}</h3>
      </div>
      <v-router :href="routerConfig.quota" target="_blank" class="text-global-text-grey text-12-16 flex items-center">
        <span>{{ i18n.common.more }}</span>
        <icon-font type="icon-right" size="12" />
      </v-router>
    </div>
    <ul class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <template v-for="(data, index) in filter(list)" :key="index">
        <li class="block text-global-black-title">
          <div class="flex justify-between items-center">
            <v-router :href="`${routerConfig.quota}/${data.id}`" target="_blank" class="flex items-center flex-1 w-1 mr-2">
              <h4 class="truncate font-m text-14-18">{{ data.name }}</h4>
              <template v-if="Equals(data.chart_type, 'vip')">
                <div class="vip-icon w-6.5">
                  <icon-font class="icon-content" type="icon-VIP" size="26" />
                </div>
              </template>
              <template v-else-if="Equals(data.chart_type, 'vip_pro')">
                <div class="vip-icon w-10">
                  <icon-font class="icon-content" type="icon-a-VIPPro" size="40" />
                </div>
              </template>
            </v-router>
            <on-follow :id="data.id" v-model:status="data.followed">
              <span class="flex items-center text-global-darkblue">
                <IconFont type="icon-plus" size="16"></IconFont>
                <span>{{ i18n.common.follow }}</span>
              </span>
            </on-follow>
          </div>
          <v-router :href="`${routerConfig.quota}/${data.id}`" target="_blank" class="block mt-1.5 text-12-16 h-8 text-global-black-desc">
            <p class="text-opacity-65 line-clamp-2" v-text="data.desc"></p>
          </v-router>
          <div class="mt-2 flex items-center text-global-text-grey">
            <IconFont type="icon-users" size="16" />
            <span class="ml-1 text-12-16">{{ toNumberCash(data.follow_count) }}{{ i18n.news.detail.follow }}</span>
            <IconFont class="ml-3" type="icon-view" size="16" />
            <span class="ml-1 text-12-16">{{ toNumberCash(data.view_count) }}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.vip-icon {
  height: 18px;
  @apply flex ml-1 relative overflow-hidden;
  .icon-content {
    @apply absolute left-0 top-1/2 transform -translate-y-1/2;
  }
}
</style>
