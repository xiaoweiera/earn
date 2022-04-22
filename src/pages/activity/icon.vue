<script lang="ts" setup>
/**
 * @file
 * @auth svon.me@gmail.com
 */

import { ShareItem } from "src/types/common/activity";
import { AnyEquals, upperFirst } from "src/utils";
import I18n from "src/utils/i18n";
import type { PropType } from "vue";

const props = defineProps({
  lang: {
    type: String,
    default: "",
  },
  data: {
    required: true,
    type: Object as PropType<ShareItem>,
  },
});

const Icon = {
  twitter: "twitter",
  telegram: "telegram",
  wechat: "wechat",
};

const getLabel = function (name?: string): string {
  const i18n = I18n(props.lang);
  if (name) {
    return `${i18n.common.follow} ${upperFirst(name)}`;
  }
  return i18n.common.follow;
};

const getIcon = function (data: ShareItem): string | undefined {
  if (AnyEquals(data.method.name, Icon.twitter)) {
    return Icon.twitter;
  }
  if (AnyEquals(data.method.name, Icon.telegram)) {
    return Icon.telegram;
  }
  if (AnyEquals(data.method.name, Icon.wechat)) {
    return Icon.wechat;
  }
  if (AnyEquals(data.method.name, "discord")) {
    return "icon-discord2";
  }
};
</script>

<template>
  <v-router :href="data.url" class="rounded-3xl px-4 item" target="_blank">
    <div class="h-11 py-2.5 flex items-center">
      <span class="hidden label pr-2.5 text-18-28">{{ getLabel(data.method.name) }}</span>
      <template v-if="getIcon(data)">
        <IconFont :type="getIcon(data)" size="24" />
      </template>
    </div>
  </v-router>
</template>

<style lang="scss" scoped>
.item {
  @apply bg-white text-global-darkblue block;
  transition: color 0.3s;

  &:hover {
    @apply bg-global-darkblue text-white;
    .label {
      @apply block;
    }
  }
}
</style>
