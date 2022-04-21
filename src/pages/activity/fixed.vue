<script setup lang="ts">
/**
 * @file 右侧悬浮功能
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";

const getLabel = function (name: string): string {
  const i18n = I18n();
  return `${i18n.common.follow} ${name}`;
};
</script>

<template>
  <div>
    <div class="fixed right-5 bottom-1/3 z-99 hidden md:block fixed-wrap">
      <div class="mt-3 first:mt-0 flex justify-end">
        <v-router class="rounded-3xl px-4 item">
          <div class="h-11 py-2.5 flex items-center">
            <span class="hidden label pr-2.5 text-18-28">{{ getLabel("Twitter") }}</span>
            <IconFont type="twitter" size="24" />
          </div>
        </v-router>
      </div>
      <div class="mt-3 flex justify-end">
        <v-router class="rounded-3xl px-4 item">
          <div class="h-11 py-2.5 flex items-center">
            <span class="hidden label pr-2.5 text-18-28">{{ getLabel("Telegram") }}</span>
            <IconFont type="telegram" size="24" />
          </div>
        </v-router>
      </div>
      <div class="mt-3 flex justify-end">
        <ui-hover placement="left" :offset="12" :append-to-body="false">
          <template #label>
            <v-router class="rounded-3xl px-4 item">
              <div class="h-11 py-2.5 flex items-center">
                <span class="hidden label pr-2.5 text-18-28">{{ getLabel("Wechat") }}</span>
                <IconFont type="wechat" size="24" />
              </div>
            </v-router>
          </template>
          <template #content>
            <div class="p-2">
              <ui-image class="w-20 h-20" src="https://iph.href.lu/800x157?text=Wechat&fg=666666&bg=cccccc" fit="none" />
            </div>
          </template>
        </ui-hover>
      </div>
      <div class="mt-3 flex justify-end">
        <v-router class="rounded-3xl px-4 item">
          <div class="h-11 py-2.5 flex items-center">
            <span class="hidden label pr-2.5 text-18-28">{{ getLabel("Discord") }}</span>
            <IconFont type="icon-discord2" size="24" />
          </div>
        </v-router>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fixed-wrap {
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.06)) drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.1));
  .item {
    @apply bg-white text-global-darkblue;
    transition: color 0.3s;
    &:hover {
      @apply bg-global-darkblue text-white;
      .label {
        @apply block;
      }
    }
  }
}
</style>
