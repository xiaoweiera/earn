<script setup>
import Filter from "./fiflter/block.vue"
import Card from "./card.vue"
import {ref, reactive} from "vue"
import safeGet from "@fengqiaogang/safe-get";
import API from "src/api/index";
import {chainName} from "src/logic/earn/index"
import {createRef} from "../../utils/ssr/ref";

const api = new API()
const param = reactive({
  chain: chainName.value,
  type: '',
  pageNo: 0,
  pageSize: 6,
  sortField: '',
  sortType: '',
  value: 0,
  returnRate: 0,
  flipRate: 0,
})
const isMore = ref(false)
const tabList = createRef("API.Earn.recommendTab", []);
const cardList = ref([])
const key = ref(0)
const tabSubmit = async (data) => {
  param.type = data['type']
  const res = await api.earn.getTableList(param)
  cardList.value = safeGet(res, 'body.items')
  key.value++
}
const more = () => {
  isMore.value = true
}
</script>
<template>
  <div>
    <!--    <div class="text-global-white">{{cardList}}</div>-->
    <Filter v-if="tabList.length" :data="tabList" @submit="tabSubmit"/>
    <!--card-->
    <div class="card-list mt-6" :key="key">
      <template v-for="item in cardList.slice(0,isMore?6:3)">
        <Card class="ml-6 mb-6 w-106" :data="item"/>
      </template>
    </div>
    <div v-if="!isMore" class="more" @click="more">View More</div>
  </div>
</template>
<style lang="scss" scoped>
.more {
  @apply text-kd16px24px text-global-hui01 bg-global-hui06 w-max mx-auto cursor-pointer;
  @apply flex items-center px-12.375 h-10 rounded-kd6px justify-center;
}

.card-list {
  @apply flex justify-start -ml-6 flex-wrap;
}
</style>
