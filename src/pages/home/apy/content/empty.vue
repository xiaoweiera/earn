<script lang="ts" setup>
import I18n from "src/utils/i18n";
import Hover from "src/pages/layout/footer/hover.vue";

const i18n = I18n();
</script>

<template>
  <div>
    <div class="apy-coming w-full h-142.5 py-6">
      <div class="w-full flex flex-col justify-center items-center">
        <!-- 左侧部分 -->
        <div class="flex flex-col items-center justify-center text-center">
          <div class="w-37.5 h-12">
            <ui-image src="/images/common/logo.svg" />
          </div>
          <div class="w-63.5 md:w-84.25 h-9 md:h-12 mt-6 md:mt-8">
            <ui-image src="/images/apy/coming.svg" />
          </div>
          <div class="text-16-20 text-global-darkblue font-kdInter mt-3">{{ i18n.home.apy.tips }}</div>
          <div class="flex items-center mt-3.5">
            <v-router :href="i18n.chat.twitter" class="flex" target="_blank">
              <IconFont class="flex text-global-primary" size="24" type="icon-twitter" />
            </v-router>

            <div class="flex ml-6">
              <Hover :desc="i18n.menu.hover.telegram" :href="i18n.chat.telegram">
                <IconFont class="flex text-global-primary" size="24" type="icon-telegram" />
              </Hover>
            </div>
            <v-router :href="i18n.chat.discord" class="flex ml-6" target="_blank">
              <IconFont class="flex text-global-primary" size="24" type="icon-discord2" />
            </v-router>

            <v-router :href="i18n.chat.medium" class="flex ml-6" target="_blank">
              <IconFont class="flex text-global-primary" size="24" type="icon-medium1" />
            </v-router>
          </div>
        </div>
        <!-- 右侧部分 -->
        <div class="w-55.5 h-67.5 flex justify-center mt-12">
          <ui-image class="w-41.5 md:w-55.5 h-50 md:h-67.5" src="/images/apy/Group.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "src/styles/function";
.apy-coming {
  @apply h-full w-full;
  background-image: cdn("/image/empty.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
