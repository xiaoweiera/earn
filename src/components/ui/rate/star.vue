<script setup lang="ts">
import { clone } from "ramda";
import { computed } from "vue";
import { toInteger } from "src/utils";
import safeSet from "@fengqiaogang/safe-set";
import { setInject, getInject } from "src/utils/use/state";
import API from "src/api";
import { messageSuccess } from "src/lib/tool";
import I18n from "src/utils/i18n";
const i18n = I18n();
const api = new API();
const detail: any = getInject("detailState");
const setDetail: any = setInject("detailState");

// const tipState = reactive({ value: false });
const props = defineProps({
  value: {
    required: true,
    type: Number,
  },
  id: {
    required: true,
    type: [Number, String],
  },
});

const starValue = computed<number>(function () {
  if (props.value) {
    return toInteger(props.value / 2);
  }
  return 0;
});

const getClassName = function (index: number, value: number): string[] {
  const number = 5 - index + 1;
  const array = [`order-${number}`];
  if (number <= value) {
    array.push("active");
  }
  return array;
};
const onClick = async function (value: number) {
  const score = value * 2;
  try {
    await api.comment.star(props.id as number, score);
  } catch (e) {
    // todo
  } finally {
    const result = detail;
    const data = clone(result);
    if (!data.my_score) {
      safeSet(data, "clout", toInteger(data.clout) + 1);
    }
    data.my_score = score;
    setDetail(data);
    //活动存在时弹框不存在时若提示就可以
    // tipState.value = true;
    messageSuccess(i18n.comment.success);
  }
};
</script>

<template>
  <div class="flex justify-center">
    <v-login class="inline-flex items-center cursor-pointer hover-star delete-hover">
      <template v-for="index in 5" :key="index">
        <IconFont class="star-item" :class="getClassName(index, starValue)" type="icon-star1" @click="onClick(5 - index + 1)" />
      </template>
    </v-login>
    <!--    <UiRateTip :state="tipState" />-->
  </div>
</template>

<style scoped lang="scss">
%hover {
  @apply text-global-gemstone;
  & ~ .star-item {
    @apply text-global-gemstone;
  }
}
.star-item {
  transition: all 0.3s;
  @apply px-1.5 text-global-highTitle text-opacity-10;
  &.active {
    @at-root .hover-star:not(:hover) & {
      @apply text-global-gemstone;
    }
  }
  &:first-child {
    @apply pr-0;
  }
  &:last-child {
    @apply pl-0;
  }
  &:hover {
    @extend %hover;
  }
}
</style>
