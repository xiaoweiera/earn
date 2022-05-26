<script setup lang="ts">
import { onMounted, ref, reactive, watch } from "vue";
import { config } from "src/router/config";
import { createReactive, onLoadReactive, onUpdateReactive } from "src/utils/ssr/ref";
import { Model } from "src/logic/home";
import Table from "src/pages/home/topic/table.vue";
import safeGet from "@fengqiaogang/safe-get";
import I18n from "src/utils/i18n";
const i18n = I18n();
const param = reactive({
  category: "NFT",
  page: 1,
  page_size: 10,
});
const isLoad = ref(false);
const api = new Model();
const list = [
  { id: 1, name: "NFT", value: "NFT", icon: "icon-paihang" },
  { id: 2, name: "DApp", value: "DAPP", icon: "icon-NFTs" },
];
const topicId = ref(0);
let rank: any = createReactive("API.home.getTopicRank", {});
const initTopic = () => {
  const items: any = safeGet(rank, "items");
  if (items && items.length > 0) {
    topicId.value = items[0].id;
  }
};
initTopic();
const update = onUpdateReactive(rank, function () {
  return api.getRankTopic(param);
});
watch(rank, () => initTopic());
const tabClick = async (value: string) => {
  if (isLoad.value || value === param.category) return;
  isLoad.value = true;
  param.category = value;
  update();
  isLoad.value = false;
};
const titleClick = (id: number) => (topicId.value = id);
onMounted(() => {
  // 得到数据汇总
  onLoadReactive(rank, () => api.getRankTopic(param));
  initTopic();
});
</script>
<template>
  <div>
    <div class="flex items-center justify-center">
      <div class="h-11 w-full md:w-auto md:min-h-9.5 bg-global-highTitle bg-opacity-6 rounded-md p-1 flex items-center hand">
        <div v-for="(item, index) in list" :key="index" :class="item.value === param.category ? 'tab-item tab-item-active' : 'tab-item'" @click="tabClick(item.value)">
          <IconFont :type="item.icon" size="20" />
          <span class="ml-1.5 md:ml-3.5">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-4 showX md:justify-center">
      <template v-for="item in safeGet(rank, 'items')" :key="item.id">
        <div class="relative two-tag max-h-8">
          <div :class="topicId === item.id ? 'two-tag-active' : 'two-tag-default'" class="whitespace-nowrap" @click="titleClick(item.id)">
            {{ item.title }}
          </div>
        </div>
      </template>
    </div>
    <Table v-if="topicId !== 0" :id="topicId" :key="topicId" :isFilter="false" :isMore="false" />
    <div class="flex justify-center">
      <v-router :href="`${config.homeDetail}/${topicId}`" target="_blank" class="btn-more">
        <span class="more cursor-pointer">{{ i18n.common.button.more }}</span>
      </v-router>
    </div>
    <UiLoading v-if="isLoad" class="fixed top-0 bottom-0 left-0 right-0" />
  </div>
</template>
<style scoped lang="scss">
.more {
  @apply text-kd12px16px text-global-primary;
}
.btn-more {
  @apply bg-global-primary bg-opacity-6 w-max px-8 rounded-kd4px;
  @apply flex h-8 items-center hand mt-1.5;
}
.tab-item {
  @apply w-1/2  md:w-35 h-full flex items-center justify-center text-global-highTitle text-kd18px24px font-medium font-kdFang;
}

.tab-item-active {
  @apply bg-global-darkblue text-global-white rounded-md;
}

.two-tag {
  @apply cursor-pointer pb-4;
}

.two-tag-default {
  @apply text-kd16px22px text-global-highTitle font-medium;
}

.two-tag-active {
  @apply text-kd16px22px text-global-primary font-medium;
}

.two-tag-active::after {
  border: 1px solid #006ff7;
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.two-tag:not(:last-child) {
  @apply mr-10 whitespace-nowrap;
}
</style>
