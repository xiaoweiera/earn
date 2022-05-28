<script lang="ts" setup>
/**
 * @file demo
 * @auth svon.me@gmail.com
 */
import { LegendDirection } from "src/types/echarts/type";
</script>

<template>
  <div class="p-4 md:p-10">
    <div class="w-200">
      <ui-echart-dapp id="3321" :legend="LegendDirection.custom" custom-class="h-150" start="2022-05-20" :fields="['tvl', 'price']">
        <template #legend="scope">
          <span class="flex items-center mr-2" :style="scope.style">
            <span class="mr-1" v-html="scope.icon"></span>
            <span>{{ scope.value }}</span>
          </span>
        </template>
      </ui-echart-dapp>
    </div>
  </div>
</template>
