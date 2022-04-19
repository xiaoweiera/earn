<script setup lang="ts">
/**
 * @file 邀请活动
 * @auth svon.me@gmail.com
 *
 *
 */

import { ref } from "vue";
import Footer from "./footer.vue";
import Download from "./download.vue";

const text = ref<string>(`1、The live Bitcoin price today is $41,100.38 USD with a 24-hour trading volume of $28,448,855,607 USD. We update our BTC to USD price in real-time. Bitcoin is up 2.95% in the last 24 hours. The current CoinMarketCap ranking is #1, with a live market cap of $781,376,064,641 USD. It has a circulating supply of 19,011,406 BTC coins and a max. supply of 21,000,000 BTC coins.

2、If you would like to know where to buy Bitcoin at the current rate, the top cryptocurrency exchanges for trading in Bitcoin stock are currently Binance, OKX, CoinFLEX, CoinTiger, and Bybit. You can find others listed on our crypto exchanges page.

Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.

Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamoto’s own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.”

1. The live Bitcoin price today is $41,100.38 USD with a 24-hour trading volume of $28,448,855,607 USD. We update our BTC to USD price in real-time. Bitcoin is up 2.95% in the last 24 hours. The current CoinMarketCap ranking is #1, with a live market cap of $781,376,064,641 USD. It has a circulating supply of 19,011,406 BTC coins and a max. supply of 21,000,000 BTC coins.
2. If you would like to know where to buy Bitcoin at the current rate, the top cryptocurrency exchanges for trading in Bitcoin stock are currently Binance, OKX, CoinFLEX, CoinTiger, and Bybit. You can find others listed on our crypto exchanges page.
3. Bitcoin is a decentralized cryptocurrency originally described in a 2008 whitepaper by a person, or group of people, using the alias Satoshi Nakamoto. It was launched soon after, in January 2009.
4. Bitcoin is a peer-to-peer online currency, meaning that all transactions happen directly between equal, independent network participants, without the need for any intermediary to permit or facilitate them. Bitcoin was created, according to Nakamoto’s own words, to allow “online payments to be sent directly from one party to another without going through a financial institution.”`);
</script>

<template>
  <div>
    <div>
      <ui-image src="https://iph.href.lu/1440x500?text=activity&fg=666666&bg=cccccc" fit="none" />
    </div>
    <div class="pt-16 px-4 pb-8">
      <div class="max-w-200 mx-auto">
        <h3 class="text-32 font-b text-global-highTitle">活动名称</h3>
        <p class="mt-3 text-14-20 text-global-highTitle text-opacity-85">
          <span>活动时间：</span>
          <span>Feb 5,2022/ 12PMUTC</span>
        </p>
        <h4 class="mt-8 text-global-highTitle">活动奖品规则</h4>
        <div class="mt-4 activity-content-wrap">
          <div class="text-16-22 text-global-highTitle text-opacity-85" v-html="text" />
        </div>
      </div>
    </div>
    <div class="pb-20 px-4">
      <div class="max-w-200 mx-auto">
        <Download />
      </div>
    </div>
    <div class="pb-6 px-4">
      <div class="max-w-200 mx-auto">
        <Footer />
      </div>
    </div>
  </div>
</template>
