<script lang="ts" setup>
/**
 * @file 风险
 * @auth svon.me@gmail.com
 */

import I18n from "src/utils/i18n/";
import type { PropType } from "vue";
import { Risk } from "src/types/dapp/data";

defineProps({
  value: {
    required: true,
    type: String as PropType<Risk>,
  },
});

const i18n = I18n();
</script>

<template>
  <!--高风险-->
  <ui-label v-if="value && Risk.high" :value="i18n.common.risk.high" icon="icon-gaofengxian" />
  <!--中风险-->
  <ui-label v-else-if="value && Risk.medium" :value="i18n.common.risk.medium" icon="icon-zhongfengxian" />
  <!--低风险-->
  <ui-label v-else-if="value && Risk.low" :value="i18n.common.risk.low" icon="icon-difengxian" />
  <!--未知-->
  <ui-label v-else-if="value && Risk.unknown" :value="i18n.common.risk.unknown" icon="icon-weizhi" />
</template>
