<script lang="ts" setup>
import I18n from "src/utils/i18n";
import DAppInvestProjectsItem from "src/pages/dapp/investment/projects/item.vue";
import DAppInvestFundItem from "src/pages/dapp/investment/fund/item.vue";

const i18n = I18n();
</script>

<template>
  <div>
    <div class="w-full">
      <!-- 头部 -->
      <div class="w-full">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <h3 class="text-kd32px32px text-global-highTitle font-kdSemiBold">机构投资动向</h3>
            <div class="ml-3 text-kd14px18px text-global-highTitle text-opacity-45 font-kdFang">
              <p>KingData is a crypto platform for tracking private and public fundraising.</p>
              <p>We include latest information on seed, private, strategic, and IDO/IEO rounds.</p>
            </div>
          </div>
          <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
            <v-router href="www.baidu.com" target="_blank">
              <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.idoIgoProject.all }}</span>
            </v-router>
          </div>
        </div>
      </div>
      <!-- projects -->
      <div class="mt-5 w-full">
        <div class="w-full">
          <h4 class="text-kd24px28px text-global-highTitle font-kdBarlow">PROJECTS</h4>
        </div>
        <div class="mt-3 grid grid-cols-4 gap-6">
          <DAppInvestProjectsItem v-for="(item, index) in 4" :key="index" />
        </div>
      </div>
      <!-- funds -->
      <div class="mt-6 w-full">
        <div class="w-full">
          <h4 class="text-kd24px28px text-global-highTitle font-kdBarlow">FUNDS</h4>
        </div>
        <div class="mt-3 grid grid-cols-4 gap-6">
          <DAppInvestFundItem v-for="(item, index) in 4" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
