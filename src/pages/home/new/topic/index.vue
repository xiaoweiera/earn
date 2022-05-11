<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { Model } from "src/logic/home";
import Table from "src/pages/home/table/index.vue";
const category = ref("NFT");
const topicIndex = ref(0);
const isLoad = ref(false);
const api = new Model();
const list = [
  { id: 1, name: "NFT", value: "NFT", icon: "icon-paihang" },
  { id: 2, name: "DApp", value: "DAPP", icon: "icon-nfttag" },
  // { id: 3, name: "APY", value: "APY", icon: "icon-apytag" },
];
const rank: any = createRef("API.home.getTopicRank", []);
const tabClick = async (value: string) => {
  if (isLoad.value) return;
  isLoad.value = true;
  category.value = value;
  topicIndex.value = 0;
  rank.value = await api.getTopicRank(category.value);
  isLoad.value = false;
};
const titleClick = (value: number) => (topicIndex.value = value);
// const i18n = I18n();
onMounted(() => {
  // 得到数据汇总
  onLoadRef(rank, () => api.getTopicRank(category.value));
});
</script>
<template>
  <div>
    <div class="flex items-center justify-center">
      <div class="w-92 h-11 md:h-14.25 bg-global-highTitle bg-opacity-6 rounded-md p-1 flex items-center hand">
        <div v-for="(item, index) in list" :key="index" :class="item.value === category ? 'tab-item tab-item-active' : 'tab-item'" @click="tabClick(item.value)">
          <IconFont class="xshidden" :type="item.icon" size="24" />
          <IconFont class="mdhidden" :type="item.icon" size="20" />
          <span class="ml-1.5 md:ml-3.5">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-4 showX">
      <template v-for="(item, i) in rank" :key="item.id">
        <div class="relative two-tag max-h-7">
          <div :class="topicIndex === i ? 'two-tag-active' : 'two-tag-default'" class="whitespace-nowrap" @click="titleClick(i)">{{ item.name }}</div>
        </div>
      </template>
    </div>
    <Table :key="topicIndex" :topic-index="topicIndex" :data="rank" />
    <Table />
    <UiLoading v-if="isLoad" class="fixed top-0 bottom-0 left-0 right-0" />
  </div>
</template>
<style scoped lang="scss">
.tab-item {
  @apply w-28.5 md:w-45 h-full flex items-center justify-center text-global-highTitle text-kd18px24px md:text-kd24px28px font-medium font-kdFang;
}
.tab-item-active {
  @apply bg-global-darkblue text-global-white rounded-md;
}
.two-tag {
  @apply cursor-pointer pb-2;
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
