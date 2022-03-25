<script lang="ts" setup>
import { chainPage } from "src/logic/rank/config";
import Chains from "src/pages/rank/chains.vue";
// import I18n from "src/utils/i18n";
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
// const i18n = I18n();
const route = useRoute();
const key = ref(0);
watch(route, () => {
  key.value++;
});
</script>
<template>
  <div class="md:pb-13.5 pb-8 min-h-100 bg-global-topBg">
    <div class="mx-auto">
      <div class="jian pb-6">
        <!-- 占位符 -->
        <div class="is-web h-4.5 md:h-8"></div>
        <div class="flex md:flex-row max-w-360 mx-auto items-end flex-col items-stretch px-4 md:px-22 items-center">
          <div class="flex-1 w-full">
            <!--            <DappRankInfo class="is-web" :title='i18n.dapp.rank.title' />-->
            <div class="w-full flex justify-center flex-wrap mt-4 md:mt-8">
              <Chains :page="chainPage.dapp_rank" />
            </div>
          </div>
          <div class="md:ml-6 mt-4 md:mt-1.5 md:w-129.75 w-full border-1">
            <!--            <DappChart />-->
          </div>
        </div>
      </div>
      <div class="md:max-w-360 mx-auto px-4 md:px-20 border-1">
        <div class="max-w-315">
          <!--          <CommonTopics />-->
          <div class="my-4 md:my-6">
            <!--            <Ad :position="24"/>-->
          </div>
          <!--          <DappRankTable/>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.jian {
  background-image: linear-gradient(white, #fafbfc);
}
</style>
