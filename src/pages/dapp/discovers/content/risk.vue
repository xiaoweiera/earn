<script lang="ts" setup>
import I18n from "src/utils/i18n/index";

const i18n = I18n();
defineProps({
  value: {
    type: String,
    default: () => {
      return {};
    },
  },
});
</script>

<template>
  <span v-if="value === 'high'" class="risk high">
    <IconFont class="text-global-white" size="14" type="icon-gaofengxian" />
    <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.high }}</span>
  </span>
  <span v-else-if="value === 'medium'" class="risk medium">
    <IconFont size="14" type="icon-zhongfengxian" />
    <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.medium }}</span>
  </span>
  <span v-else-if="value === 'low'" class="risk low">
    <IconFont size="14" type="icon-difengxian" />
    <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.low }}</span>
  </span>
  <span v-else-if="value === 'unknown'" class="risk unknown">
    <IconFont size="14" type="icon-weizhi" />
    <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.unknown }}</span>
  </span>
</template>

<style lang="scss" scoped>
.risk {
  @apply px-2 py-1;
  @apply inline-block whitespace-nowrap;
  @apply flex items-center bg-global-bgBlack;
  @apply border border-global-white border-opacity-25 rounded-2xl;
  @apply text-kd12px14px text-global-white;
}
</style>
