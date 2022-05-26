<script lang="ts" setup>
/**
 * @file 日历
 * @auth svon.me@gmail.com
 */

import I18n from "src/utils/i18n/";
import { dateDiff } from "src/utils/";
import type { PropType } from "vue";
import type { DataMap } from "src/types/quota/";
import Vague from "../vague.vue";
import { dateDayFormat, dateMonthFormat, dateTime, toInteger } from "src/utils/";

defineProps({
  data: {
    required: true,
    type: Object as PropType<DataMap>,
  },
  small: {
    type: Boolean,
    default: () => false,
  },
  unlockText: {
    type: String,
    default: "",
  },
});

const i18n = I18n();

const getDate = function (value: number | string) {
  return dateTime(`${value}`, "YYYYMMDD");
};

const getDay = function (value: number | string) {
  return dateDayFormat(getDate(value));
};

const getMonth = function (time: number | string) {
  let value: number = toInteger(dateMonthFormat(getDate(time))) - 1;
  if (value < 0) {
    value = 0;
  }
  return i18n.part(i18n.common.time.month, value, {});
};

const getWeek = function (value: number | string) {
  const date = new Date(getDate(value));
  return i18n.part(i18n.common.time.week, date.getDay(), {});
};
</script>

<template>
  <div class="calendar" :class="{ small: small }">
    <ui-sticky v-if="!small" active-class="calendar-active" class="z-900 box-calendar transform -translate-y-px">
      <div class="text-14-18 flex items-center py-1 calendar-content text-global-black-desc">
        <icon-font type="icon-rili" size="16" class="mr-2" />
        <span>{{ getMonth(data.date) }}</span>
        <span>{{ getDay(data.date) }}</span>
        <span class="ml-1">{{ getWeek(data.date) }}</span>
      </div>
    </ui-sticky>
    <div class="clearfix pt-2">
      <template v-for="item in data.list" :key="item.id">
        <div class="quota-item" :data-time="dateDiff(item.published_at)">
          <div class="lg:pl-4">
            <Vague :data="item" :text="unlockText">
              <slot :data="item"></slot>
            </Vague>
          </div>
          <span class="hidden lg:block line"></span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendar-active {
  .calendar-content {
    @apply bg-white;
  }
}

.quota-item {
  @apply relative lg:pl-3 pb-6;
  &:before {
    content: attr(data-time);
    @apply block text-sm text-global-text-grey;
    @screen lg {
      @apply absolute left-0 top-0.5 pr-2.5 transform -translate-x-full;
    }
  }

  .line {
    @apply absolute left-0 top-0 bottom-0 w-3;
    &:before,
    &:after {
      content: "";
      @apply absolute left-1/2;
      @apply transform -translate-x-1/2;
    }

    &:before {
      @apply top-5.5 -bottom-0.5 w-px;
      @apply bg-global-highTitle bg-opacity-10;
    }

    &:after {
      @apply w-3 h-3 rounded-1/2 top-1.5;
      @apply border-global-money border-2 border-solid;
      background: rgba(248, 137, 35, 0.12);
    }
  }
}

.calendar {
  &:last-child {
    &:not(.small) {
      @apply pb-10;
    }

    .quota-item {
      &:last-child {
        @apply pb-0;
      }
    }
  }
}
</style>
