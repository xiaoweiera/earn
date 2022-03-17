<script setup lang="ts">
import { Pointer } from "@element-plus/icons-vue";

/**
 * @file 指标
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n/";
import API from "src/api/";
import { onMounted, computed } from "vue";
import type { Data } from "src/types/quota/";
import { config } from "src/router/config";
import { alias, createRef, onLoadRef } from "src/utils/ssr/ref";
import Calendar from "src/pages/quota/calendar/index.vue";
import Item from "src/pages/quota/list/item.vue";
import Ad from "./ad.vue";
const i18n = I18n();
const list = createRef<Data[]>(alias.quota.signals, []);

const quotaRes = computed(function () {
  return {
    list: list.value,
  };
});

onMounted(function () {
  onLoadRef(list, function () {
    const api = new API();
    return api.quota.getSignals({
      page: 1,
      page_size: 30,
    });
  });
});
</script>

<template>
  <div>
    <div class="mb-5 flex items-center justify-between">
      <div class="flex items-end text-global-highTitle">
        <h3 class="text-kd32px32px text-global-highTitle font-semibold font-kdSemiBold">
          <span>{{ i18n.menu.quota.title }}</span>
        </h3>
        <p class="hidden md:block text-kd14px18px text-opacity-45 font-kdFang ml-4">
          {{ i18n.news.meta.title.sub }}
        </p>
      </div>
      <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2">
        <v-router :href="`${config.news}`" target="_blank" class="text-kd14px18px text-global-darkblue">
          <span class="blog-font hidden md:block font-kdFang">{{ i18n.home.idoIgoProject.all }}</span>
          <span class="blog-font block md:hidden font-kdFang">{{ i18n.home.more }}</span>
        </v-router>
      </div>
    </div>
    <div class="md:flex">
      <div class="h-120 md:flex-1 md:w-1 quota-shadow">
        <div class="h-full overflow-y-auto">
          <Calendar :data="quotaRes" :small="true">
            <template #default="{ data }">
              <ui-ad v-if="data.type" :data="data" />
              <Item v-else :data="data"></Item>
            </template>
          </Calendar>
        </div>
      </div>
      <div class="h-120 hidden md:block">
        <Ad />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.quota-shadow {
  @apply relative;
  &:after {
    content: '';
    @apply absolute left-0 right-0 bottom-0 h-10;
    background: linear-gradient(180deg, rgba(250, 251, 252, 0) 0%, #fafbfc 100%);
  }
}
</style>
