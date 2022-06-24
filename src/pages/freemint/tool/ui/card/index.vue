<script setup lang="ts">
/**
 * 状态卡片
 */
import Item from "./item.vue";
import * as eth from "src/pages/freemint/lib/etherscan.js";
import { reactive, onMounted, PropType } from "vue";
import { toolMode } from "src/types/freemint";
import { toNumberCashFormat } from "src/utils/convert/to";
const props = defineProps({
  toolModel: {
    type: Object as PropType<toolMode>,
    required: true,
  },
});
let cardInfo = reactive({ value: {} });
const init = async () => {
  const res = await eth.etherscan.getGasTracker();
  if (res) {
    cardInfo.value = res;
    //@ts-ignore
    props.toolModel.baseFeePerGas = toNumberCashFormat(cardInfo.value["suggestBaseFee"]);
    //@ts-ignore
    props.toolModel.maxPriorityFeePerGas = toNumberCashFormat(cardInfo.value["FastGasPrice"] - cardInfo.value["suggestBaseFee"]);
    //@ts-ignore
    props.toolModel.maxFeePerGas = toNumberCashFormat(cardInfo.value["FastGasPrice"] * 2);
    //@ts-ignore
    props.toolModel.ethPrice = cardInfo.value["price"];

  }
};
onMounted(() => init());
</script>
<template>
  <div class="w-full flex showX">
    <Item state="low" :totalPrice="cardInfo.value['SafeGasPrice']" :base="cardInfo.value['suggestBaseFee']" :price="cardInfo.value['price']" />
    <Item state="averag" class="mx-4" :totalPrice="cardInfo.value['ProposeGasPrice']" :base="cardInfo.value['suggestBaseFee']" :price="cardInfo.value['price']" />
    <Item state="high" :totalPrice="cardInfo.value['FastGasPrice']" :base="cardInfo.value['suggestBaseFee']" :price="cardInfo.value['price']" />
  </div>
</template>
