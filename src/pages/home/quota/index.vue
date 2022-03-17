<script setup lang="ts">
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
      <h3 class="text-kd32px32px text-global-highTitle font-semibold font-kdSemiBold">
        <span>{{ i18n.menu.quota.title }}</span>
      </h3>
      <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2">
        <v-router :href="`${config.news}`" target="_blank" class="text-kd14px18px text-global-darkblue">
          <span class="blog-font hidden md:block font-kdFang">{{ i18n.home.idoIgoProject.all }}</span>
          <span class="blog-font block md:hidden font-kdFang">{{ i18n.home.more }}</span>
        </v-router>
      </div>
    </div>
    <div class="flex">
      <div class="h-120 overflow-y-auto mr-6 flex-1 w-1">
        <Calendar :data="quotaRes" :small="true">
          <template #default="{ data }">
            <ui-ad v-if="data.type" :data="data" />
            <Item v-else :data="data"></Item>
          </template>
        </Calendar>
      </div>
      <div class="h-120 w-101"></div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
