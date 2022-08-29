<script setup>
import Type from './type.vue'
import {icons} from 'src/logic/earn'
import {toNumberCashFormat} from "../../utils";

const props = defineProps({
  cardType: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});
const getPrice = (type) => {
  if (!type) {
    type = props.data['eventType']
  }
  if (type === 'buy') return toNumberCashFormat(props.data['buyPrice'])
  return toNumberCashFormat(props.data['sellPrice'])
}
const getGas = (type) => {
  if (!type) {
    type = props.data['eventType']
  }
  if (props.data['eventType'] === 'buy' || props.data['eventType'] === 'mint') return toNumberCashFormat(props.data['buyGas'])
  return toNumberCashFormat(props.data['sellGas'])
}
</script>
<template>
  <div class="card huawei-medium ">
    <!--Buy-->
    <div v-if="cardType==='buy'">
      <Type card-type="buy"/>
      <div class="mt-3 flex items-center flex-wrap">
        <span class="des mr-1">Cost: </span>
        <ui-image class="w-3.5 h-3.5 mr-1" :src="icons[data['currency']]"/>
        <span class="text mr-1">{{ getPrice() }}</span>
        <span class="small-des">Gas:</span>
        <ui-image class="w-3 h-3 mr-1" :src="icons[data['currency']]"/>
        <span class="des mr-1">{{ getGas() }}</span>
      </div>
      <div class="flex items-center mt-3">
        <ui-image class="w-6 h-6 mr-1" rounded :src="data['collectLogo']"/>
        <span class="text mr-1">Collection</span>
        <ui-image class="w-4 h-4 mr-2" :src="data['exchangeLog']"/>
        <span class="des mr-1">Floor Price: </span>
        <ui-image class="w-3.5 h-3.5 mr-1" :src="icons[data['currency']]"/>
        <span class="text">{{ getPrice() }}</span>
      </div>
      <div class="copy">Copy Buy</div>
    </div>
    <!--Sell-->
    <div v-else-if="cardType==='sell'">
      <Type card-type="sell"/>
      <div class="mt-3">
        <div class="flex items-center">
          <span class="des w-16">Receive: </span>
          <ui-image class="w-3.5 h-3.5 mr-1" :src="icons[data['currency']]"/>
          <span class="text mr-1">{{ getPrice('sell') }}</span>
          <span class="small-des">Gas:</span>
          <ui-image class="w-3 h-3 mr-1" :src="icons[data['currency']]"/>
          <span class="des">{{ getGas('sell') }}</span>
        </div>
        <div class="mt-3  flex items-center">
          <span class="des w-16">Buy Cost:</span>
          <ui-image class="w-3.5 h-3.5 mr-1" :src="icons[data['currency']]"/>
          <span class="text mr-1">{{ getPrice('buy') }}</span>
          <span class="small-des">Gas:</span>
          <ui-image class="w-3 h-3 mr-1" :src="icons[data['currency']]"/>
          <span class="des">{{ getGas('buy') }}</span>
        </div>
        <div class="mt-3  flex items-center">
          <span class="des w-16">PNL:</span>
          <span class="text-kd16px24px text-global-green04">+{{ toNumberCashFormat(data['pnl']) }}%</span>
        </div>
      </div>
      <div class="copy">Copy Buy</div>
    </div>
    <!--Mint-->
    <div v-else-if="cardType==='mint'">
      <Type card-type="mint"/>
      <div class="mt-3">
        <div class="flex items-center">
          <span class="des mr-2">Cost: </span>
          <ui-image class="w-3.5 h-3.5 mr-1" :src="icons[data['currency']]"/>
          <span class="text mr-2">Free Mint</span>
          <span class="small-des">Gas:</span>
          <ui-image class="w-3 h-3 mr-1" :src="icons[data['currency']]"/>
          <span class="des">{{ getGas() }}</span>
        </div>
      </div>
      <div class="copy">Copy Buy</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.copy {
  @apply mt-3 h-8 cursor-pointer text-global-hui01 rounded-kd4px bg-global-hui06 flex items-center justify-center w-full;
}

.card {
  border-radius: 12px;
  @apply px-4 py-3 bg-global-hui10;
  @apply w-79.25  bg-global-hui10;
}

.small-text {
  @apply text-kd14px22px text-global-hui01;
}

.text {
  @apply text-kd16px24px text-global-hui01;
}

.des {
  @apply text-kd14px22px text-global-hui04;
}

.small-des {
  @apply mr-1 text-kd12px16px text-global-hui04;
}
</style>