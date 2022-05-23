<script lang="ts" setup>
/**
 * @file 右侧悬浮功能
 * @auth svon.me@gmail.com
 */
import type { PropType } from "vue";
import type { Invite } from "src/types/common/activity";
import { Presentation } from "src/types/common/activity";
import Icon from "./icon.vue";

defineProps({
  detail: {
    required: true,
    type: Object as PropType<Invite>,
  },
});
</script>

<template>
  <div>
    <div class="fixed right-5 bottom-1/5 z-99 fixed-wrap">
      <div v-for="(data, index) in detail.share_links" :key="index" class="mt-3 first:mt-0 flex justify-end">
        <template v-if="data.presentation === Presentation.qrcode">
          <ui-hover :append-to-body="false" :offset="12" placement="left">
            <!--二维码展示-->
            <template #label>
              <Icon :link="false" :data="data" :lang="detail.language" />
            </template>
            <template #content>
              <div class="p-2">
                <ui-qrcode width="80" height="80" :value="data.url" />
              </div>
            </template>
          </ui-hover>
        </template>
        <template v-else>
          <Icon :data="data" :lang="detail.language" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fixed-wrap {
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.06)) drop-shadow(0px 8px 24px rgba(0, 0, 0, 0.1));
}
</style>
