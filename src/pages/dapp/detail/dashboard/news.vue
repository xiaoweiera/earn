<script setup lang="ts">
import { getValue } from "src/utils/root/data";
import { toArray } from "src/utils";
import { dateDiff } from "src/utils/";
import API from "src/api";
import { getInject } from "src/utils/use/state";

const detail: any = getInject("detailState");

const initValue = function () {
  const data = getValue("API.dapp.news", []);
  if (data.length > 0) {
    return data;
  }
};
const requestList = async function (query: object) {
  const api = new API();
  const params: any = { ...query, id: detail.id };
  const res: any = await api.dApp.getNews(params);
  return toArray(res);
};
</script>
<template>
  <div>
    <ui-pagination :limit="5" :init-value="initValue()" :request="requestList">
      <template #default="scope">
        <div>
          <template v-for="(item, index) in scope.list" :key="index">
            <v-router :href="item.url" target="_blank" class="card flex items-center justify-between">
              <div class="flex-1 overflow-hidden">
                <p class="content short">{{ item.title }}</p>
                <div class="tip flex items-center">
                  <p>KingData</p>
                  <p class="mx-1">·</p>
                  <p>{{ dateDiff(item.release_ts) }}</p>
                </div>
              </div>
              <div class="flex items-center text-global-primary ml-5">
                <p class="text-kd16px22px font-medium">View</p>
                <IconFont class="ml-0.5" size="16" type="rightNo" />
              </div>
            </v-router>
          </template>
        </div>
      </template>
    </ui-pagination>
  </div>
</template>
<style scoped lang="scss">
.content {
  @apply text-global-highTitle text-kd16px22px font-medium;
}
.tip {
  @apply text-kd13px18px text-global-highTitle text-opacity-65;
}
.card {
  border-bottom: 1px solid rgba(3, 54, 102, 0.06);
  @apply py-3 cursor-pointer;
}
.card:hover {
  background: #fafbfc;
}
</style>
