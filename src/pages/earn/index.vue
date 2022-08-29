<script setup>
import Chain from "./chains/chain.vue"
import Recommend from "./recommend.vue"
import Content from "./content.vue"
import {ref,onMounted} from "vue"
import { chainName } from "src/logic/earn/index"
import {createRef} from "../../utils/ssr/ref";
const key=ref(0)
const chainList = createRef("API.Earn.Chain", []);
const changeChain=()=>key.value++

</script>
<template>
  <div  class="px-15 text-global-white">
    <div class="title">Follow Smart Money - Easy to Earn</div>
    <Chain class="mt-6 flex justify-center" @submit="changeChain"/>
    <div v-if="chainName" :key="key">
      <div class="mt-6 text-kd20px28px huawei-medium text-global-hui01">Top NFT Trader</div>
      <Recommend class="mt-3" />
      <Content class="mt-12" />
    </div>

  </div>
</template>
<style lang="scss" scoped>
.title{
  @apply mt-12 text-kd48px56px text-global-hui01 huawei-bold text-center;
}
</style>