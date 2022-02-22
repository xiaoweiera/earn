<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { toNumberCashFormat } from 'src/utils/convert/to'
import { oss } from "src/config";
const props=defineProps({
  data:Object,
  typeName:{
    type:String,
    default: () => ''
  },
  type:String
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
const domData=ref({}) //dom数据
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
const getData=()=>{
  const key:string=props.typeName
  const data:any=props.data
  let header:string=''
  let value:any=[]
  if(key==='chains'){
    header='Chain'
    value=data['chains']
  }else if(key==='tge_platform'){
    header='TGE Platform'
    value=data['tge_platform']
  }else if(key==='overall_score'){
    header='Rating'
    value=data['overall_score']
  }else if(key==='categories'){
    header='项目类型'
    value=data['categories']
  }else if(key==='current_price'){
    header='Current Price'
    value=data['current_price']
  }else if(key==='ido_price'){
    header='IDO Price'
    value=data['ido_price']
  }else if(key==='balance_24h'){
    header='Balance(24h)'
    value=data['balance_24h']
  }else if(key==='balance_7d'){
    header='Balance(7d)'
    value=data['balance_7d']
  }else if(key==='volume_24h'){
    header='Volume(24h)'
    value=data['volume_24h']
  }else if(key==='volume_7d'){
    header='volume(7d)'
    value=data['volume_7d']
  }else if(key==='ido_fundraising_goal'){
    header='Total Raised'
    value=data['ido_fundraising_goal']
  }else if(key==='mcap'){
    header='Market Cap'
    value=data['mcap']
  }else if(key==='floor_price'){
    header='Floor Price'
    value=data['floor_price']
  }else if(key==='mint_price'){
    header='Mint Price'
    value=data['mint_price']
  }else if(key==='ido_sale_amount'){
    header='Tokens for Sale'
    value=[data['ido_sale_amount'],data['ido_symbol']]
  }else if(key==='owners'){
    header='Owners'
    value=data['owners']
  }else if(key==='assets'){
    header='Assets'
    value=data['assets']
  }else if(key==='mcap_tvl'){
    header='MCap/TVL'
    value=data['mcap_tvl']
  }else if(key==='users_24h'){
    header='User(24h)/Change'
    value=[data['users_24h'],data['users_change_percent_24h']]
  }else if(key==='users_7d'){
    header='User(7d)/Change'
    value=[data['users_7d'],data['users_change_percent_7d']]
  }else if(key==='tvl'){
    header='TVL/Change'
    value=[data['tvl'],data['tvl_change_percent_24h']]
  }else if(key==='ath_since_ido'){
    header='ATH Since IDO'
    value=data['ath_since_ido']
  }else if(key==='current_roi_usd'){
    header='Current ROI USD'
    value=data['current_roi_usd']
  }
  return {header,value}

}
onMounted(()=>{
  typeDom.value=getDom()
  domData.value=getData()
  // console.log(domData.value)
})
</script>
<template>
  <div>
    <!--projectName-->
    <div v-if="typeName==='name'" class="flex-center">
      <IconFont size="24" type="icon-HECOYuan"/>
      <div class="ml-1.5">
        <div class="numberDefault text-number line-height-no">Astar Network</div>
        <div class="nameTag text-number  text-left line-height-no">ASTR</div>
      </div>
    </div>
    <!--NameDes-->
    <div v-else-if="typeName==='name' && type==='desc'" class="flex-center">
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