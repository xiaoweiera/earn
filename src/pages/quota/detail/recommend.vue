<script setup lang="ts">
/**
 * @file 相关推荐
 * @author svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import API from "src/api/";
import { onMounted, PropType } from "vue";
import { toNumberCash } from "src/utils";
import { IndicatorItem } from "src/types/quota/";
import { config as routerConfig } from "src/router/config";
import { alias, createRef, onLoadRef } from "src/utils/ssr/ref";
import OnFollow from "../follow/on.vue";

defineProps({
  pid: {
    type: [String, Number] as PropType<string | number>,
    default: "",
  },
});

const i18n = I18n();
// 获取相关推荐数据
const getRecommend = function () {
  const model = new API();
  return model.quota.getRecommend<IndicatorItem[]>();
};

const list = createRef<IndicatorItem[]>(alias.quota.recommend, []);

onMounted(function () {
  onLoadRef(list, getRecommend);
});
</script>

<template>
  <div v-show="list.length" class="text-global-bg-grey recommend-box rounded-md p-4">
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <icon-font class="mr-1.5 text-global-darkblue" type="icon-xiegang" size="16" />
        <h3 class="text-16-24 text-global-black-title font-m">{{ i18n.news.detail.recommend }}</h3>
      </div>
      <v-router :href="routerConfig.quota" target="_blank">
        <span class="text-global-text-grey text-12-16">
          <span>{{ i18n.common.more }}</span>
        </span>
      </v-router>
    </div>
    <ul class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <template v-for="(data, index) in list" :key="index">
        <li :class="{ hidden: !!(pid && data.id === pid) }">
          <v-router class="block" :href="`${routerConfig.quota}/${data.id}`" target="_blank" name="a">
            <div class="flex justify-between items-center">
              <div class="text-global-black-title font-m text-14-18">
                <h4 class="truncate">{{ data.name }}</h4>
              </div>
              <on-follow :id="data.id" v-model:status="data.followed">
                <span class="flex items-center text-global-darkblue">
                  <IconFont type="icon-plus" size="16"></IconFont>
                  <span>{{ i18n.common.follow }}</span>
                </span>
              </on-follow>
            </div>
            <div class="mt-2 text-12-16 h-8">
              <p class="text-global-black-desc text-opacity-65 line-clamp-2" v-text="data.desc"></p>
            </div>
            <div class="mt-2 flex items-center text-global-text-grey">
              <IconFont type="icon-users" size="16" />
              <span class="ml-1 text-12-16">{{ toNumberCash(data.follow_count) }}{{ i18n.news.detail.follow }}</span>
              <IconFont class="ml-3" type="icon-view" size="16" />
              <span class="ml-1 text-12-16">{{ toNumberCash(data.view_count) }}</span>
            </div>
          </v-router>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.recommend-box {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
}
</style>
