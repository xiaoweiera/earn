<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { toNumberCashFormat } from 'src/utils/convert/to'
import { oss } from "src/config";
const props=defineProps({
  typeName:{
    type:String,
    default: () => ''
  }
})
const chainIcon=['chain']  //icon类
const iconHref=['platform'] //icon + href
const starNumber=['Rating'] //星星 + number
const txt=['type'] //txt
const numberPrice=[
    'salePrice',
    'currentPrice',
    'idoPrice',
    'balance',
    'volume',
    'totalRaised',
    'marketCap'
] //$number
const chainNumber=[
    'floorPrice',
    'mintPrice',
    'mCap'
] //chain + number
const numberUnit=['token'] //number + 单位
const numbers=['supply','owners','assets']
const numberChange=['user','tvl','mCap']
const lever=['athSinceIdo','currentRoiUsd'] //number + x
const timeType=['endedIn'] //time

const typeDom=ref('')
const getDom=()=>{
  const name:string=props.typeName
  if(chainIcon.includes(name)){
    return 'chainIcon'
  }else if(iconHref.includes(name)){
    return 'iconHref'
  }else if(starNumber.includes(name)){
    return 'starNumber'
  }else if(txt.includes(name)){
    return 'txt'
  }else if(numberPrice.includes(name)){
    return 'numberPrice'
  }else if(chainNumber.includes(name)){
    return 'chainNumber'
  }else if(numberUnit.includes(name)){
    return 'numberUnit'
  }else if(numbers.includes(name)){
    return 'numbers'
  }else if(numberChange.includes(name)){
    return 'numberChange'
  }else if(lever.includes(name)){
    return 'lever'
  }else if(timeType.includes(name)){
    return 'timeType'
  }else{
    return 'txt'
  }
}
onMounted(()=>{
  typeDom.value=getDom()
})
</script>
<template>
  <div>
    <!--projectName-->
    <div v-if="typeName==='nameProject'" class="flex-center">
      <IconFont size="32" type="icon-HECOYuan"/>
      <div class="ml-1.5 ">
        <div class="numberDefault text-number line-height-no">Astar Network</div>
        <div class="nameTag text-number  text-left line-height-no">ASTR</div>
      </div>
    </div>
    <!--NameDes-->
    <div v-else-if="typeName==='nameDes'" class="flex-center">
      <img class="w-12 h-12 rounded-kd6px" :src="`${oss}/dapp/recomTest.jpg`"/>
      <div class="ml-3">
        <div class="nameNameDes text-number line-height-no flex-center">
          <span>CyberTrade</span>
          <IconFont class="ml-1.5" size="16" type="icon-HECOYuan"/>
        </div>
        <div class="nameDes mt-1.5 text-number line-height-no max-w-169 smallTxt">Participate in crypto airdrops right on see our full crypto...Participate in crypto...</div>
      </div>
    </div>
    <!--chainIcon-->
    <div v-else-if="typeDom==='chainIcon'">
      <IconFont size="16" type="icon-HECO"/>
    </div>
    <!--iconHref-->
    <div v-else-if="typeDom==='iconHref'" class="flex-center">
      <IconFont size="16" type="icon-HECO"/>
      <v-router class="link text-number" href="https:www.baidu.com">Gate.io</v-router>
    </div>
    <!--starNumber-->
    <div v-else-if="typeDom==='starNumber'" class="flex-center">
      <IconFont size="12" type="icon-star"/>
      <span class="star-txt">8.0</span>
    </div>
    <!--txt-->
    <div v-else-if="typeDom==='txt'" class="numberDefault text-number">挖矿</div>
    <!--numberPrice-->
    <div v-else-if="typeDom==='numberPrice'" class="numberDefault text-number">{{toNumberCashFormat(129,'$','','Not Set')}}</div>
    <!--chainNumber-->
    <div v-else-if="typeDom==='chainNumber'" class="flex-center">
      <IconFont size="12" type="icon-ETH"/>
      <span class="numberDefault text-number ml-1">0.01</span>
    </div>
    <!--numberUnit-->
    <div v-else-if="typeDom==='numberUnit'" class="flex-center justify-center">
      <span class="numberDefault text-number">{{toNumberCashFormat(6000000,'','','Not Set')}}</span>
      <span class="unit">BTC</span>
    </div>
    <!--numbers-->
    <div v-else-if="typeDom==='numbers'" class="numberDefault text-number">{{toNumberCashFormat(88888,'','','Not Set')}}</div>
    <!--numberChange-->
    <div v-else-if="typeDom==='numberChange'">
      <div class="numberDefault text-number">{{toNumberCashFormat(88888,'','','Not Set')}}</div>
      <div class="flex-center">
        <IconFont class="" size="8" type="icon-zheng"/>
        <span class="numberChange text-number ml-1">{{toNumberCashFormat(88888,'','','0')}}%</span>
      </div>
    </div>
    <!--lever-->
    <div v-else-if="typeDom==='lever'" class="numberDefault text-number">{{toNumberCashFormat(755.82,'x','','Not Set')}}</div>
    <!--timeType-->
    <div v-else-if="typeDom==='timeType'" class="numberDefault text-number">Jan 20th,2022</div>
  </div>

</template>
<style scoped lang="scss">
.line-height-no{
  line-height: 0px;
}
.flex-center{
  @apply flex items-center;
}
.link{
  @apply ml-1 text-global-primary text-kd14px16px;
}
.star-txt{
  @apply ml-1 text-number text-kd14px16px text-global-highTitle;
}
.numberDefault{
  @apply text-kd14px16px text-global-highTitle;
}
.unit{
  @apply ml-1 font-kdFang font-medium text-kd12px16px text-global-highTitle text-opacity-65;
}
.numberChange{
  @apply text-kd12px18px;
}
.nameTag{
  @apply text-kd12px16px text-global-highTitle text-opacity-45;
}
.nameNameDes{
  @apply text-kd16px18px text-global-highTitle;
}
.nameDes{
  @apply  text-kd14px16px text-global-highTitle text-opacity-45;
}
.smallTxt{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
</style>