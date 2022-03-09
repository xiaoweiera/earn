<script setup lang="ts">
import type { CallbackList, Item } from "src/logic/ui/tab";
import type { PropType } from "vue";

defineProps({
  title: {
    type: String,
    default: () => "",
  },
  list: {
    type: [Function, Array] as PropType<Item[] | CallbackList>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  split: {
    type: Number,
    default: () => 4,
  },
  titleWidth: {
    type: String,
    default: () => "",
  },
});

</script>
<template>
  <div>
    <div class="flex items-center">
      <div v-if="title" :class="titleWidth" class="text-14-18 text-global-highTitle text-opacity-65 mr-4">{{ title }}</div>
      <div class="flex-1 is-tab">
        <ui-tab :list="list" :active-name="name" :split="split" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
%first-ml0 {
  &:first-child {
    @apply ml-0;
  }
}
.is-tab {
  @apply flex items-center;
  ::v-deep(.tab-wrap) {
    @apply items-center flex;
    .tab-item {
      @apply flex px-3 py-2   rounded-md;
      &:after {
        @apply h-0;
      }

      &:not(a) {
        &:not([href]) {
          @apply cursor-pointer ml-4;
          @extend %first-ml0;
        }
      }

      &:not(:first-child) {
        @apply ml-4;
      }
    }

    span {
      @apply text-kd14px18px font-medium font-kdFang;
    }

    .active {
      @apply flex max-h-8 bg-global-darkblue bg-opacity-6 rounded-md;
    }
  }
}
</style>
