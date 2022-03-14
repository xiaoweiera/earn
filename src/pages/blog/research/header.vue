<script setup lang="ts">
import I18n from "src/utils/i18n";

const i18n = I18n();
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <div class="flex items-end">
          <p class="text-kd32px32px text-global-highTitle font-semibold font-kdSemiBold">Research</p>
          <p class="hidden md:block text-kd14px18px text-global-highTitle text-opacity-45 font-kdFang ml-4">4wrqwerqwer</p>
        </div>
        <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">
          <v-router target="_blank">
            <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.idoIgoProject.all }}</span>
          </v-router>
        </div>
      </div>
    </div>
<!--    <div class="block md:hidden">-->
<!--      <div class="">-->
<!--        <div class="flex items-center justify-between">-->
<!--          <p class="text-kd24px24px text-global-highTitle font-semibold font-kdSemiBold">{{ Research }}</p>-->
<!--          <v-router target="_blank" class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center">-->
<!--            <span class="text-kd14px18px text-global-darkblue font-kdFang">{{ i18n.home.more }}</span>-->
<!--          </v-router>-->
<!--        </div>-->
<!--        <div class="mt-4">-->
<!--          <p class="text-kd12px16px text-global-highTitle text-opacity-45 font-kdFang">{{ tips }}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style lang="scss" scoped>

</style>