<script setup lang="ts">
import {ref, onMounted, PropType} from 'vue'
import { toNumberCashFormat } from 'src/utils/convert/to'
import {getData} from "~/logic/home";
import {getRedGreen} from "~/lib/tool";
import {detail} from "~/types/home";
const props=defineProps({
  info:Object as PropType<detail>,
  data:Object,
  typeName:{
    type:String,
    default: () => ''
  },
  type:{
    type:String,
    default: () => 'data'
  }
})
const chainIcon=['chains']  //icon类
const iconHref=['tge_platform'] //icon + href
const starNumber=['overall_score'] //星星 + number
const txt=['categories'] //txt
const numberPrice=[
    'current_price',
    'ido_price',
    'balance_24h',
    'balance_7d',
    'volume_24h',
    'volume_7d',
    'ido_fundraising_goal',//Total Raised
    'mcap'// MarketCap--
] //$number
const chainNumber=[
    'floor_price',//Floor price
    'mint_price',//Mint price
] //chain + number
const numberUnit=['ido_sale_amount'] //number + 单位 --- Tokens for Sale    ido_symbol
const numbers=['owners','assets','mcap_tvl']//-- Owners Assets MCap/TVL
const numberChange=['users_24h','users_7d','tvl']//User/Change   TVL/Change
const lever=['ath_since_ido','current_roi_usd'] //number + x  ATH Since IDO   Current ROI USD
const timeType=['endedIn'] //time

const typeDom=ref('')// dom类型
const domData=ref() //dom数据
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
  console.log(props.typeName,'--')
  typeDom.value=getDom()
  domData.value=getData(props.typeName,props.data,props.type)
})
</script>
<template>
  <div>
    <!--projectName-->
    <div v-if="typeName==='name'" class="flex-center  max-w-20 whitespace-nowrap">
      <IconFont size="24" :type="data.logo"/>
      <div class="ml-1.5">
        <div class="numberDefault text-number line-height-no smallTxt   max-w-20 whitespace-nowrap">{{data['name']}}</div>
        <div class="nameTag text-number  text-left line-height-no">{{data['symbol']}}</div>
      </div>
    </div>
    <!--NameDes-->
    <div v-else-if="typeName==='name' && info.show_type==='desc'" class="flex-center">
      <img class="w-12 h-12 rounded-kd6px" :src="data.logo"/>
      <div class="ml-3">
        <div class="nameNameDes text-number line-height-no flex-center">
          <span>{{data['name']}}</span>
          <IconFont class="ml-1.5" size="16" :type="data['chain']"/>
        </div>
        <div class="nameDes mt-1.5 text-number line-height-no max-w-169 smallTxt">{{data['description']}}</div>
      </div>
    </div>
    <!--chainIcon-->
    <div v-else-if="typeDom==='chainIcon'">
      <div v-if="data['chains'].length>0">
        <IconFont  size="16" type="icon-HECO"/>
      </div>
      <div v-else class="numberDefault text-number">N/A</div>
    </div>
    <!--iconHref  tge_platform-->
    <div v-else-if="typeDom==='iconHref'" class="flex-center justify-right justify-center">
      <IconFont size="16" type="icon-HECO"/>
      <v-router class="link text-number" href="https:www.baidu.com">{{domData}}</v-router>
    </div>
    <!--starNumber overall_score-->
    <div v-else-if="typeDom==='starNumber'" class="flex-center text-center">
      <div v-if="domData || domData===0" class="text-center w-full">
        <IconFont size="12" type="icon-star"/>
        <span class="star-txt">{{domData}}</span>
      </div>
      <div v-else class="numberDefault text-number">Not Set</div>
    </div>
    <!--txt categories-->
    <div v-else-if="typeDom==='txt'" class="numberDefault text-number text-center">{{domData?domData:'N/A'}}</div>
    <!--numberPrice-->
    <div v-else-if="typeDom==='numberPrice'" class="numberDefault text-number text-center">{{toNumberCashFormat(domData,'$','','Not Set')}}</div>
    <!--chainNumber-->
    <div v-else-if="typeDom==='chainNumber'" class="flex-center justify-center">
      <IconFont size="12" type="icon-ETH"/>
      <span class="numberDefault text-number ml-1">{{domData}}</span>
    </div>
    <!--numberUnit-->
    <div v-else-if="typeDom==='numberUnit'" class="flex-center justify-center">
      <span class="numberDefault text-number">{{toNumberCashFormat(domData[0],'','','Not Set')}}</span>
      <span class="unit">{{domData[1]}}</span>
    </div>
    <!--numbers-->
    <div v-else-if="typeDom==='numbers'" class="numberDefault text-number text-center">{{toNumberCashFormat(domData,'','','Not Set')}}</div>
    <!--numberChange-->
    <div v-else-if="typeDom==='numberChange'">
      <div class="numberDefault text-number text-center">{{toNumberCashFormat(domData[0],'','','N/A')}}</div>
      <div class="flex-center  justify-center">
        <IconFont class="" size="8" type="icon-zheng"/>
        <span :class="getRedGreen(domData[1])" class="numberChange text-number ml-1">{{toNumberCashFormat(domData[1],'','','0')}}%</span>
      </div>
    </div>
    <!--lever-->
    <div v-else-if="typeDom==='lever'" class="numberDefault text-number justify-right">{{toNumberCashFormat(domData,'x','','N/A')}}</div>
    <!--timeType-->
    <div v-else-if="typeDom==='timeType'" class="numberDefault text-number text-center">{{data['time']?data['time']:'TBA'}}</div>
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
    //display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
</style>