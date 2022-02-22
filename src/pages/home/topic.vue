<script setup lang="ts">
import HomeTable from './table/index.vue'
import {onMounted, ref} from 'vue'
import {oss} from "src/config";
import {createRef, onLoadRef} from "~/utils/ssr/ref";
import {Model} from "~/logic/home";

const list: any = ref([])
list.value = [
  {name: 'DeFi Daily Active User (24H) 🔥 🔥 🔥', key: 'one'},
  {name: 'DeFi Daily Active User (24H) 🔥 🔥 🔥', key: 'two'},
  {name: 'DeFi Daily Active User (24H) 🔥 🔥 🔥', key: 'stree'},
  {name: 'DeFi Daily Active User (24H) 🔥 🔥 🔥', key: 'four'},
  {name: 'DeFi Daily Active User (24H) 🔥 🔥 🔥', key: 'five'},
]
const topicIndex = ref(0)
const zhi = ref(0)
const selectTopic = (index: number) => {
  topicIndex.value = index
  if (zhi.value === 0) {
    zhi.value = 1
  } else {
    zhi.value = 0
  }
}
const rank = createRef("API.home.getTopicRank1", []);

onMounted(function () {
  const api = new Model();
  // 得到数据汇总
  onLoadRef(rank, () => api.getTopicRank());
});
</script>
<template>
  <div class="w-full flex justify-between">
    <!--   topic tag-->
    <div>
      <div class="flex items-center mt-2.5">
        <img class="w-4 h-4 mr-1.5 " :src="`${oss}/dapp/timeIcon.png`" alt="">
        <span class="des font-kdFang">Data during the last 24 hours:</span>
      </div>
      <div class="py-2.5">
        <template v-for="(item,index) in list" :key="item.key">
          <div class="topic" :class="topicIndex===index?'topic-active':'topic-default'" @click="selectTopic(index)">
            <span>🚀</span>
            <span class="ml-2.5">{{ item.name }}</span>
          </div>
        </template>
      </div>
    </div>
    <!--    topic table-->
    <div>
      <HomeTable :topicIndex="zhi"/>
    </div>
  </div>
  <!--  🚀 你好你好你好你好 (24H) 🔥-->
</template>
<style scoped lang="scss">
.des {
  @apply text-kd14px18px text-global-white font-medium;
}

.topic {
  transition: all 0.8s;
  @apply text-kd18px24px font-medium font-Fang cursor-pointer;
  @apply w-115 h-12 flex items-center rounded-kd40px  px-4;
}

.topic:not(:first-child) {
  @apply mt-5;
}

.topic:nth-child(odd) {
  @apply ml-10;
}

.topic-active {
  background: white;
  box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.22);

  @apply text-global-highTitle;
}

.topic-default {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.02) 100%);
  @apply text-global-white;
}
</style>
