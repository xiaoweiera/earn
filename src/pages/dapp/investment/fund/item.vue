<script lang="ts" setup>
import { ref } from "vue";
import I18n from "src/utils/i18n";
import VRouter from "src/components/v/router.vue";

const i18n = I18n();
const list = ref<any[]>([]);
list.value = new Array(19).fill("");
</script>

<template>
  <div>
    <v-router href="https://www.baidu.com" target="_blank" name="div">
      <div class="min-h-75 px-1.5 pb-1.5 bg-global-white border-1 border-global-highTitle border-opacity-6 rounded-md">
        <!-- logo -->
        <div class="w-full mt-6.5">
          <div class="w-24 h-24 mx-auto">
            <div class="w-full h-full border-1 border-global-highTitle border-opacity-6 rounded-xl">
              <ui-image class="w-full h-full rounded-xl" fit="cover" src="https://jsdata-web.kingdata.xyz/media/Rarity/Gallery/237561404597baaab7378b83fd3152e1.png"></ui-image>
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
            <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">{{ i18n.invest.project.total }}</span>
            <span class="mx-1 text-kd20px20px text-global-highTitle text-opacity-85 font-semibold font-kdBarlow">24</span>
            <span class="text-kd14px18px text-global-highTitle text-opacity-65 font-medium font-kdFang">{{ i18n.invest.project.investors }}</span>
          </p>
        </div>
        <div :class="{ overlap: list.length > 9 }" class="w-full mt-2 px-1.5 group-list">
          <div class="w-full py-2 pl-1.5 border-t-1 border-b-1 border-global-highTitle border-opacity-6 flex justify-center items-center">
            <template v-for="(item, index) in list" :key="index">
              <v-router class="block p-0.5 group-item bg-white rounded-1/2" href="https://www.google.com" target="_blank">
                <ui-image class="w-6 h-6" rounded fit="cover" src="https://jsdata-web.kingdata.xyz/media/DeFi/NFT/a808e7d0c37f22b86ceef3abaa0f5161" />
              </v-router>
            </template>
            <a class="group-more link">
              <span class="text-kd16px20px font-kdBarlow font-medium">+24</span>
            </a>
          </div>
        </div>
        <!-- 更多 -->
        <div class="w-full mt-2">
          <v-router class="block" href="https://kingdata.com" target="_blank">
            <p class="w-full h-11 bg-global-orange rounded-md flex items-center justify-center">
              <span class="text-kd16px22px text-global-white font-medium font-kdFang">{{ i18n.invest.project.learnMore }}</span>
            </p>
          </v-router>
        </div>
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
    @include overlap(14);
    @screen lg {
      @include overlap(11);
    }
  }
  &:not(.overlap) {
    @apply justify-center;
  }
}
</style>
