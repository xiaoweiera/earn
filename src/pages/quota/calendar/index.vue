<script lang="ts" setup>
/**
 * @file 日历
 * @auth svon.me@gmail.com
 */

import { dateDayFormat, dateMonthFormat, dateTime, toInteger } from "src/utils/";
import I18n from "src/utils/i18n/";
import type { PropType } from "vue";
import type { DataMap } from "src/types/quota/";

defineProps({
  data: {
    required: true,
    type: Object as PropType<DataMap>,
  },
  small: {
    type: Boolean,
    default: () => false,
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
      <div class="header inline-block min-w-10">
        <div class="date relative block text-center text-12-18 text-global-highTitle text-opacity-85">
          <div class="overflow-hidden rounded-lg date-content">
            <span class="block month">{{ getMonth(data.date) }}</span>
            <span class="block day">{{ getDay(data.date) }}</span>
          </div>
          <div class="week pl-3">
            <div class="text-16 text-global-highTitle text-opacity-85">{{ getWeek(data.date) }}</div>
          </div>
        </div>
      </div>
    </ui-sticky>
    <div class="clearfix">
      <div v-for="item in data.list" :key="item.id" class="quota-item">
        <div class="pl-2 md:pl-3">
          <slot :data="item"></slot>
        </div>
        <span class="line"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 日历 */
.header {
  @apply absolute lg:static left-0 top-0;
  @screen md {
    @at-root .calendar-active & {
      .week {
        @apply opacity-0 invisible;
      }
    }
  }
}

.quota-item {
  @apply relative pl-10 lg:pl-14 pb-10;
  @at-root .small & {
    @apply pl-6 pb-7.5;
  }
  .line {
    @apply block absolute left-0 top-0 bottom-0 w-10 lg:w-14;
    @at-root .small & {
      @apply w-3 left-1.5;
    }
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

  .header {
    .date {
      .date-content {
        @apply border border-solid border-white border-opacity-10 transform -translate-y-px;
        box-shadow: inset 0px -2px 3px rgba(0, 0, 0, 0.08), inset 0px 4px 8px rgba(255, 255, 255, 0.3);
        filter: drop-shadow(0px 4px 18px rgba(44, 140, 248, 0.06));
      }

      .month {
        @apply h-5 w-full ml-0;
        @apply bg-global-numRed text-white text-opacity-100;
        line-height: 20px;
      }

      .day {
        @apply h-7 bg-white text-xl;
        line-height: 28px;
      }
    }

    .week {
      transition: all 0.3s;
      @apply hidden opacity-100 whitespace-nowrap;
      @apply absolute left-full top-1/2 transform -translate-y-1/2;
    }

    @screen lg {
      .date {
        @apply w-14;
        .month {
          @apply h-7;
          line-height: 28px;
        }

        .day {
          @apply h-8 text-2xl;
        }
      }

      .week {
        @apply flex items-center;
      }
    }
  }
}
</style>
