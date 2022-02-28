<script setup lang="ts">
import {Item, CallbackList} from "src/logic/ui/tab";
import {PropType} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: () => '',
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
    default: () => 4
  }
});


</script>
<template>
  <div>
    <div class="flex items-center">
      <div class="text-14-18 text-global-highTitle text-opacity-65 mr-4" v-if="title">{{title}}</div>
      <div class="flex-1 is-tab">
        <ui-tab :list="list" :active-name="name" :split="split"></ui-tab>
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
      @apply flex px-3  py-2 max-h-8 bg-global-darkblue bg-opacity-6 rounded-md;
    }
  }

  ::v-deep(.el-input__inner) {
    display: flex;
    align-items: center !important;
    border: 1px solid rgba(3, 54, 102, 0) !important;
    background: none;
    height: 34px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
    border-radius: 6px !important;
    @apply text-kd14px18px w-24 text-center font-medium font-kdFang text-global-highTitle text-opacity-45;
  }

  ::v-deep(.el-input__suffix) {
    right: 0px !important;
  }
}
</style>
