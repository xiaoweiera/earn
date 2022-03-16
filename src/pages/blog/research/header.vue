<script setup lang="ts">
import I18n from "src/utils/i18n";
import { config } from "src/router/config";

const i18n = I18n();
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between items-center">
        <div class="flex items-end">
          <p class="text-kd32px32px text-global-highTitle font-semibold font-kdSemiBold">{{ i18n.home.blog.title }}</p>
          <p class="blog-font hidden md:block text-kd14px18px text-global-highTitle text-opacity-45 font-kdFang ml-4">
            {{ i18n.home.blog.tips }}
          </p>
        </div>
        <div class="bg-global-darkblue bg-opacity-6 rounded-md px-3 py-2 flex items-center cursor-pointer">
          <v-router :href="`${config.blog}`" target="_blank">
            <span class="blog-font hidden md:block text-kd14px18px text-global-darkblue font-kdFang">{{
              i18n.home.idoIgoProject.all
            }}</span>
            <span class="blog-font block md:hidden text-kd14px18px text-global-darkblue font-kdFang">{{
              i18n.home.more
            }}</span>
          </v-router>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-font {
  font-family: 'PingFang SC' !important;
}
</style>
