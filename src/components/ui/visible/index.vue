<script lang="ts" setup>
/**
 * @file 显示与隐藏
 * @auth svon.me@gmail.com
 */
import {ref} from "vue";
import {uuid} from "src/utils/";

const key = ref<string>(`visible-${uuid()}`);

defineProps({
  arrow: {
    type: Boolean,
    default: () => true
  }
})

</script>

<template>
  <div>
    <input :id="key" :name="key" class="hidden visible-input" type="checkbox">
    <label :for="key" class="visible-label cursor-pointer" :class="{'show-arrow': arrow}">
      <slot name="label" :id="key"></slot>
      <IconFont class="arrow-icon hidden" type="icon-arrow-down" size="24"/>
    </label>
    <div class="visible-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%transition {
  transition: all 0.3s;
}

.visible-label {
  @apply block;
  &.show-arrow {
    @apply flex justify-between items-center;
    .arrow-icon {
      @apply inline-flex;
    }
  }
  .arrow-icon {
    @extend %transition;
  }
}

.visible-content {
  max-height: 0;
  @extend %transition;
  @apply invisible overflow-hidden;
}

.visible-input {
  &:checked {
    ~ .visible-content {
      @apply visible;
      max-height: initial;
    }
    ~ .visible-label {
      ::v-deep(.arrow-icon) {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
