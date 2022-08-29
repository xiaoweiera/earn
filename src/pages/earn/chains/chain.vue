<script setup>
import { chainName } from "src/logic/earn/index"
import {ref} from 'vue'
import safeGet from "@fengqiaogang/safe-get";
import {createRef} from "../../../utils/ssr/ref";
const chainList = createRef("API.Earn.Chain", []);
const emit=defineEmits(['submit'])
if(safeGet(chainList.value,'length')>0){
  chainName.value=chainList.value[0]['simpleName']
}
const chainIndex=ref(0)
const selectChain=(i)=>{
  chainIndex.value=i
  chainName.value=chainList.value[i]['simpleName']
  emit('submit',chainList.value[i]['simpleName'])
}
</script>
<template>
  <div class="text-center">
    <template v-for="(item,i) in chainList">
      <div :class="chainIndex===i?'chain-select':'chain-default'" class="cursor-pointer huawei-medium tag" @click="selectChain(i)">
        <img class="w-5.5 h-5.5 mr-1.5" :src="item['tokenLogo']">
        <span class="select-txt">{{item['name']}}</span>
      </div>
    </template>

  </div>
</template>
<style lang="scss">
.chain-select{
  background: #5F7AE3;
  border-radius: 136px;
  border:1px solid #5F7AE3;
  @apply h-10 px-5 text-kd16px24px text-global-hui01 flex items-center w-max;
}
.chain-default{
  background: #FFFFFF00;
  border-radius: 136px;
  @apply h-10 px-5 flex text-kd16px24px items-center w-max border-1 border-global-hui06 text-global-hui02;
}
.select-txt{
  @apply text-global-hui01 text-kd16px24px;
}
.tag:not(:first-child){
  @apply ml-6;
}
</style>