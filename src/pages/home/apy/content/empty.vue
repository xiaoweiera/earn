<script lang="ts" setup>
import { oss } from "src/config";
import I18n from "src/utils/i18n";
import Hover from "src/pages/layout/footer/hover.vue";

const i18n = I18n();
</script>

<template>
  <div>
    <div class="apy-coming flex flex-col items-center pt-17">
      <ui-image class="w-63 md:w-98 h-10 md:h-16" fit="cover" :src="`${oss}/image/soon.png`" />
      <div class="text-16-18 text-global-highTitle text-opacity-65 font-kdFang mt-6">{{ i18n.home.apy.tips }}</div>
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
          <IconFont class="flex text-global-primary" size="24" type="discord" />
        </v-router>

        <v-router :href="i18n.chat.medium" class="flex ml-6" target="_blank">
          <IconFont class="flex text-global-primary" size="24" type="medium" />
        </v-router>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.apy-coming {
  @apply h-full w-full;
  background: linear-gradient(180deg, rgba(0, 111, 247, 0.05) 0%, rgba(0, 111, 247, 0) 100%);
}
</style>
