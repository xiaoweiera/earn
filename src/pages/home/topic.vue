<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { oss } from "src/config";
import { createRef, onLoadRef } from "src/utils/ssr/ref";
import { Model } from "src/logic/home";
import I18n from "src/utils/i18n";
import HomeTable from "./table/index.vue";
let timeTool: any;
const topicIndex = ref(0);
const selectTopic = (index: number) => {
  clearInterval(timeTool);
  topicIndex.value = index;
};
const rank = createRef("API.home.getTopicRank", []);
const i18n = I18n();
onMounted(() => {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(rank, () => api.getTopicRank());
  timeTool = setInterval(() => {
    if (topicIndex.value + 1 < rank.value.length) {
      topicIndex.value++;
    } else {
      topicIndex.value = 0;
    }
  }, 5000);
});
onUnmounted(() => {
  clearInterval(timeTool);
});
</script>
<template>
  <div class="w-full flex justify-between md:flex-wrap">
    <!--   topic tag-->
    <div class="xshidden">
      <div class="flex items-center mt-2.5">
        <img class="w-4 h-4 mr-1.5 " :src="`${oss}/dapp/timeIcon.png`" alt="">
        <span class="des font-kdFang font-semibold">{{ i18n.home.topTip }}</span>
      </div>
      <div class="py-2.5">
        <template v-for="(item,index) in rank" :key="item.key">
          <div class="topic topic-wh" :class="topicIndex===index?'topic-active':'topic-default'" @click="selectTopic(index)">
            <span class="ml-2.5">{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
    <!--    topic table-->
    <HomeTable :topic-index="topicIndex" :data="rank" />
  </div>
</template>
<style scoped lang="scss">
.des {
  @apply text-kd14px18px text-global-white font-medium;
}

.topic {
  transition: all 0.8s;
  @apply text-kd18px24px font-medium font-Fang cursor-pointer;
  @apply flex items-center rounded-kd40px  px-4;
}
@screen md {
  .topic-wh{
    @apply w-115 h-12;
  }
}
@screen lg {
  .topic-wh{
    @apply  max-w-95 h-12;
  }
}
@screen xl {
  .topic-wh{
    @apply max-w-115 h-12;
  }
}

.topic:not(:first-child) {
  @apply mt-4;
}

.topic:nth-child(even) {
  @apply ml-10;
}

.topic-active {
  background: white;
  box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.22);

  @apply text-global-highTitle;
}

.topic-default {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.33) 0%, rgba(255, 255, 255, 0) 100%);
  @apply text-global-white;
}
</style>
