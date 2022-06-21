<script setup lang="ts">
/**
 * 状态卡片
 */
import Item from "./item.vue";
import * as eth from "src/pages/freemint/lib/etherscan.js";
import { reactive, onMounted } from "vue";
// const cards = createReactive(alias.freeMint.card, {});
let cardInfo = reactive({ value: {} });
const init = async () => {
  const res = await eth.etherscan.getGasTracker();
  if (res) {
    cardInfo.value = res;
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
