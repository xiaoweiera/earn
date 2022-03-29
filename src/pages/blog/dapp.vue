<script setup lang="ts">
/**
 * @file 项目库信息
 * @auth svon.me@gmail.com
 */
</script>

<template>
  <div class="border rounded-2xl p-4">
    <v-router>
      <div class="flex items-center flex-wrap md:flex-nowrap">
        <div class="order-1 flex items-center pr-4">
          <IconFont type="icon-github1" size="32" />
          <span class="ml-1.5 text-18-24 text-global-highTitle">CryptoPunkCrypto</span>
        </div>
        <div class="order-2 md:order-3 ml-auto md:ml-4">
          <IconFont class="text-global-highTitle text-opacity-25" type="icon-rightNo" size="16" />
        </div>
        <div class="order-3 md:order-2 w-full md:flex-1 text-global-highTitle text-16-20 md:text-center">
          <div class="pt-4 md:pt-0 flex md:justify-between items-center flex-wrap md:flex-nowrap">
            <div class="flex-1">
              <p class="text-12-18 text-global-highTitle text-opacity-65">空投总量</p>
              <p class="semiBold">30,000,000,000,000</p>
            </div>
            <div class="line hidden md:flex"></div>
            <div class="flex-1">
              <p class="text-12-18 text-global-highTitle text-opacity-65">空投名额</p>
              <p class="semiBold">30,000,000,000,000</p>
            </div>
            <div class="line hidden md:flex"></div>
            <div class="w-full md:flex-1 mt-4 md:mt-0">
              <p class="text-12-18 text-global-highTitle text-opacity-65">Airdrop Time</p>
              <p class="semiBold">Jan 20th - Jan 20th</p>
            </div>
          </div>
        </div>
      </div>
    </v-router>
  </div>
</template>

<style scoped lang="scss">
.border {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 0 2px rgba(0, 0, 0, 0.1);
}
.line {
  @apply w-px h-9;
  @apply bg-global-highTitle bg-opacity-6;
}
.semiBold {
  font-family: i8n-font-SemiBold;
}
</style>
