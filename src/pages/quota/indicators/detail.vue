<script setup lang="ts">
/**
 * @file 指标详情
 * @auth svon.me@gmail.com
 */
import API from "src/api/";
import { onMounted } from "vue";
import { getValue } from "src/utils/root/data";
import { createReactive, onUpdateReactive } from "src/utils/ssr/ref";
import type { IndicatorDetail } from "src/types/quota/";

const detail = createReactive<IndicatorDetail>("quota.detail", {} as IndicatorDetail);

const onUpdate = onUpdateReactive(detail, function () {
  const id = getValue<string>("query.id");
  if (id) {
    const api = new API();
    return api.quota.getIndicatorDetail<IndicatorDetail>(id);
  }
});

onMounted(onUpdate);
</script>

<template>
  <div class="py-6 px-4">
    <div v-if="detail && detail.id" class="max-w-full w-250 mx-auto">
      <div class="shadow p-4 rounded-md">
        <div class="text-global-highTitle">
          <h3 class="text-18-24 font-m">{{ detail.name }}</h3>
        </div>
        <div class="mt-2.5">
          <ui-description :line="3" :line-height="20">
            <p class="text-12-20 text-global-highTitle text-opacity-65">{{ detail.desc }}</p>
          </ui-description>
        </div>
        <div class="mt-2 flex items-center text-global-highTitle text-opacity-65">
          <IconFont type="icon-users" size="16" />
          <span class="ml-1 text-12-16">{{ detail.follow_count }}</span>
          <IconFont class="ml-3" type="icon-view" size="16" />
          <span class="ml-1 text-12-16">{{ detail.view_count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
