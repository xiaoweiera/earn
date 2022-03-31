<script lang="ts" setup>
/**
 * @file 项目库信息
 * @auth svon.me@gmail.com
 */
import { config as routerConfig } from "src/router/config";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-router v-if="data" :href="`${routerConfig.dapp}/${data.id}`" class="block" target="_blank">
    <div class="border rounded-2xl p-4">
      <div class="flex items-center flex-wrap md:flex-nowrap">
        <div class="order-1 flex items-center pr-4">
          <IconFont :type="data.logo" size="32" />
          <span class="ml-1.5 text-18-24 text-global-highTitle">{{ data.name }}</span>
        </div>
        <div class="order-2 md:order-3 ml-auto md:ml-4">
          <IconFont class="text-global-highTitle text-opacity-25" size="16" type="icon-rightNo" />
        </div>
        <div class="order-3 md:order-2 w-full md:flex-1 text-global-highTitle text-16-20 md:text-center">
          <div class="pt-4 md:pt-0 flex md:justify-between items-center flex-wrap md:flex-nowrap">
            <div class="flex-1">
              <p class="text-12-18 text-global-highTitle text-opacity-65">{{ data.totalText }}</p>
              <p class="semiBold">{{ data.total }}</p>
            </div>
            <div class="line hidden md:flex"></div>
            <div class="flex-1">
              <p class="text-12-18 text-global-highTitle text-opacity-65">{{ data.peopleText }}</p>
              <p class="semiBold">{{ data.people }}</p>
            </div>
            <div class="line hidden md:flex"></div>
            <div class="w-full md:flex-1 mt-4 md:mt-0">
              <p class="text-12-18 text-global-highTitle text-opacity-65">{{ data.timeText }}</p>
              <p class="semiBold">{{ data.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-router>
</template>

<style lang="scss" scoped>
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
