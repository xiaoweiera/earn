<script setup lang="ts">
import { toNumberCashFormat } from 'src/utils/convert/to'
const props=defineProps({
  data:Object
})
const getNumber=(value:any)=>{
  if(value>0){
    return `+${toNumberCashFormat(value)}`
  }else if(value===0){
    return 0
  }else if(value<0){
    return `-${toNumberCashFormat(value)}`
  }
  return ``
}
const getColor=(value:any)=>{
  if(value>=0){
    return `green-value`
  }else if(value<0){
    return `red-value`
  }
  return `default-color`
}
</script>
<template>
  <div class="w-full flex justify-between items-center">
    <div>
      <p class="title font-kdSemiBold">The world’s best DApp store</p>
      <p class="des i8n-font-inter">All in One -Stop:Web3.0,DeFi,Gaming,NFTs,Airdorps</p>
    </div>
    <div class="flex items-center flex-wrap">
      <div class="info-item">
        <div>
          <ui-popover
              class="break-words"
              placement="bottom"
              width="auto"
              trigger="hover">
            <template #reference>
              <div class="flex justify-end cursor-pointer flex items-center max-w-fit">
                <div class="item-name mr-1">Avg ATH</div>
                <IconFont class="text-global-white text-opacity-65" type="icon-infoNo"/>
              </div>
            </template>
            <template #content>
              <div class="font-kdFang p-4 shadow w-105 absolute top-2 z-100 bg-global-white rounded-kd4px">
                <div class="text-kd16px22px font-medium text-highTitle">收益计算说明：</div>
                <div class="mt-1.5 text-kd14px22px text-global-highTitle text-opacity-45">该收益为 KingData 平台所收录的 IDO & IGO 项目，收益排名前100的最高平均项目收益，数据可能存在一定的误差，仅作为参考，不具备任何投资建议，投资者需谨慎进行操作。</div>
              </div>

            </template>
          </ui-popover>

        </div>
        <div class="info-des number-value text-number" :class="data.avg_ath>=0?'green-value':'red-value'">{{toNumberCashFormat(data.avg_ath,'x')}}</div>
      </div>
      <div class="info-item">
        <div class="item-name">NFT Projects</div>
        <div class="info-des">
          <span class="number-value text-number  text-global-white">{{toNumberCashFormat(data.nft.total)}}</span>
          <span class="time  font-kdFang  text-global-white">24H</span>
          <span class="number-rate text-number" :class="getColor(data.nft['24h_increase'])">{{getNumber(data.nft['24h_increase'])}}</span>
        </div>
      </div>
      <div class="info-item">
        <div class="item-name">IDO/IGO Projects</div>
        <div class="info-des">
          <span class="number-value text-number  text-global-white">{{toNumberCashFormat(data.ixo.total)}}</span>
          <span class="time  font-kdFang  text-global-white">24H</span>
          <span class="number-rate text-number" :class="getColor(data.ixo['24h_increase'])">{{getNumber(data.ixo['24h_increase'])}}</span>
        </div>
      </div>
      <div class="info-item">
        <div class="item-name">Airdrops Projects</div>
        <div class="info-des">
          <span class="number-value text-number  text-global-white">{{toNumberCashFormat(data.airdrop.total)}}</span>
          <span class="time  font-kdFang  text-global-white">24H</span>
          <span class="number-rate text-number" :class="getColor(data.airdrop['24h_increase'])">{{getNumber(data.airdrop['24h_increase'])}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.green-value {
  color: #00FF29;
}

.shadow{
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
}
.red-value {
  color: red;
}
.default-color{
  @apply text-global-highTitle text-opacity-85;
}

.title {
  @apply text-kd40px40px font-semibold text-global-white;
}

.des {
  @apply mt-3 text-kd14px18px text-global-white text-opacity-85;
}

.item-name {
  @apply text-right text-kd12px16px font-medium font-kdFang text-global-white text-opacity-65;
}

.info-item {
  @apply w-40.75 min-h-11;
  .info-des {
    @apply mt-2 flex justify-end items-center;
  }

  .number-value {
    @apply text-kd20px20px font-bold;
  }
  .time {
    @apply px-1 py-0.5 mx-1.5 text-kd12px16px font-medium;
    @apply bg-global-white bg-opacity-25 rounded-kd4px;
  }
  .number-rate {
    @apply text-kd16px18px font-bold;
  }
}
</style>