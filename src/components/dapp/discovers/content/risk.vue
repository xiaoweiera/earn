<script setup lang="ts">
import I18n from '~/utils/i18n/index'

const i18n = I18n();
const props = defineProps({
  value: {
    type: String
  }
})
</script>

<template>
  <span class="risk high" v-if="value === 'high'">
    <IconFont class="text-global-white" type="icon-gaofengxian" size="14"/>
    <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.high }}</span>
  </span>
  <span class="risk medium" v-else-if="value === 'medium'">
      <IconFont type="icon-zhongfengxian" size="14"/>
      <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.medium }}</span>
  </span>
  <span class="risk low" v-else-if="value === 'low'">
    <IconFont type="icon-difengxian" size="14"/>
    <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.low }}</span>
  </span>
  <span class="risk unknown" v-else-if="value === 'unknown'">
    <IconFont type="icon-weizhi" size="14"/>
    <span class="text-12-14 ml-0.5 font-kdFang">{{ i18n.common.risk.unknown }}</span>
  </span>
</template>

<style scoped lang="scss">
.risk {
  @apply px-2 py-1;
  @apply inline-block whitespace-nowrap;
  @apply flex items-center bg-global-bgBlack;
  @apply border border-global-white border-opacity-25 rounded-2xl;
  @apply text-kd12px14px text-global-white;
}
</style>
