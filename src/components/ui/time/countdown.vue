<script setup lang="ts">
// 倒计时
import dayjs from "dayjs";
import { dateTime } from "src/utils";
import { onMounted, ref, watch } from "vue";
import I18n from "src/utils/i18n/index";

const i18n = I18n();
const props = defineProps({
  value: {
    type: [String, Number],
    default: "",
  },
});
const day = ref<string>("00");
const hour = ref<string>("00");
const minute = ref<string>("00");
const second = ref<string>("00");
const end = ref(0);

const emitEvent = defineEmits(["change"]);

const calcEndValue = function () {
  end.value = dateTime(props.value);
};

// 计算倒计时 - 天
const getDay = function (duration: number): string {
  const number = parseInt((duration / 1000 / 60 / 60 / 24) as any, 10);
  return number < 10 ? `0${number}` : String(number);
};
// 计算倒计时 - 时
const getHour = function (duration: number): string {
  const number = parseInt(((duration / 1000 / 60 / 60) % 24) as any, 10);
  return number < 10 ? `0${number}` : String(number);
};
// 计算倒计时 - 分
const getMinute = function (duration: number): string {
  const number = parseInt(((duration / 1000 / 60) % 60) as any, 10);
  return number < 10 ? `0${number}` : String(number);
};
// 计算倒计时 - 秒
const getSecond = function (duration: number): string {
  const number = parseInt(((duration / 1000) % 60) as any, 10);
  return number < 10 ? `0${number}` : String(number);
};

// 倒计时
let intemout: any;
const timeout = () => {
  clearTimeout(intemout);
  // 当前时间
  const now = dayjs().valueOf();
  const duration = end.value - now;
  // 结束倒计时
  if (duration < 0) {
    day.value = "00";
    hour.value = "00";
    minute.value = "00";
    second.value = "00";
    return;
  }
  // 计算倒计时剩余天
  day.value = getDay(duration);
  // 计算倒计时剩余时
  hour.value = getHour(duration);
  // 计算倒计时剩余分
  minute.value = getMinute(duration);
  // 计算倒计时剩余秒
  second.value = getSecond(duration);

  const res = {
    day: day.value,
    hour: hour.value,
    minute: minute.value,
    second: second.value,
  };
  emitEvent("change", res);

  intemout = setTimeout(timeout, 1000);
};

// 监听传入进来的时间值
// @ts-ignore
watch(
  props.value,
  () => {
    calcEndValue();
    timeout();
  },
  { immediate: true },
);

onMounted(() => {
  calcEndValue();
  timeout();
});
</script>

<template>
  <slot :day="day" :hour="hour" :minute="minute" :second="second">
    <span class="font-color-theme font-bold font-kdFang whitespace-nowrap inline-block pb-4">
      <span class="relative">
        <span class="text-2xl md:text-4xl inline-block min-w-11.5 text-center">{{ day }}</span>
        <span
          class="text-global-default text-opacity-65 absolute top-full left-1/2 text-xs transform -translate-x-1/2"
          >{{ i18n.common.time.dd }}</span
        >
      </span>
      <span class="text-lg px-4">:</span>
      <span class="relative">
        <span class="text-2xl md:text-4xl inline-block min-w-11.5 text-center">{{ hour }}</span>
        <span
          class="text-global-default text-opacity-65 absolute top-full left-1/2 text-xs transform -translate-x-1/2"
          >{{ i18n.common.time.hh }}</span
        >
      </span>
      <span class="text-lg px-4 relative">:</span>
      <span class="relative">
        <span class="text-2xl md:text-4xl inline-block min-w-11.5 text-center">{{ minute }}</span>
        <span
          class="text-global-default text-opacity-65 absolute top-full left-1/2 text-xs transform -translate-x-1/2"
          >{{ i18n.common.time.mm }}</span
        >
      </span>
      <span class="text-lg px-4 relative">:</span>
      <span class="relative">
        <span class="text-2xl md:text-4xl inline-block min-w-11.5 text-center">{{ second }}</span>
        <span
          class="text-global-default text-opacity-65 absolute top-full left-1/2 text-xs transform -translate-x-1/2"
          >{{ i18n.common.time.ss }}</span
        >
      </span>
    </span>
  </slot>
</template>
