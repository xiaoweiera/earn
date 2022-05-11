<script setup lang="ts">
/**
 * @file coming soon
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
const i18n = I18n();
</script>

<template>
  <div class="min-h-150">
    <div class="coming-content">
      <div class="w-52">
        <ui-image src="/images/common/logo.svg" />
      </div>
      <div class="mt-8">
        <h1>Coming Soon</h1>
      </div>
      <p class="mt-8">
        <span class="text-16-18 text-global-highTitle text-opacity-50">关注我们，第一时间体验最新功能</span>
      </p>
      <div class="flex items-center justify-center mt-3">
        <v-router :href="i18n.chat.twitter" class="flex" target="_blank">
          <IconFont class="flex text-global-primary" type="icon-twitter" />
        </v-router>

        <div class="flex ml-4">
          <Hover :desc="i18n.menu.hover.telegram" :href="i18n.chat.telegram">
            <IconFont class="flex text-global-primary" type="icon-telegram" />
          </Hover>
        </div>

        <v-router :href="i18n.chat.discord" class="flex ml-4" target="_blank">
          <IconFont class="flex text-global-primary" type="discord" />
        </v-router>

        <v-router :href="i18n.chat.medium" class="flex ml-4" target="_blank">
          <IconFont class="flex text-global-primary" type="medium" />
        </v-router>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.coming-content {
  background: linear-gradient(180deg, rgba(0, 111, 247, 0.05) 0%, rgba(0, 111, 247, 0) 100%);
}
h1 {
  font-size: 56px;
}
</style>
