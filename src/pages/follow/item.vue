<script setup>
import Card from "./card.vue"
import _ from "lodash";
import { dateDiff } from "src/utils";
import {icons} from 'src/logic/earn'
import { toNumberCashFormat } from "src/utils/convert/to";
const props=defineProps({
  data:{
    type:Object,
    required:true
  }
})
const getPrice=()=>{
  if(props.data['eventType']==='buy') return toNumberCashFormat(props.data['buyPrice'])
  return toNumberCashFormat(props.data['sellPrice'])
}
const getGas=()=>{
  if(props.data['eventType']==='buy' || props.data['eventType']==='mint') return toNumberCashFormat(props.data['buyGas'])
  return toNumberCashFormat(props.data['sellGas'])
}
</script>
<template>
  <div class="flex mt-6 pb-6 huawei-medium border-b-1 border-global-hui10">
    <div class="flex flex-1 mr-6">
      <ui-image class="logo mr-3" :src="data['headPic']" rounded/>
     <div class="flex-1">
       <div class="w-full">
         <div class="flex items-center">
           <span class="text-kd16px24px text-global-hui01 mr-3">{{data['collectName']}}</span>
           <div class="flex items-center">
             <template v-for="item in data['tagList']">
               <div class="tip">
                 <ui-image v-if="item['type']!=='text'" class="w-3 h-3 mr-1" :src="item['imgUrl']"/>
                 <span class="short max-w-25">{{item['text']}}</span>
               </div>
             </template>
<!--             <div class="tip mr-2">+142%</div>-->
<!--             <div class="tip">30D Flip: 67.3%</div>-->
           </div>
         </div>
       </div>
       <div class="mt-2 flex items-center">
         <span class="small-text mr-1.5">{{_.upperFirst(data['eventType'])}}</span>
         <span v-if="data['nftList'].length>0" class="blue-text mr-1.5 whitespace-nowrap flex items-center">
              <template v-for="item in data['nftList']">
                <v-router :href="item['nftDetailUrl']" class="cursor-pointer">#{{item['nftId']}}<span class="mx-1">/</span></v-router>
              </template>
           </span>
         <span class="small-text mr-1.5">of</span>
         <ui-image class="small-logo mr-1" src="" rounded/>
         <span class="small-text mr-1.5">Collection</span>
         <ui-image class="icon mr-1.5" :src="data['collectLogo']" rounded/>
         <span class="small-text mr-1.5">at</span>
         <span v-if="data['eventType']!=='mint'" class="small-text">{{getPrice()}} {{_.toUpper(data['currency'])}}</span>
         <span v-else class="small-text">Free Mint</span>
         <div class="flex items-center gas ml-1.5">
           <span>(Gas:</span>
           <img class="w-3 h-3 mx-1" :src="icons[data['currency']]">
           <span>{{getGas()}})</span>
         </div>
       </div>
       <div class="flex flex-wrap">
         <template v-for="item in 3">
           <ui-image class="w-16 h-16 mr-2 mt-3" src="public/images/earn/nft.png"/>
         </template>
       </div>
       <div class="time mt-3">{{dateDiff(data['time'])}}</div>
     </div>
    </div>
    <div class="card ml-3">
      <Card  :cardType="data['eventType']" :data="data"/>
    </div>
  </div>
</template>
<style scoped lang="scss">
.logo{
  @apply w-14 h-14 min-w-14 min-h-14;
}
.small-logo{
  @apply w-6 h-6 min-w-6 min-h-6;
}
.icon{
  @apply w-4 h-4 min-w-4 min-h-4;
}
.gas{
  @apply text-kd12px16px text-global-hui03;
}
.time{
  @apply text-kd12px20px text-global-hui03;
}
.tip{
  font-family: huawei-medium;
  @apply text-kd12px16px text-global-hui02 w-max rounded-kd4px bg-global-hui06 px-1 h-5 flex items-center;
}
.tip:not(:first-child){
  @apply ml-1;
}
.small-text{
  @apply text-kd14px22px text-global-hui01;
}
.blue-text{
  @apply text-kd14px22px text-global-lan03;
}
</style>