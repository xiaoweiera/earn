<script lang="ts" setup>
import { ref } from "vue";
const list = ref<any[]>([]);
list.value = new Array(20).fill("");
</script>

<template>
  <div class="min-h-94.5 p-1.5 bg-global-white border-1 border-global-highTitle border-opacity-6 rounded-md">
    <v-router href="https://www.baidu.com" target="_blank" name="div">
      <!-- 头部 -->
      <div class="w-full">
        <p class="w-full h-11.25 rounded-md bg-global-numGreen bg-opacity-12 flex items-center justify-center">
          <span class="text-kd24px24px text-global-numGreen font-semibold font-kdBarlow">Seed round</span>
        </p>
      </div>
      <!-- logo -->
      <div class="w-full mt-3">
        <div class="w-24 h-24 mx-auto relative">
          <div class="w-full h-full">
            <ui-image class="w-full h-full" rounded fit="cover" src="https://jsdata-web.kingdata.xyz/media/Rarity/Gallery/237561404597baaab7378b83fd3152e1.png"></ui-image>
          </div>
          <div class="w-full h-6.5 flex justify-center absolute left-0 bottom-0">
            <p class="w-max flex px-2 pt-1 py-1.75 bg-global-numGreen border-2 border-global-white rounded-2xl">
              <span class="text-kd14px14px text-global-white font-kdSemiBold">Gaming</span>
            </p>
          </div>
        </div>
      </div>
      <!-- name -->
      <div class="w-full mt-1.5">
        <p class="w-full text-center">
          <span class="text-kd24px28px text-global-highTitle font-kdBarlow">Drunk Robots</span>
        </p>
      </div>
      <!-- 总数 -->
      <div class="w-full mt-2">
        <p class="w-full text-center">
          <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">Total:</span>
          <span class="mx-1 text-kd20px20px text-global-highTitle text-opacity-85 font-semibold font-kdBarlow">24</span>
          <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">investors</span>
        </p>
      </div>
      <!-- 参与logo -->
      <div :class="{ overlap: list.length > 9 }" class="w-full mt-2 px-1.5 group-list">
        <div class="w-full py-2 border-t-1 border-b-1 border-global-highTitle border-opacity-6 flex items-center">
          <template v-for="(item, index) in list" :key="index">
            <v-router class="block p-0.5 group-item bg-white rounded-1/2" href="https://www.google.com" target="_blank">
              <ui-image class="w-6 h-6" rounded fit="cover" src="https://jsdata-web.kingdata.xyz/media/DeFi/NFT/a808e7d0c37f22b86ceef3abaa0f5161" />
            </v-router>
          </template>
          <a class="group-more link">
            <span class="text-kd16px20px font-kdBarlow font-medium">+100</span>
          </a>
        </div>
      </div>
      <!-- 价格 -->
      <div class="mt-2">
        <div class="flex text-center text-global-highTitle text-opacity-45">
          <div class="flex-1 px-2 flex-wrap">
            <!--总量-->
            <p class="text-kd12px16px flex items-center flex-nowrap justify-center">
              <span>Total Raised</span>
            </p>
            <p class="mt-1 text-global-highTitle text-opacity-85">
              <b class="text-kd18px18px font-semibold font-kdBarlow">$1.8M</b>
            </p>
          </div>
          <div class="flex-1 px-2 border-l border-solid border-global-highTitle border-opacity-6">
            <!--日期-->
            <p class="text-kd12px16px flex items-center justify-center">
              <span>Last Funding</span>
            </p>
            <p class="mt-1 text-global-highTitle text-opacity-85">
              <b class="text-kd18px18px font-semibold font-kdBarlow">Mar10,2022</b>
            </p>
          </div>
        </div>
      </div>
      <!-- 更多 -->
      <div class="w-full mt-2">
        <v-router class="block" href="https://kingdata.com" target="_blank">
          <p class="w-full h-11 bg-global-darkblue rounded-md flex items-center justify-center">
            <span class="text-kd16px22px text-global-white font-medium font-kdFang">Learn More</span>
          </p>
        </v-router>
      </div>
    </v-router>
  </div>
</template>

<style lang="scss" scoped>
@mixin overlap($num) {
  .group-item {
    @apply -ml-1.75;
    &:nth-child(#{$num}) {
      & ~ .group-item {
        @apply hidden;
      }
      & ~ .group-more {
        @apply block;
      }
    }
  }
}
.group-list {
  .group-more {
    @apply hidden ml-auto;
  }
  &.overlap {
    @include overlap(15);
    @screen lg {
      @include overlap(11);
    }
  }
  &:not(.overlap) {
    @apply justify-center;
  }
}
</style>
