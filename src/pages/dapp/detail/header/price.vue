<script lang="ts" setup>
/**
 * @file 价格
 * @auth svon.me@gmail.com
 */
import I18n from "src/utils/i18n";
import { toUpper } from "ramda";
import { Progress as ProjectProgress } from "src/types/dapp/data";
import { toNumberFormat, isString, upperFirst } from "src/utils/";
import { PropType } from "vue";

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [Number, String],
    required: true,
  },
  unit: {
    type: String,
    default: "",
  },
  symbol: {
    type: String,
    default: "",
  },
  progress: {
    type: String as PropType<ProjectProgress>,
    default: "",
  },
});

const i18n = I18n();

const getLabel = function (label: string, symbol: string) {
  const i18n = I18n();
  const data = {
    symbol: symbol ? `(${symbol})` : "",
    name: symbol ? `(${symbol})` : "",
  };
  return i18n.template(label, data);
};

const equalsStatus = function (value: ProjectProgress, progress: ProjectProgress) {
  if (value && value !== ProjectProgress.no) {
    if (value === progress) {
      return true;
    }
  }
};
</script>

<template>
  <div>
    <label class="text-14-18 text-global-highTitle text-opacity-65">
      <span>{{ getLabel(label, symbol) }}</span>
    </label>
    <p class="text-32 mt-2 text-global-highTitle">
      <b v-if="isString(value)">{{ upperFirst(value) }}</b>
      <b v-else-if="unit">{{ toNumberFormat(value, toUpper(unit)) }}</b>
      <b v-else>{{ toNumberFormat(value) }}</b>
    </p>
    <slot>
      <p v-if="equalsStatus(progress, ProjectProgress.ongoing)" class="text-global-numGreen flex items-center mt-2">
        <IconFont class="mr-1" type="icon-jinhangzhong" />
        <span class="text-14-18 font-m">{{ i18n.dapp.detail.ongoing }}</span>
      </p>
      <p v-else-if="equalsStatus(progress, ProjectProgress.oncoming)" class="text-global-numGreen flex items-center mt-2">
        <IconFont class="mr-1" type="icon-time" />
        <span class="text-14-18 font-m">{{ i18n.dapp.detail.upcoming }}</span>
      </p>
    </slot>
  </div>
</template>
