<script setup lang="ts">
import {ref} from 'vue'
import { toNumberCashFormat } from 'src/utils/convert/to'

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
const getDom=(key:string)=>{


}
</script>
<template>
  <div>
<!--    chainIcon-->
    <div>
      <IconFont size="16" type="icon-HECO"/>
    </div>
<!--    iconHref-->
    <div class="flex-center">
      <IconFont size="16" type="icon-HECO"/>
      <v-router class="link text-number" href="https:www.baidu.com">Gate.io</v-router>
    </div>
    <!--starNumber-->
    <div class="flex-center">
      <IconFont size="12" type="icon-star"/>
      <span class="star-txt">8.0</span>
    </div>
<!--    txt-->
    <div class="numberDefault text-number">挖矿</div>
<!--    numberPrice-->
    <div class="numberDefault text-number">{{toNumberCashFormat(null,'$','','Not Set')}}</div>
<!--    chainNumber-->
    <div class="flex-center">
      <IconFont size="12" type="icon-ETH"/>
      <span class="numberDefault text-number ml-1">0.01</span>
    </div>
<!--    numberUnit-->
    <div class="flex-center">
      <span class="numberDefault text-number">{{toNumberCashFormat(6000000,'','','Not Set')}}</span>
      <span class="unit">BTC</span>
    </div>
<!--    numbers-->
  <div class="numberDefault text-number">{{toNumberCashFormat(88888,'','','Not Set')}}</div>
    <div>
      <div class="numberDefault text-number">{{toNumberCashFormat(88888,'','','Not Set')}}</div>
      <div class="flex-center">
        <IconFont class="" size="8" type="icon-zheng"/>
        <span class="numberChange text-number ml-1">{{toNumberCashFormat(88888,'','','0')}}%</span>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
</style>